'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { POINTS_CONFIG, calculatePointsWithMultiplier } from '@/types/points';

interface UserData {
  walletAddress: string | null;
  farcasterUsername: string | null;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  highestIQ: number;
  dailyChallengesCompleted: number;
  iqTestsCompleted: number;
  lastDailyDate: string | null;
}

interface PointsHistoryEntry {
  id: number;
  reason: string;
  points: number;
  date: string;
}

interface UserContextType {
  user: UserData;
  isConnected: boolean;
  pointsHistory: PointsHistoryEntry[];
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addPoints: (reason: string, basePoints: number, metadata?: Record<string, unknown>) => void;
  updateStreak: (completed: boolean) => void;
  updateHighestIQ: (iq: number) => void;
  recordDailyCompletion: (correct: number, total: number) => void;
  recordIQTestCompletion: (iq: number, score: number) => void;
}

const defaultUser: UserData = {
  walletAddress: null,
  farcasterUsername: null,
  totalPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
  highestIQ: 0,
  dailyChallengesCompleted: 0,
  iqTestsCompleted: 0,
  lastDailyDate: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(defaultUser);
  const [pointsHistory, setPointsHistory] = useState<PointsHistoryEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cryptoiq_user');
    const savedHistory = localStorage.getItem('cryptoiq_points_history');
    
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setIsConnected(!!parsed.walletAddress);
    }
    
    if (savedHistory) {
      setPointsHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save user data whenever it changes
  useEffect(() => {
    if (user.walletAddress) {
      localStorage.setItem('cryptoiq_user', JSON.stringify(user));
    }
  }, [user]);

  // Save points history
  useEffect(() => {
    if (pointsHistory.length > 0) {
      localStorage.setItem('cryptoiq_points_history', JSON.stringify(pointsHistory));
    }
  }, [pointsHistory]);

  const connectWallet = async () => {
    // For Base Mini App, we'll use the Farcaster context
    // This is a simplified version - in production use MiniKit SDK
    try {
      // Check if we're in a Farcaster frame
      if (typeof window !== 'undefined' && (window as any).farcaster) {
        const fc = (window as any).farcaster;
        const context = await fc.getContext();
        
        setUser(prev => ({
          ...prev,
          walletAddress: context.user?.wallet?.address || `demo_${Date.now()}`,
          farcasterUsername: context.user?.username || null,
        }));
        setIsConnected(true);
      } else {
        // Demo mode for testing outside Farcaster
        const demoWallet = `0x${Math.random().toString(16).slice(2, 42)}`;
        setUser(prev => ({
          ...prev,
          walletAddress: demoWallet,
        }));
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // Fallback to demo mode
      const demoWallet = `0x${Math.random().toString(16).slice(2, 42)}`;
      setUser(prev => ({
        ...prev,
        walletAddress: demoWallet,
      }));
      setIsConnected(true);
    }
  };

  const disconnectWallet = () => {
    setUser(defaultUser);
    setPointsHistory([]);
    setIsConnected(false);
    localStorage.removeItem('cryptoiq_user');
    localStorage.removeItem('cryptoiq_points_history');
  };

  const addPoints = (reason: string, basePoints: number) => {
    const pointsWithMultiplier = calculatePointsWithMultiplier(basePoints, user.currentStreak);
    
    setUser(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + pointsWithMultiplier,
    }));

    const historyEntry: PointsHistoryEntry = {
      id: Date.now(),
      reason,
      points: pointsWithMultiplier,
      date: new Date().toISOString(),
    };

    setPointsHistory(prev => [historyEntry, ...prev].slice(0, 100)); // Keep last 100 entries
  };

  const updateStreak = (completed: boolean) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    setUser(prev => {
      let newStreak = prev.currentStreak;
      
      if (completed) {
        if (prev.lastDailyDate === yesterday || !prev.lastDailyDate) {
          newStreak = prev.currentStreak + 1;
        } else if (prev.lastDailyDate !== today) {
          newStreak = 1; // Reset streak if missed a day
        }
        
        // Check for streak bonuses
        if (newStreak === 7 && prev.currentStreak < 7) {
          addPoints('streak_bonus_7', POINTS_CONFIG.streak_bonus_7);
        } else if (newStreak === 30 && prev.currentStreak < 30) {
          addPoints('streak_bonus_30', POINTS_CONFIG.streak_bonus_30);
        } else if (newStreak === 100 && prev.currentStreak < 100) {
          addPoints('streak_bonus_100', POINTS_CONFIG.streak_bonus_100);
        }
      }

      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastDailyDate: today,
      };
    });
  };

  const updateHighestIQ = (iq: number) => {
    setUser(prev => ({
      ...prev,
      highestIQ: Math.max(prev.highestIQ, iq),
    }));
  };

  const recordDailyCompletion = (correct: number, total: number) => {
    // Base points for completion
    addPoints('daily_challenge_complete', POINTS_CONFIG.daily_challenge_complete);
    
    // Points per correct answer
    addPoints('daily_correct_answers', correct * POINTS_CONFIG.daily_challenge_per_correct);
    
    // Perfect score bonus
    if (correct === total) {
      addPoints('daily_challenge_perfect', POINTS_CONFIG.daily_challenge_perfect);
    }

    setUser(prev => ({
      ...prev,
      dailyChallengesCompleted: prev.dailyChallengesCompleted + 1,
    }));

    updateStreak(true);
  };

  const recordIQTestCompletion = (iq: number, score: number) => {
    // Base points for completion
    addPoints('iq_test_complete', POINTS_CONFIG.iq_test_complete);
    
    // High score bonus
    if (iq >= 130) {
      addPoints('iq_test_high_score', POINTS_CONFIG.iq_test_high_score_bonus);
    }

    setUser(prev => ({
      ...prev,
      iqTestsCompleted: prev.iqTestsCompleted + 1,
      highestIQ: Math.max(prev.highestIQ, iq),
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isConnected,
        pointsHistory,
        connectWallet,
        disconnectWallet,
        addPoints,
        updateStreak,
        updateHighestIQ,
        recordDailyCompletion,
        recordIQTestCompletion,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
