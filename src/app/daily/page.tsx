'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame, Trophy, Clock, CheckCircle, XCircle, ChevronRight, Zap, Coins, Timer } from 'lucide-react';
import { questions, Question, categoryNames, Difficulty } from '@/data/questions';
import { useUser } from '@/context/UserContext';
import { APP_CONFIG } from '@/config/app.config';
import { shuffleOptionsSeeded, checkAnswerWithTypoTolerance } from '@/utils/quiz';

// Get questions for daily challenge based on date
// Uses seeded random so everyone gets same questions on same day
function getDailyQuestions(): Question[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Simple seeded random
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  // Shuffle with seed
  const shuffled = [...questions].sort((a, b) => seededRandom(seed + a.id) - seededRandom(seed + b.id));
  
  // Get mix of difficulties based on config
  const dist = APP_CONFIG.quiz.daily.distribution;
  const easy = shuffled.filter(q => q.difficulty === 'easy').slice(0, dist.easy);
  const medium = shuffled.filter(q => q.difficulty === 'medium').slice(0, dist.medium);
  const hard = shuffled.filter(q => q.difficulty === 'hard').slice(0, dist.hard);
  const expert = shuffled.filter(q => q.difficulty === 'expert').slice(0, dist.expert);

  return [...easy, ...medium, ...hard, ...expert];
}

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

