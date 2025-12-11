// Database types for points tracking
// This will be used for the future airdrop

export interface User {
  id: string;
  walletAddress: string;
  farcasterFid?: number;
  farcasterUsername?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PointsEntry {
  id: string;
  userId: string;
  points: number;
  reason: PointsReason;
  metadata?: Record<string, unknown>;
  earnedAt: Date;
}

export type PointsReason = 
  | 'daily_challenge_complete'
  | 'daily_challenge_perfect'
  | 'iq_test_complete'
  | 'streak_bonus_7'
  | 'streak_bonus_30'
  | 'streak_bonus_100'
  | 'referral'
  | 'early_adopter'
  | 'bug_report'
  | 'feedback';

export interface UserStats {
  userId: string;
  totalPoints: number;
  dailyChallengesCompleted: number;
  iqTestsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  highestIQ: number;
  rank?: number;
}

// Points configuration - easy to adjust before airdrop
export const POINTS_CONFIG = {
  // Daily challenge rewards
  daily_challenge_complete: 10,
  daily_challenge_perfect: 25,
  daily_challenge_per_correct: 5,
  
  // IQ Test rewards  
  iq_test_complete: 50,
  iq_test_high_score_bonus: 100,
  
  // Streak bonuses
  streak_bonus_7: 50,
  streak_bonus_30: 250,
  streak_bonus_100: 1000,
  
  // Other rewards
  referral: 100,
  early_adopter: 500,
  
  // Multipliers
  streak_multiplier_base: 1.0,
  streak_multiplier_7: 1.1,
  streak_multiplier_30: 1.25,
  streak_multiplier_100: 1.5,
};

export function calculatePointsWithMultiplier(basePoints: number, streak: number): number {
  let multiplier = POINTS_CONFIG.streak_multiplier_base;
  
  if (streak >= 100) {
    multiplier = POINTS_CONFIG.streak_multiplier_100;
  } else if (streak >= 30) {
    multiplier = POINTS_CONFIG.streak_multiplier_30;
  } else if (streak >= 7) {
    multiplier = POINTS_CONFIG.streak_multiplier_7;
  }
  
  return Math.round(basePoints * multiplier);
}
