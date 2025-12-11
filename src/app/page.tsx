'use client';

import Link from 'next/link';
import { Brain, Trophy, Zap, Users, Coins, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const { user, isConnected, connectWallet } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-[#00f5d4]" />
          <span className="text-xl font-bold">Crypto IQ</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/leaderboard" className="text-[#a0a0b0] hover:text-white transition-colors">
            Leaderboard
          </Link>
          {isConnected ? (
            <Link href="/profile" className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1a1a24] border border-[#2a2a3a] hover:border-[#00f5d4] transition-colors">
              <Coins className="w-4 h-4 text-[#fee440]" />
              <span className="font-semibold text-[#fee440]">{user.totalPoints.toLocaleString()}</span>
              <User className="w-4 h-4 text-[#a0a0b0]" />
            </Link>
          ) : (
            <button 
              onClick={connectWallet}
              className="px-4 py-2 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4] text-[#00f5d4] text-sm font-medium hover:bg-[#00f5d4]/20 transition-colors"
            >
              Connect
            </button>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="animate-fade-in-up max-w-2xl">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-[#2a2a3a] bg-[#12121a]">
            <span className="text-[#00f5d4] text-sm font-medium">🧠 50 Questions • 7 Categories</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            What's Your
            <span className="block text-[#00f5d4] text-glow-cyan">Crypto IQ?</span>
          </h1>
          
          <p className="text-xl text-[#a0a0b0] mb-10 max-w-lg mx-auto">
            Test your blockchain knowledge across DeFi, trading, security, Solana, Base, and more. Compete with friends and prove you're an onchain oracle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/quiz" className="btn-primary text-lg flex flex-col items-center justify-center gap-1 py-4 px-8">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Take the IQ Test
              </div>
              <span className="text-xs opacity-80">50 questions • Full assessment</span>
            </Link>
            <Link href="/daily" className="btn-secondary text-lg flex flex-col items-center justify-center gap-1 py-4 px-8">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Daily Challenge
              </div>
              <span className="text-xs opacity-60">5 questions • Build your streak</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="stat-box">
              <div className="text-2xl font-bold text-[#00f5d4]">50</div>
              <div className="text-sm text-[#a0a0b0]">Questions</div>
            </div>
            <div className="stat-box">
              <div className="text-2xl font-bold text-[#9b5de5]">7</div>
              <div className="text-sm text-[#a0a0b0]">Categories</div>
            </div>
            <div className="stat-box">
              <div className="text-2xl font-bold text-[#f15bb5]">4</div>
              <div className="text-sm text-[#a0a0b0]">Difficulty Levels</div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="card card-hover p-6">
            <div className="w-12 h-12 rounded-xl bg-[#00f5d4]/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-[#00f5d4]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Crypto IQ Test</h3>
            <p className="text-[#a0a0b0] text-sm">
              50 questions from easy to expert. Get your IQ score and find out if you're a Pre-Pilled newbie or an Onchain Oracle.
            </p>
          </div>

          <div className="card card-hover p-6">
            <div className="w-12 h-12 rounded-xl bg-[#9b5de5]/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#9b5de5]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Daily Challenge</h3>
            <p className="text-[#a0a0b0] text-sm">
              New questions every day. Build your streak, climb the daily leaderboard, compete with friends.
            </p>
          </div>

          <div className="card card-hover p-6">
            <div className="w-12 h-12 rounded-xl bg-[#f15bb5]/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#f15bb5]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Compete & Share</h3>
            <p className="text-[#a0a0b0] text-sm">
              Challenge friends head-to-head. Share your results. Prove you know crypto better than anyone.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="px-6 py-12 border-t border-[#2a2a3a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Test Categories</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Blockchain Basics', color: '#00f5d4' },
              { name: 'DeFi', color: '#9b5de5' },
              { name: 'Trading & Markets', color: '#fee440' },
              { name: 'Security', color: '#ef4444' },
              { name: 'Crypto History', color: '#f97316' },
              { name: 'Base Ecosystem', color: '#3b82f6' },
              { name: 'Solana', color: '#14f195' },
            ].map((cat) => (
              <span
                key={cat.name}
                className="px-4 py-2 rounded-full border text-sm font-medium"
                style={{ borderColor: cat.color, color: cat.color }}
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t border-[#2a2a3a] text-center text-[#a0a0b0] text-sm">
        <p>Built for the Base ecosystem 🔵</p>
      </footer>
    </div>
  );
}
