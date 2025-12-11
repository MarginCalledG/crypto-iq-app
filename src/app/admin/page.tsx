'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { questions as defaultQuestions, Question, categoryNames, Category, Difficulty, QuestionType } from '@/data/questions';

const ADMIN_PASSWORD = 'cryptoiq2024'; // Change this!

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<{ category: string; difficulty: string }>({ category: 'all', difficulty: 'all' });
  
  const [formData, setFormData] = useState<Partial<Question>>({
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'blockchain',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    points: 20
  });

  useEffect(() => {
    // Load questions
    setQuestions(defaultQuestions);
    
    // Check if already authenticated this session
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Wrong password');
    }
  };

  const handleSaveQuestion = () => {
    if (!formData.question || !formData.explanation) {
      alert('Please fill in all required fields');
      return;
    }

    const newQuestion: Question = {
      id: editingId || Math.max(...questions.map(q => q.id)) + 1,
      type: formData.type as QuestionType,
      difficulty: formData.difficulty as Difficulty,
      category: formData.category as Category,
      question: formData.question!,
      options: formData.type !== 'fill-blank' ? formData.options : undefined,
      correctAnswer: formData.correctAnswer!,
      explanation: formData.explanation!,
      points: formData.points || 20
    };

    if (editingId) {
      setQuestions(questions.map(q => q.id === editingId ? newQuestion : q));
    } else {
      setQuestions([...questions, newQuestion]);
    }

    resetForm();
    
    // Show export reminder
    alert('Question saved locally! Remember to export and update your questions.ts file for permanent changes.');
  };

  const resetForm = () => {
    setFormData({
      type: 'multiple-choice',
      difficulty: 'medium',
      category: 'blockchain',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      points: 20
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (question: Question) => {
    setFormData({
      ...question,
      options: question.options || ['', '', '', '']
    });
    setEditingId(question.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const exportQuestions = () => {
    const code = `export const questions: Question[] = ${JSON.stringify(questions, null, 2)};`;
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'questions-export.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredQuestions = questions.filter(q => {
    if (filter.category !== 'all' && q.category !== filter.category) return false;
    if (filter.difficulty !== 'all' && q.difficulty !== filter.difficulty) return false;
    return true;
  });

  const stats = {
    total: questions.length,
    byDifficulty: {
      easy: questions.filter(q => q.difficulty === 'easy').length,
      medium: questions.filter(q => q.difficulty === 'medium').length,
      hard: questions.filter(q => q.difficulty === 'hard').length,
      expert: questions.filter(q => q.difficulty === 'expert').length,
    },
    byCategory: Object.keys(categoryNames).reduce((acc, cat) => {
      acc[cat] = questions.filter(q => q.category === cat).length;
      return acc;
    }, {} as Record<string, number>)
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <div className="card p-6">
            <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field mb-4"
              />
              <button type="submit" className="btn-primary w-full">
                Login
              </button>
            </form>
            <Link href="/" className="block text-center mt-4 text-[#a0a0b0] hover:text-white text-sm">
              ← Back to App
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-4 border-b border-[#2a2a3a] sticky top-0 bg-[#0a0a0f] z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[#a0a0b0] hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Question Manager</h1>
            <span className="text-sm text-[#a0a0b0]">{questions.length} questions</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={exportQuestions} className="btn-secondary text-sm py-2 px-4">
              Export Questions
            </button>
            <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="card p-3 text-center">
            <div className="text-2xl font-bold text-[#00f5d4]">{stats.total}</div>
            <div className="text-xs text-[#a0a0b0]">Total</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.byDifficulty.easy}</div>
            <div className="text-xs text-[#a0a0b0]">Easy</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.byDifficulty.medium}</div>
            <div className="text-xs text-[#a0a0b0]">Medium</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl font-bold text-pink-400">{stats.byDifficulty.hard}</div>
            <div className="text-xs text-[#a0a0b0]">Hard</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.byDifficulty.expert}</div>
            <div className="text-xs text-[#a0a0b0]">Expert</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <select
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
            className="input-field py-2 px-3 w-auto"
          >
            <option value="all">All Categories</option>
            {Object.entries(categoryNames).map(([key, name]) => (
              <option key={key} value={key}>{name} ({stats.byCategory[key]})</option>
            ))}
          </select>
          <select
            value={filter.difficulty}
            onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
            className="input-field py-2 px-3 w-auto"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {/* Question List */}
        <div className="space-y-3">
          {filteredQuestions.map((q, idx) => (
            <div key={q.id} className="card overflow-hidden">
              <div 
                className="p-4 flex items-start gap-4 cursor-pointer hover:bg-[#12121a]"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <span className="text-[#a0a0b0] text-sm w-8">#{q.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`badge badge-${q.difficulty}`}>{q.difficulty}</span>
                    <span className={`text-xs cat-${q.category}`}>{categoryNames[q.category]}</span>
                    <span className="text-xs text-[#a0a0b0]">{q.type}</span>
                  </div>
                  <p className="text-sm truncate">{q.question}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(q); }}
                    className="p-2 text-[#a0a0b0] hover:text-[#00f5d4]"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(q.id); }}
                    className="p-2 text-[#a0a0b0] hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedId === q.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
              
              {expandedId === q.id && (
                <div className="px-4 pb-4 pt-2 border-t border-[#2a2a3a] bg-[#12121a]">
                  {q.options && (
                    <div className="mb-3">
                      <div className="text-xs text-[#a0a0b0] mb-2">Options:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {q.options.map((opt, i) => (
                          <div 
                            key={i}
                            className={`text-sm p-2 rounded ${i === q.correctAnswer ? 'bg-green-500/20 text-green-400' : 'bg-[#1a1a24]'}`}
                          >
                            {String.fromCharCode(65 + i)}. {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {q.type === 'fill-blank' && (
                    <div className="mb-3">
                      <div className="text-xs text-[#a0a0b0] mb-1">Correct Answer:</div>
                      <div className="text-sm text-green-400 mono">{q.correctAnswer as string}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-xs text-[#a0a0b0] mb-1">Explanation:</div>
                    <div className="text-sm text-[#a0a0b0]">{q.explanation}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-[#2a2a3a] flex items-center justify-between sticky top-0 bg-[#1a1a24]">
              <h2 className="text-lg font-semibold">
                {editingId ? 'Edit Question' : 'Add New Question'}
              </h2>
              <button onClick={resetForm} className="text-[#a0a0b0] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Type, Difficulty, Category */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-[#a0a0b0] block mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as QuestionType })}
                    className="input-field py-2"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="fill-blank">Fill in Blank</option>
                    <option value="spot-scam">Spot the Scam</option>
                    <option value="order-ranking">Order Ranking</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#a0a0b0] block mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => {
                      const diff = e.target.value as Difficulty;
                      const points = { easy: 10, medium: 20, hard: 35, expert: 50 }[diff];
                      setFormData({ ...formData, difficulty: diff, points });
                    }}
                    className="input-field py-2"
                  >
                    <option value="easy">Easy (10 pts)</option>
                    <option value="medium">Medium (20 pts)</option>
                    <option value="hard">Hard (35 pts)</option>
                    <option value="expert">Expert (50 pts)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#a0a0b0] block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="input-field py-2"
                  >
                    {Object.entries(categoryNames).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question */}
              <div>
                <label className="text-xs text-[#a0a0b0] block mb-1">
                  Question {formData.type === 'fill-blank' && '(use _______ for blank)'}
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="input-field min-h-20"
                  placeholder="Enter your question..."
                />
              </div>

              {/* Options (for multiple choice types) */}
              {(formData.type === 'multiple-choice' || formData.type === 'true-false' || formData.type === 'spot-scam') && (
                <div>
                  <label className="text-xs text-[#a0a0b0] block mb-2">
                    Options (click to mark correct answer)
                  </label>
                  <div className="space-y-2">
                    {(formData.type === 'true-false' ? ['True', 'False'] : formData.options || []).map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, correctAnswer: idx })}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm shrink-0 ${
                            formData.correctAnswer === idx 
                              ? 'border-green-500 bg-green-500/20 text-green-400' 
                              : 'border-[#2a2a3a]'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </button>
                        {formData.type !== 'true-false' && (
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...(formData.options || [])];
                              newOptions[idx] = e.target.value;
                              setFormData({ ...formData, options: newOptions });
                            }}
                            className="input-field py-2 flex-1"
                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                          />
                        )}
                        {formData.type === 'true-false' && (
                          <span className="text-sm">{opt}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fill in blank answer */}
              {formData.type === 'fill-blank' && (
                <div>
                  <label className="text-xs text-[#a0a0b0] block mb-1">Correct Answer</label>
                  <input
                    type="text"
                    value={formData.correctAnswer as string || ''}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                    className="input-field"
                    placeholder="The correct word/phrase"
                  />
                </div>
              )}

              {/* Explanation */}
              <div>
                <label className="text-xs text-[#a0a0b0] block mb-1">Explanation</label>
                <textarea
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  className="input-field min-h-20"
                  placeholder="Explain why this answer is correct..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button onClick={resetForm} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button onClick={handleSaveQuestion} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingId ? 'Update' : 'Add'} Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
