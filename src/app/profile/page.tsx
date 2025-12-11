'use client';

import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { ArrowLeft, Wallet, Trophy, Flame, Brain, Gift, Clock, Coins, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
  const { user, isConnected, pointsHistory, connectWallet, disconnectWallet } = useUser();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getReasonLabel = (reason: string) => {
    const labels: Record<string, string> = {
      daily_challenge_complete: 'Daily Challenge Complete',
      daily_challenge_perfect: 'Perfect Daily Score!',
      daily_correct_answers: 'Correct Answers',
      iq_test_complete: 'IQ Test Complete',
      iq_test_high_score: 'High IQ Bonus (130+)',
      streak_bonus_7: '7 Day Streak Bonus',
      streak_bonus_30: '30 Day Streak Bonus',
      streak_bonus_100: '100 Day Streak Bonus',
      referral: 'Referral Bonus',
      early_adopter: 'Early Adopter Bonus',
    };
    return labels[reason] || reason;
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-[#1a1a24] flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-10 h-10 text-[#00f5d4]" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Connect to Track Points</h1>
          <p className="text-[#a0a0b0] mb-8">
            Connect your wallet to start earning points for completing challenges. 
            Points will be used for our future token airdrop! 🚀
          </p>
          
          <button onClick={connectWallet} className="btn-primary w-full mb-4">
            Connect Wallet
          </button>
          
          <Link href="/" className="text-[#a0a0b0] hover:text-white">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="p-6 border-b border-[#2a2a3a]">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#a0a0b0] hover:text-white mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <button 
              onClick={disconnectWallet}
              className="text-sm text-[#a0a0b0] hover:text-red-400"
            >
              Disconnect
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Wallet Info */}
          <div className="card p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#00f5d4]/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#00f5d4]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">
                  {user.farcasterUsername || 'Anonymous User'}
                </div>
                <div className="text-sm text-[#a0a0b0] font-mono truncate">
                  {user.walletAddress?.slice(0, 6)}...{user.walletAddress?.slice(-4)}
                </div>
              </div>
            </div>
          </div>

          {/* Points Card - Highlighted */}
          <div className="share-card mb-6 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-[#fee440]" />
                <span className="text-lg font-semibold">Total Points</span>
              </div>
              <div className="flex items-center gap-1 text-[#00f5d4]">
                <Gift className="w-4 h-4" />
                <span className="text-xs">Airdrop Eligible</span>
              </div>
            </div>
            <div className="text-5xl font-bold text-[#fee440] mb-2">
              {user.totalPoints.toLocaleString()}
            </div>
            <p className="text-sm text-[#a0a0b0]">
              Keep earning points for the upcoming token airdrop!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-[#f15bb5]" />
                <span className="text-sm text-[#a0a0b0]">Current Streak</span>
              </div>
              <div className="text-2xl font-bold">{user.currentStreak} days</div>
              <div className="text-xs text-[#a0a0b0]">Best: {user.longestStreak} days</div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-[#9b5de5]" />
                <span className="text-sm text-[#a0a0b0]">Highest IQ</span>
              </div>
              <div className="text-2xl font-bold">{user.highestIQ || '—'}</div>
              <div className="text-xs text-[#a0a0b0]">{user.iqTestsCompleted} tests taken</div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-[#fee440]" />
                <span className="text-sm text-[#a0a0b0]">Daily Challenges</span>
              </div>
              <div className="text-2xl font-bold">{user.dailyChallengesCompleted}</div>
              <div className="text-xs text-[#a0a0b0]">completed</div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[#00f5d4]" />
                <span className="text-sm text-[#a0a0b0]">Streak Multiplier</span>
              </div>
              <div className="text-2xl font-bold">
                {user.currentStreak >= 100 ? '1.5x' : user.currentStreak >= 30 ? '1.25x' : user.currentStreak >= 7 ? '1.1x' : '1x'}
              </div>
              <div className="text-xs text-[#a0a0b0]">on all points</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link href="/daily" className="card card-hover p-4 flex items-center justify-between">
              <span className="font-medium">Daily Challenge</span>
              <ChevronRight className="w-5 h-5 text-[#a0a0b0]" />
            </Link>
            <Link href="/quiz" className="card card-hover p-4 flex items-center justify-between">
              <span className="font-medium">IQ Test</span>
              <ChevronRight className="w-5 h-5 text-[#a0a0b0]" />
            </Link>
          </div>

          {/* Points History */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-[#2a2a3a]">
              <h2 className="font-semibold">Points History</h2>
            </div>
            
            {pointsHistory.length === 0 ? (
              <div className="p-8 text-center text-[#a0a0b0]">
                <Coins className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No points earned yet</p>
                <p className="text-sm">Complete challenges to start earning!</p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {pointsHistory.map((entry) => (
                  <div 
                    key={entry.id}
                    className="flex items-center justify-between p-4 border-b border-[#2a2a3a] last:border-0"
                  >
                    <div>
                      <div className="font-medium text-sm">{getReasonLabel(entry.reason)}</div>
                      <div className="text-xs text-[#a0a0b0]">{formatDate(entry.date)}</div>
                    </div>
                    <div className="text-[#00f5d4] font-semibold">
                      +{entry.points}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Airdrop Info */}
          <div className="mt-6 card p-4 border border-[#fee440]/30 bg-[#fee440]/5">
            <div className="flex items-start gap-3">
              <Gift className="w-6 h-6 text-[#fee440] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-[#fee440] mb-1">Airdrop Coming Soon</h3>
                <p className="text-sm text-[#a0a0b0]">
                  Your points will determine your share of our upcoming token airdrop. 
                  Keep completing daily challenges and IQ tests to maximize your allocation!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
