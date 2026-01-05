'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, ChevronRight, Brain, CheckCircle, XCircle, Coins, Zap, Timer } from 'lucide-react';
import { questions, Question, categoryNames, calculateIQ, getIQTitle, Category, Difficulty } from '@/data/questions';
import { useUser } from '@/context/UserContext';
import { APP_CONFIG } from '@/config/app.config';
import { shuffleOptionsSeeded, checkAnswerWithTypoTolerance } from '@/utils/quiz';

type SpeedTier = 'gold' | 'silver' | 'bronze' | 'none';

type ShuffledQuestion = {
  original: Question;
  shuffledOptions: string[] | undefined;
  shuffledCorrectIndex: number;
};

type UserAnswer = {
  questionId: number;
  answer: string | number | number[] | null;
  isCorrect: boolean;
  timeTaken: number;
  timeAllowed: number;
  speedTier: SpeedTier;
  speedBonus: number;
};

// Get time limit for a question based on difficulty
function getTimeLimit(difficulty: Difficulty): number {
  return APP_CONFIG.quiz.timers[difficulty];
}

// Calculate speed bonus based on time used
function calculateSpeedBonus(timeUsed: number, timeAllowed: number, basePoints: number, isCorrect: boolean): { tier: SpeedTier; bonus: number } {
  if (!isCorrect || !APP_CONFIG.quiz.speedBonus.enabled) {
    return { tier: 'none', bonus: 0 };
  }
  
  const percentUsed = timeUsed / timeAllowed;
  const tiers = APP_CONFIG.quiz.speedBonus.tiers;
  
  if (percentUsed < tiers.gold.threshold) {
    return { tier: 'gold', bonus: Math.round(basePoints * (tiers.gold.multiplier - 1)) };
  } else if (percentUsed < tiers.silver.threshold) {
    return { tier: 'silver', bonus: Math.round(basePoints * (tiers.silver.multiplier - 1)) };
  } else if (percentUsed < tiers.bronze.threshold) {
    return { tier: 'bronze', bonus: Math.round(basePoints * (tiers.bronze.multiplier - 1)) };
  }
  
  return { tier: 'none', bonus: 0 };
}

