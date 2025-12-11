// App Configuration
// Easily adjust settings here

export const APP_CONFIG = {
  // App Info
  name: 'Crypto IQ',
  description: 'Test your blockchain knowledge',
  
  // Quiz Settings
  quiz: {
    // Full IQ Test - uses ALL questions
    fullTest: {
      enabled: true,
      // Set to a number to limit, or null to use all questions
      maxQuestions: null, // null = all 50 questions
    },
    
    // Daily Challenge - quick daily quiz
    daily: {
      enabled: true,
      questionsPerDay: 5, // Number of questions per daily challenge
      // Distribution by difficulty (must sum to questionsPerDay)
      distribution: {
        easy: 1,
        medium: 2,
        hard: 1,
        expert: 1,
      },
    },
    
    // Timer settings per difficulty (in seconds)
    // Designed to block AI cheating while being fair to real users
    timers: {
      easy: 15,    // Quick recall questions
      medium: 20,  // Need to read and think
      hard: 25,    // Complex analysis required
      expert: 30,  // Careful consideration needed
    },
    
    // Speed bonus settings
    speedBonus: {
      enabled: true,
      // Percentage of time remaining to qualify for bonus tiers
      // e.g., if you answer in <50% of time, you get gold bonus
      tiers: {
        gold: { threshold: 0.5, multiplier: 1.5 },    // <50% time used = 50% bonus
        silver: { threshold: 0.7, multiplier: 1.25 }, // <70% time used = 25% bonus
        bronze: { threshold: 0.85, multiplier: 1.1 }, // <85% time used = 10% bonus
      },
    },
  },
  
  // Points Configuration (for airdrop)
  points: {
    // Daily challenge rewards
    daily: {
      completion: 10,      // Base points for completing
      perCorrect: 5,       // Per correct answer
      perfectBonus: 25,    // Bonus for 100% correct
    },
    
    // IQ Test rewards
    iqTest: {
      completion: 50,      // Base points for completing
      highScoreBonus: 100, // Bonus for 130+ IQ
      highScoreThreshold: 130,
    },
    
    // Streak bonuses
    streaks: {
      day7: 50,
      day30: 250,
      day100: 1000,
    },
    
    // Streak multipliers
    multipliers: {
      base: 1.0,
      day7: 1.1,    // 10% bonus
      day30: 1.25,  // 25% bonus
      day100: 1.5,  // 50% bonus
    },
    
    // Other rewards
    referral: 100,
    earlyAdopter: 500, // First N users
    earlyAdopterLimit: 1000,
  },
  
  // IQ Scoring
  iqScoring: {
    // Maps score percentage to IQ
    minIQ: 50,
    maxIQ: 170,
    
    // Titles and thresholds
    titles: [
      { min: 150, title: 'Onchain Oracle', description: 'Top 1%', emoji: '🔮' },
      { min: 130, title: 'DeFi Degen', description: 'Top 10%', emoji: '🦍' },
      { min: 110, title: 'Chain Scholar', description: 'Top 30%', emoji: '📚' },
      { min: 90, title: 'Crypto Curious', description: 'Average', emoji: '🔍' },
      { min: 70, title: 'Fresh Wallet', description: 'Below Average', emoji: '👛' },
      { min: 0, title: 'Pre-Pilled', description: 'Just getting started', emoji: '🌱' },
    ],
  },
  
  // Categories
  categories: {
    blockchain: { name: 'Blockchain Basics', color: '#00f5d4' },
    defi: { name: 'DeFi', color: '#9b5de5' },
    trading: { name: 'Trading & Markets', color: '#fee440' },
    security: { name: 'Security & Self-Custody', color: '#ef4444' },
    history: { name: 'Crypto History & Culture', color: '#f97316' },
    base: { name: 'Base Ecosystem', color: '#3b82f6' },
    solana: { name: 'Solana Ecosystem', color: '#14f195' },
  },
  
  // Admin Settings
  admin: {
    password: 'cryptoiq2024', // CHANGE THIS IN PRODUCTION!
    enabled: true,
  },
  
  // Feature Flags
  features: {
    leaderboard: true,
    referrals: false, // Coming soon
    tournaments: false, // Coming soon
    notifications: false, // Coming soon
  },
};

export default APP_CONFIG;