export default function DailyPage() {
  const { user, isConnected, recordDailyCompletion } = useUser();
  const [dailyQuestions] = useState<Question[]>(getDailyQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | number[] | null>(null);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  // Session seed for shuffling (use today's date for consistent daily shuffling)
  const sessionSeed = useMemo(() => {
    const today = new Date();
    return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  }, []);

  // Pre-shuffle questions for this session
  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    return dailyQuestions.map((q) => {
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
  }, [dailyQuestions, sessionSeed]);

  useEffect(() => {
    // Check if already played today
    const lastPlayed = localStorage.getItem('dailyLastPlayed');
    const today = new Date().toDateString();
    if (lastPlayed === today) {
      setHasPlayedToday(true);
      const savedScore = localStorage.getItem('dailyTodayScore');
      if (savedScore) {
        setQuizComplete(true);
      }
    }

    // Load streak
    const savedStreak = localStorage.getItem('dailyStreak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  const currentShuffled = shuffledQuestions[currentIndex];
  const currentQuestion = currentShuffled?.original;
  const progress = ((currentIndex) / dailyQuestions.length) * 100;
  const timeLimit = currentQuestion ? getTimeLimit(currentQuestion.difficulty) : 15;
  const timePercent = (timeRemaining / timeLimit) * 100;

  // Handle timeout
  const handleTimeout = useCallback(() => {
    if (showResult || !currentQuestion) return;
    
    const timeAllowed = getTimeLimit(currentQuestion.difficulty);
    const timeTaken = timeAllowed;
    
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
    if (currentQuestion && !showResult && !hasPlayedToday) {
      const limit = getTimeLimit(currentQuestion.difficulty);
      setTimeRemaining(limit);
      setTimerActive(true);
      setQuestionStartTime(Date.now());
      setSelectedAnswer(null);
      setFillBlankAnswer('');
    }
  }, [currentIndex, currentQuestion, showResult, hasPlayedToday]);

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
      return checkAnswerWithTypoTolerance(
        answer as string,
        question.correctAnswer as string,
        3
      );
    }
    return answer === shuffled.shuffledCorrectIndex;
  };

  const handleSubmitAnswer = () => {
    setTimerActive(false);
    
    let answer: string | number | number[] | null;
    if (currentQuestion.type === 'fill-blank') {
      answer = fillBlankAnswer || null;
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
    if (currentIndex < dailyQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowResult(false);
    } else {
      // Quiz complete
      setQuizComplete(true);
      
      // Save today's play
      const today = new Date().toDateString();
      localStorage.setItem('dailyLastPlayed', today);
      
      // Update streak
      const lastDate = localStorage.getItem('dailyStreakDate');
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = 1;
      if (lastDate === yesterday.toDateString()) {
        newStreak = streak + 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      } else {
        newStreak = streak;
      }
      
      setStreak(newStreak);
      localStorage.setItem('dailyStreak', newStreak.toString());
      localStorage.setItem('dailyStreakDate', today);
      
      // Save score
      const correctCount = userAnswers.filter(a => a.isCorrect).length + (checkAnswer(currentShuffled, selectedAnswer || fillBlankAnswer) ? 1 : 0);
      localStorage.setItem('dailyTodayScore', correctCount.toString());
    }
  };

  const canSubmit = () => {
    if (currentQuestion.type === 'fill-blank') {
      return fillBlankAnswer.trim().length > 0;
    }
    return selectedAnswer !== null;
  };

  // Get timer color based on remaining time
  const getTimerColor = () => {
    if (timePercent > 50) return '#00f5d4';
    if (timePercent > 25) return '#fee440';
    return '#ef4444';
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

  // Time until next daily
  const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (quizComplete || hasPlayedToday) {
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const speedBonusTotal = userAnswers.reduce((sum, ans) => sum + ans.speedBonus, 0);
    const timeoutCount = userAnswers.filter(a => a.answer === null).length;
    const isPerfect = correctCount === dailyQuestions.length;

    // Speed stats
    const goldCount = userAnswers.filter(a => a.speedTier === 'gold').length;
    const silverCount = userAnswers.filter(a => a.speedTier === 'silver').length;
    const bronzeCount = userAnswers.filter(a => a.speedTier === 'bronze').length;

    // Award points if connected (only once)
    if (isConnected && pointsEarned === 0 && userAnswers.length > 0) {
      recordDailyCompletion(correctCount, dailyQuestions.length);
      const basePoints = 10 + (correctCount * 5) + (isPerfect ? 25 : 0);
      setPointsEarned(basePoints);
    }

    return (
      <div className="min-h-screen p-6">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {isPerfect ? '🎉' : correctCount >= 3 ? '🔥' : '💪'}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {hasPlayedToday && userAnswers.length === 0 ? 'Already Played!' : 'Daily Complete!'}
            </h1>
            <p className="text-[#a0a0b0]">Come back tomorrow for a new challenge</p>
          </div>

          {/* Score Card */}
          <div className="card p-6 mb-6 text-center">
            <div className="text-4xl font-bold text-[#00f5d4] mb-2">
              {correctCount}/{dailyQuestions.length}
            </div>
            <div className="text-[#a0a0b0] mb-4">Questions Correct</div>
            
            {timeoutCount > 0 && (
              <div className="text-sm text-[#a0a0b0] mb-4">
                ⏱️ {timeoutCount} timed out
              </div>
            )}
            
            {/* Speed Bonuses Summary */}
            {(goldCount > 0 || silverCount > 0 || bronzeCount > 0) && (
              <div className="bg-[#12121a] rounded-xl p-3 mb-4">
                <div className="text-sm font-semibold mb-2 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-[#fee440]" />
                  Speed Bonuses
                </div>
                <div className="flex justify-center gap-3 text-sm">
                  {goldCount > 0 && <span className="text-[#fee440]">⚡ {goldCount}</span>}
                  {silverCount > 0 && <span className="text-[#c0c0c0]">🚀 {silverCount}</span>}
                  {bronzeCount > 0 && <span className="text-[#cd7f32]">✨ {bronzeCount}</span>}
                </div>
              </div>
            )}
            
            {/* Streak */}
            <div className="flex items-center justify-center gap-2 text-[#f97316]">
              <Flame className="w-5 h-5" />
              <span className="font-bold">{streak} Day Streak!</span>
            </div>
          </div>

          {/* Points Earned */}
          {isConnected && pointsEarned > 0 && (
            <div className="bg-[#fee440]/10 border border-[#fee440]/30 rounded-xl p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 text-[#fee440]">
                <Coins className="w-5 h-5" />
                <span className="font-bold">+{pointsEarned} Airdrop Points!</span>
              </div>
              {speedBonusTotal > 0 && (
                <div className="text-xs text-[#a0a0b0] mt-1">Includes +{speedBonusTotal} speed bonus</div>
              )}
            </div>
          )}

          {/* Next Reset */}
          <div className="card p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-[#a0a0b0]">
              <Clock className="w-4 h-4" />
              <span>Next challenge in: <strong className="text-white">{getTimeUntilReset()}</strong></span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link href="/quiz" className="btn-primary text-center">
              Take Full IQ Test
            </Link>
            <Link href="/" className="btn-secondary text-center">
              Back to Home
            </Link>
          </div>
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
            <Flame className="w-5 h-5 text-[#f97316]" />
            <span className="font-semibold">Daily Challenge</span>
            {streak > 0 && (
              <span className="text-sm text-[#f97316]">🔥 {streak}</span>
            )}
          </div>
          <div className="text-[#a0a0b0]">
            {currentIndex + 1} / {dailyQuestions.length}
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
              {currentIndex < dailyQuestions.length - 1 ? (
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