export default function QuizPage() {
  const router = useRouter();
  const { isConnected, recordIQTestCompletion } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | number[] | null>(null);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');
  const [orderAnswer, setOrderAnswer] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  // Session seed for consistent shuffling during this quiz session
  const [sessionSeed] = useState(() => Date.now());

  // Pre-shuffle all questions for this session
  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    return questions.map((q, idx) => {
      if (q.options && (q.type === 'multiple-choice' || q.type === 'true-false' || q.type === 'spot-scam')) {
        const { shuffledOptions, newCorrectIndex } = shuffleOptionsSeeded(
          q.options,
          q.correctAnswer as number,
          sessionSeed + q.id
        );
        return {
          original: q,
          shuffledOptions,
          shuffledCorrectIndex: newCorrectIndex,
        };
      }
      return {
        original: q,
        shuffledOptions: q.options,
        shuffledCorrectIndex: q.correctAnswer as number,
      };
    });
  }, [sessionSeed]);

  const currentShuffled = shuffledQuestions[currentIndex];
  const currentQuestion = currentShuffled.original;
  const progress = ((currentIndex) / questions.length) * 100;
  const timeLimit = currentQuestion ? getTimeLimit(currentQuestion.difficulty) : 15;
  const timePercent = (timeRemaining / timeLimit) * 100;

  // Handle timeout - defined before useEffect that uses it
  const handleTimeout = useCallback(() => {
    if (showResult) return;
    
    const timeAllowed = getTimeLimit(currentQuestion.difficulty);
    const timeTaken = timeAllowed; // Used all the time
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer: null,
      isCorrect: false,
      timeTaken,
      timeAllowed,
      speedTier: 'none',
      speedBonus: 0,
    };

    setUserAnswers(prev => [...prev, newAnswer]);
    setTimerActive(false);
    setShowResult(true);
  }, [currentQuestion, showResult]);

  // Initialize timer for new question
  useEffect(() => {
    if (currentQuestion && !showResult) {
      const limit = getTimeLimit(currentQuestion.difficulty);
      setTimeRemaining(limit);
      setTimerActive(true);
      setQuestionStartTime(Date.now());
      setSelectedAnswer(null);
      setFillBlankAnswer('');
      if (currentQuestion.type === 'order-ranking' && currentQuestion.options) {
        setOrderAnswer([...Array(currentQuestion.options.length).keys()]);
      }
    }
  }, [currentIndex, currentQuestion, showResult]);

  // Countdown timer
  useEffect(() => {
    if (!timerActive || showResult) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, showResult, handleTimeout]);

  const checkAnswer = (shuffled: ShuffledQuestion, answer: string | number | number[] | null): boolean => {
    if (answer === null) return false;
    const question = shuffled.original;
    
    if (question.type === 'fill-blank') {
      // Use typo tolerance for fill-in-blank questions
      return checkAnswerWithTypoTolerance(
        answer as string,
        question.correctAnswer as string,
        3 // Allow up to 3 typos
      );
    }
    if (question.type === 'order-ranking') {
      const correct = question.correctAnswer as number[];
      const given = answer as number[];
      return correct.every((val, idx) => val === given[idx]);
    }
    // For multiple choice, compare with shuffled correct index
    return answer === shuffled.shuffledCorrectIndex;
  };

  const handleSubmitAnswer = () => {
    setTimerActive(false);
    
    let answer: string | number | number[] | null;
    if (currentQuestion.type === 'fill-blank') {
      answer = fillBlankAnswer || null;
    } else if (currentQuestion.type === 'order-ranking') {
      answer = orderAnswer;
    } else {
      answer = selectedAnswer;
    }

    const isCorrect = checkAnswer(currentShuffled, answer);
    const timeAllowed = getTimeLimit(currentQuestion.difficulty);
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    const { tier, bonus } = calculateSpeedBonus(timeTaken, timeAllowed, currentQuestion.points, isCorrect);

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      isCorrect,
      timeTaken,
      timeAllowed,
      speedTier: tier,
      speedBonus: bonus,
    };

    setUserAnswers(prev => [...prev, newAnswer]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const moveOrderItem = (from: number, to: number) => {
    const newOrder = [...orderAnswer];
    const [item] = newOrder.splice(from, 1);
    newOrder.splice(to, 0, item);
    setOrderAnswer(newOrder);
  };

  const canSubmit = () => {
    if (currentQuestion.type === 'fill-blank') {
      return fillBlankAnswer.trim().length > 0;
    }
    if (currentQuestion.type === 'order-ranking') {
      return true;
    }
    return selectedAnswer !== null;
  };

  // Get timer color based on remaining time
  const getTimerColor = () => {
    if (timePercent > 50) return '#00f5d4'; // Cyan - plenty of time
    if (timePercent > 25) return '#fee440'; // Yellow - getting low
    return '#ef4444'; // Red - urgent
  };

  // Get speed tier display info
  const getSpeedTierInfo = (tier: SpeedTier) => {
    switch (tier) {
      case 'gold': return { label: '⚡ LIGHTNING FAST!', color: '#fee440', bg: 'rgba(254, 228, 64, 0.2)' };
      case 'silver': return { label: '🚀 QUICK!', color: '#c0c0c0', bg: 'rgba(192, 192, 192, 0.2)' };
      case 'bronze': return { label: '✨ NICE SPEED!', color: '#cd7f32', bg: 'rgba(205, 127, 50, 0.2)' };
      default: return null;
    }
  };

  if (quizComplete) {
    // Calculate scores
    const baseScore = userAnswers.reduce((sum, ans) => {
      const q = questions.find(q => q.id === ans.questionId);
      return sum + (ans.isCorrect ? (q?.points || 0) : 0);
    }, 0);
    const speedBonusTotal = userAnswers.reduce((sum, ans) => sum + ans.speedBonus, 0);
    const totalScore = baseScore + speedBonusTotal;
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const iq = calculateIQ(totalScore, maxScore + (maxScore * 0.5)); // Account for potential speed bonus
    const title = getIQTitle(iq);
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const timeoutCount = userAnswers.filter(a => a.answer === null).length;

    // Speed stats
    const goldCount = userAnswers.filter(a => a.speedTier === 'gold').length;
    const silverCount = userAnswers.filter(a => a.speedTier === 'silver').length;
    const bronzeCount = userAnswers.filter(a => a.speedTier === 'bronze').length;

    // Award points if connected (only once)
    if (isConnected && pointsEarned === 0) {
      recordIQTestCompletion(iq, totalScore);
      const basePoints = 50 + (iq >= 130 ? 100 : 0);
      setPointsEarned(basePoints);
    }

    // Calculate category scores
    const categoryScores: Record<Category, { correct: number; total: number }> = {
      blockchain: { correct: 0, total: 0 },
      defi: { correct: 0, total: 0 },
      trading: { correct: 0, total: 0 },
      security: { correct: 0, total: 0 },
      history: { correct: 0, total: 0 },
      base: { correct: 0, total: 0 },
      solana: { correct: 0, total: 0 },
    };

    userAnswers.forEach(ans => {
      const q = questions.find(q => q.id === ans.questionId);
      if (q) {
        categoryScores[q.category].total++;
        if (ans.isCorrect) categoryScores[q.category].correct++;
      }
    });

    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          {/* Result Card */}
          <div className="share-card text-center mb-8 relative z-10">
            <div className="text-6xl mb-4">{title.emoji}</div>
            <div className="text-7xl font-bold text-[#00f5d4] text-glow-cyan mb-2">{iq}</div>
            <div className="text-2xl font-semibold mb-2">{title.title}</div>
            <div className="text-[#a0a0b0] mb-6">{title.description}</div>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="stat-box">
                <div className="text-2xl font-bold text-green-400">{correctCount}</div>
                <div className="text-xs text-[#a0a0b0]">Correct</div>
              </div>
              <div className="stat-box">
                <div className="text-2xl font-bold text-[#f15bb5]">{questions.length - correctCount - timeoutCount}</div>
                <div className="text-xs text-[#a0a0b0]">Wrong</div>
              </div>
              <div className="stat-box">
                <div className="text-2xl font-bold text-[#a0a0b0]">{timeoutCount}</div>
                <div className="text-xs text-[#a0a0b0]">Timed Out</div>
              </div>
            </div>

            {/* Speed Bonuses Summary */}
            {(goldCount > 0 || silverCount > 0 || bronzeCount > 0) && (
              <div className="bg-[#12121a] rounded-xl p-4 mb-6">
                <div className="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-[#fee440]" />
                  Speed Bonuses
                </div>
                <div className="flex justify-center gap-4 text-sm">
                  {goldCount > 0 && <span className="text-[#fee440]">⚡ {goldCount} Gold</span>}
                  {silverCount > 0 && <span className="text-[#c0c0c0]">🚀 {silverCount} Silver</span>}
                  {bronzeCount > 0 && <span className="text-[#cd7f32]">✨ {bronzeCount} Bronze</span>}
                </div>
                <div className="text-xs text-[#a0a0b0] mt-2">+{speedBonusTotal} bonus points</div>
              </div>
            )}

            {/* Airdrop Points */}
            {isConnected && pointsEarned > 0 && (
              <div className="bg-[#fee440]/10 border border-[#fee440]/30 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 text-[#fee440]">
                  <Coins className="w-5 h-5" />
                  <span className="font-bold">+{pointsEarned} Airdrop Points!</span>
                </div>
              </div>
            )}

            {!isConnected && (
              <div className="bg-[#9b5de5]/10 border border-[#9b5de5]/30 rounded-xl p-4 mb-4">
                <p className="text-sm text-[#a0a0b0]">
                  💡 Connect wallet to earn airdrop points!
                </p>
              </div>
            )}

            <div className="text-sm text-[#a0a0b0]">
              Base Score: {baseScore} | Speed Bonus: +{speedBonusTotal} | Total: {totalScore}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="card p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {(Object.entries(categoryScores) as [Category, { correct: number; total: number }][]).map(([cat, score]) => {
                const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <div className={`w-28 text-sm cat-${cat}`}>{categoryNames[cat]}</div>
                    <div className="flex-1 progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm text-[#a0a0b0]">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setUserAnswers([]);
                setQuizComplete(false);
                setPointsEarned(0);
                setShowResult(false);
              }}
              className="btn-secondary flex-1"
            >
              Retake Test
            </button>
            <button
              onClick={() => {
                const text = `🧠 My Crypto IQ: ${iq} - "${title.title}"\n\n✅ ${correctCount}/${questions.length} correct\n⚡ ${speedBonusTotal} speed bonus points\n\nThink you can beat me? Take the test:`;
                if (navigator.share) {
                  navigator.share({ title: 'My Crypto IQ', text });
                } else {
                  navigator.clipboard.writeText(text);
                  alert('Result copied to clipboard!');
                }
              }}
              className="btn-primary flex-1"
            >
              Share Results
            </button>
          </div>

          <Link href="/" className="block text-center mt-6 text-[#a0a0b0] hover:text-white">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Get last answer for showing result
  const lastAnswer = userAnswers[userAnswers.length - 1];
  const showSpeedBonus = showResult && lastAnswer?.speedTier !== 'none';
  const speedTierInfo = showResult ? getSpeedTierInfo(lastAnswer?.speedTier || 'none') : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-[#2a2a3a]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[#a0a0b0] hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span>Exit</span>
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#00f5d4]" />
            <span className="font-semibold">Crypto IQ Test</span>
          </div>
          <div className="text-[#a0a0b0]">
            {currentIndex + 1} / {questions.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="progress-bar rounded-none">
        <div className="progress-fill rounded-none" style={{ width: `${progress}%` }} />
      </div>

      {/* Question */}
      <main className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Timer and Question Meta */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className={`badge badge-${currentQuestion.difficulty}`}>
                {currentQuestion.difficulty}
              </span>
              <span className={`text-sm cat-${currentQuestion.category}`}>
                {categoryNames[currentQuestion.category]}
              </span>
            </div>
            
            {/* Timer Display */}
            {!showResult && (
              <div 
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-bold transition-all ${
                  timePercent <= 25 ? 'animate-pulse' : ''
                }`}
                style={{ 
                  backgroundColor: `${getTimerColor()}20`,
                  border: `2px solid ${getTimerColor()}`,
                  color: getTimerColor()
                }}
              >
                <Timer className="w-5 h-5" />
                <span>{timeRemaining}s</span>
              </div>
            )}
          </div>

          {/* Timer Progress Bar */}
          {!showResult && (
            <div className="h-1.5 bg-[#2a2a3a] rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ 
                  width: `${timePercent}%`,
                  backgroundColor: getTimerColor()
                }}
              />
            </div>
          )}

          {/* Points indicator */}
          <div className="text-right text-sm text-[#a0a0b0] mb-4">
            +{currentQuestion.points} pts {APP_CONFIG.quiz.speedBonus.enabled && <span className="text-[#fee440]">+ speed bonus</span>}
          </div>

          {/* Question Text */}
          <h2 className="text-2xl font-semibold mb-8 leading-relaxed">
            {currentQuestion.type === 'fill-blank' 
              ? currentQuestion.question.replace('_______', '________')
              : currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.type === 'multiple-choice' || 
             currentQuestion.type === 'true-false' || 
             currentQuestion.type === 'spot-scam' ? (
              currentShuffled.shuffledOptions?.map((option, idx) => {
                let btnClass = 'option-btn';
                if (showResult) {
                  if (idx === currentShuffled.shuffledCorrectIndex) {
                    btnClass += ' correct';
                  } else if (idx === selectedAnswer) {
                    btnClass += ' incorrect';
                  }
                } else if (idx === selectedAnswer) {
                  btnClass += ' selected';
                }

                return (
                  <button
                    key={idx}
                    className={btnClass}
                    onClick={() => !showResult && setSelectedAnswer(idx)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full border border-[#2a2a3a] flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 text-left">{option}</span>
                      {showResult && idx === currentShuffled.shuffledCorrectIndex && (
                        <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                      )}
                      {showResult && idx === selectedAnswer && idx !== currentShuffled.shuffledCorrectIndex && (
                        <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : currentQuestion.type === 'fill-blank' ? (
              <div>
                <input
                  type="text"
                  className={`input-field ${showResult ? (lastAnswer?.isCorrect ? 'border-green-500' : 'border-red-500') : ''}`}
                  placeholder="Type your answer..."
                  value={fillBlankAnswer}
                  onChange={(e) => setFillBlankAnswer(e.target.value)}
                  disabled={showResult}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && canSubmit() && !showResult) {
                      handleSubmitAnswer();
                    }
                  }}
                />
                {showResult && (
                  <div className="mt-3 text-sm">
                    <span className="text-[#a0a0b0]">Correct answer: </span>
                    <span className="text-green-400 mono">{currentQuestion.correctAnswer as string}</span>
                    {lastAnswer?.isCorrect && fillBlankAnswer.toLowerCase() !== (currentQuestion.correctAnswer as string).toLowerCase() && (
                      <span className="text-[#a0a0b0] ml-2">(typo accepted ✓)</span>
                    )}
                  </div>
                )}
              </div>
            ) : currentQuestion.type === 'order-ranking' ? (
              <div className="space-y-2">
                <p className="text-sm text-[#a0a0b0] mb-4">Drag to reorder (earliest/first at top):</p>
                {orderAnswer.map((optionIdx, position) => (
                  <div
                    key={optionIdx}
                    className={`option-btn flex items-center gap-3 ${showResult ? (position === (currentQuestion.correctAnswer as number[])[position] ? 'correct' : 'incorrect') : ''}`}
                  >
                    <span className="w-8 h-8 rounded-full bg-[#2a2a3a] flex items-center justify-center text-sm">
                      {position + 1}
                    </span>
                    <span className="flex-1">{currentQuestion.options?.[optionIdx]}</span>
                    {!showResult && (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => position > 0 && moveOrderItem(position, position - 1)}
                          className="text-[#a0a0b0] hover:text-white text-xs"
                          disabled={position === 0}
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => position < orderAnswer.length - 1 && moveOrderItem(position, position + 1)}
                          className="text-[#a0a0b0] hover:text-white text-xs"
                          disabled={position === orderAnswer.length - 1}
                        >
                          ▼
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* Speed Bonus Banner (shown after correct answer) */}
          {showSpeedBonus && speedTierInfo && (
            <div 
              className="p-3 rounded-xl mb-4 text-center animate-fade-in-up"
              style={{ backgroundColor: speedTierInfo.bg, border: `1px solid ${speedTierInfo.color}` }}
            >
              <span className="font-bold" style={{ color: speedTierInfo.color }}>
                {speedTierInfo.label} +{lastAnswer?.speedBonus} bonus pts
              </span>
            </div>
          )}

          {/* Timeout indicator */}
          {showResult && lastAnswer?.answer === null && (
            <div className="p-3 rounded-xl mb-4 text-center bg-red-500/20 border border-red-500/50">
              <span className="text-red-400 font-semibold">⏱️ Time&apos;s up!</span>
            </div>
          )}

          {/* Explanation (shown after answer) */}
          {showResult && (
            <div className="card p-4 mb-8 border-l-4 border-[#00f5d4] animate-fade-in-up">
              <p className="text-sm text-[#a0a0b0]">
                <span className="text-white font-medium">Explanation: </span>
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          {!showResult ? (
            <button
              className="btn-primary w-full"
              onClick={handleSubmitAnswer}
              disabled={!canSubmit()}
            >
              Submit Answer
            </button>
          ) : (
            <button
              className="btn-primary w-full flex items-center justify-center gap-2"
              onClick={handleNext}
            >
              {currentIndex < questions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                'See Results'
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
