'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Medal, Flame, Brain, Crown } from 'lucide-react';

// Mock leaderboard data - in production this would come from a database
const mockLeaderboard = [
  { rank: 1, name: 'CryptoKing.eth', iq: 167, streak: 45, avatar: '🦁' },
  { rank: 2, name: 'DefiDegen', iq: 158, streak: 32, avatar: '🦍' },
  { rank: 3, name: 'OnchainOG', iq: 154, streak: 28, avatar: '🐋' },
  { rank: 4, name: 'BaseBuilder', iq: 149, streak: 21, avatar: '🔵' },
  { rank: 5, name: 'SolanaMaxi', iq: 145, streak: 19, avatar: '☀️' },
  { rank: 6, name: 'ETHMerge', iq: 142, streak: 15, avatar: '💎' },
  { rank: 7, name: 'GasOptimizer', iq: 138, streak: 12, avatar: '⛽' },
  { rank: 8, name: 'NFTCollector', iq: 135, streak: 10, avatar: '🖼️' },
  { rank: 9, name: 'YieldFarmer', iq: 132, streak: 8, avatar: '🌾' },
  { rank: 10, name: 'BlockExplorer', iq: 128, streak: 5, avatar: '🔍' },
];

const iqTiers = [
  { min: 150, name: 'Onchain Oracle', color: '#9b5de5', icon: '🔮' },
  { min: 130, name: 'DeFi Degen', color: '#f15bb5', icon: '🦍' },
  { min: 110, name: 'Chain Scholar', color: '#00f5d4', icon: '📚' },
  { min: 90, name: 'Crypto Curious', color: '#fee440', icon: '🔍' },
  { min: 0, name: 'Fresh Wallet', color: '#a0a0b0', icon: '👛' },
];

function getTier(iq: number) {
  return iqTiers.find(t => iq >= t.min) || iqTiers[iqTiers.length - 1];
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState<'iq' | 'daily' | 'streak'>('iq');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-6 border-b border-[#2a2a3a]">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#a0a0b0] hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#fee440]" />
            <h1 className="text-2xl font-bold">Leaderboard</h1>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-[#2a2a3a]">
        <div className="max-w-2xl mx-auto flex">
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              tab === 'iq' 
                ? 'text-[#00f5d4] border-b-2 border-[#00f5d4]' 
                : 'text-[#a0a0b0] hover:text-white'
            }`}
            onClick={() => setTab('iq')}
          >
            <Brain className="w-5 h-5 inline mr-2" />
            Crypto IQ
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              tab === 'daily' 
                ? 'text-[#00f5d4] border-b-2 border-[#00f5d4]' 
                : 'text-[#a0a0b0] hover:text-white'
            }`}
            onClick={() => setTab('daily')}
          >
            <Trophy className="w-5 h-5 inline mr-2" />
            Daily Score
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium transition-colors ${
              tab === 'streak' 
                ? 'text-[#00f5d4] border-b-2 border-[#00f5d4]' 
                : 'text-[#a0a0b0] hover:text-white'
            }`}
            onClick={() => setTab('streak')}
          >
            <Flame className="w-5 h-5 inline mr-2" />
            Streaks
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="p-6 border-b border-[#2a2a3a]">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end justify-center gap-4 mb-4">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#1a1a24] border-2 border-[#c0c0c0] flex items-center justify-center text-3xl mb-2">
                {mockLeaderboard[1].avatar}
              </div>
              <div className="text-sm font-medium truncate max-w-20">{mockLeaderboard[1].name}</div>
              <div className="text-xs text-[#a0a0b0]">{mockLeaderboard[1].iq} IQ</div>
              <div className="mt-2 h-16 w-20 rounded-t-lg bg-gradient-to-t from-[#c0c0c0]/20 to-transparent flex items-end justify-center pb-2">
                <Medal className="w-6 h-6 text-[#c0c0c0]" />
              </div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <Crown className="w-6 h-6 text-[#fee440] mx-auto mb-1" />
              <div className="w-20 h-20 rounded-full bg-[#1a1a24] border-2 border-[#fee440] flex items-center justify-center text-4xl mb-2 glow-cyan">
                {mockLeaderboard[0].avatar}
              </div>
              <div className="text-sm font-medium truncate max-w-24">{mockLeaderboard[0].name}</div>
              <div className="text-xs text-[#fee440]">{mockLeaderboard[0].iq} IQ</div>
              <div className="mt-2 h-24 w-24 rounded-t-lg bg-gradient-to-t from-[#fee440]/20 to-transparent flex items-end justify-center pb-2">
                <Trophy className="w-8 h-8 text-[#fee440]" />
              </div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#1a1a24] border-2 border-[#cd7f32] flex items-center justify-center text-3xl mb-2">
                {mockLeaderboard[2].avatar}
              </div>
              <div className="text-sm font-medium truncate max-w-20">{mockLeaderboard[2].name}</div>
              <div className="text-xs text-[#a0a0b0]">{mockLeaderboard[2].iq} IQ</div>
              <div className="mt-2 h-12 w-20 rounded-t-lg bg-gradient-to-t from-[#cd7f32]/20 to-transparent flex items-end justify-center pb-2">
                <Medal className="w-6 h-6 text-[#cd7f32]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="card overflow-hidden">
            {mockLeaderboard.slice(3).map((user, idx) => {
              const tier = getTier(user.iq);
              return (
                <div
                  key={user.rank}
                  className="flex items-center gap-4 p-4 border-b border-[#2a2a3a] last:border-0 hover:bg-[#12121a] transition-colors"
                >
                  <div className="w-8 text-center text-[#a0a0b0] font-medium">
                    {user.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1a1a24] flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{user.name}</div>
                    <div className="text-xs" style={{ color: tier.color }}>
                      {tier.icon} {tier.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#00f5d4]">{user.iq}</div>
                    <div className="text-xs text-[#a0a0b0]">IQ</div>
                  </div>
                  <div className="text-right w-16">
                    <div className="flex items-center justify-end gap-1 text-[#fee440]">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium">{user.streak}</span>
                    </div>
                    <div className="text-xs text-[#a0a0b0]">streak</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Your Position */}
          <div className="mt-6 card p-4 border-2 border-[#00f5d4]">
            <div className="flex items-center gap-4">
              <div className="w-8 text-center text-[#a0a0b0] font-medium">
                --
              </div>
              <div className="w-10 h-10 rounded-full bg-[#00f5d4]/20 flex items-center justify-center text-xl">
                👤
              </div>
              <div className="flex-1">
                <div className="font-medium">You</div>
                <div className="text-xs text-[#a0a0b0]">Take the test to get ranked</div>
              </div>
              <Link href="/quiz" className="btn-primary text-sm py-2 px-4">
                Take Test
              </Link>
            </div>
          </div>

          {/* IQ Tiers Legend */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-[#a0a0b0] mb-4">IQ TIERS</h3>
            <div className="grid grid-cols-2 gap-3">
              {iqTiers.map((tier) => (
                <div key={tier.name} className="flex items-center gap-2">
                  <span className="text-xl">{tier.icon}</span>
                  <div>
                    <div className="text-sm font-medium" style={{ color: tier.color }}>
                      {tier.name}
                    </div>
                    <div className="text-xs text-[#a0a0b0]">{tier.min}+ IQ</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
