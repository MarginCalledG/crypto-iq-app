export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'spot-scam' | 'order-ranking';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type Category = 'blockchain' | 'defi' | 'trading' | 'security' | 'history' | 'base' | 'solana';

export interface Question {
  id: number;
  type: QuestionType;
  difficulty: Difficulty;
  category: Category;
  question: string;
  options?: string[];
  correctAnswer: string | number | number[];
  explanation: string;
  points: number;
}

export const questions: Question[] = [
  // EASY QUESTIONS (1-10)
  {
    id: 1,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'blockchain',
    question: 'What is a blockchain?',
    options: [
      'A type of cryptocurrency',
      'A distributed ledger of transactions',
      'A crypto wallet',
      'A trading platform'
    ],
    correctAnswer: 1,
    explanation: 'A blockchain is a distributed ledger that records transactions across many computers in a way that makes it nearly impossible to alter retroactively.',
    points: 10
  },
  {
    id: 2,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'blockchain',
    question: 'What is a "block" in blockchain?',
    options: [
      'A type of cryptocurrency',
      'A group of transactions bundled together',
      'A mining computer',
      'A wallet address'
    ],
    correctAnswer: 1,
    explanation: 'A block is a collection of transaction data that is bundled together and added to the blockchain.',
    points: 10
  },
  {
    id: 3,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'security',
    question: 'What should you NEVER share with anyone?',
    options: [
      'Your wallet address',
      'Your seed phrase',
      'Your transaction history',
      'Your ENS name'
    ],
    correctAnswer: 1,
    explanation: 'Your seed phrase (recovery phrase) gives complete access to your wallet. Never share it with anyone.',
    points: 10
  },
  {
    id: 4,
    type: 'true-false',
    difficulty: 'easy',
    category: 'security',
    question: 'It\'s safe to store your seed phrase in a notes app on your phone.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Never store your seed phrase digitally. If your phone is hacked, your funds can be stolen.',
    points: 10
  },
  {
    id: 5,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'trading',
    question: 'What does "HODL" mean in crypto?',
    options: [
      'A trading strategy for quick profits',
      'Hold On for Dear Life (holding long-term)',
      'A type of wallet',
      'A blockchain protocol'
    ],
    correctAnswer: 1,
    explanation: 'HODL originated from a typo of "hold" and became a meme meaning to hold your crypto long-term regardless of price swings.',
    points: 10
  },
  {
    id: 6,
    type: 'true-false',
    difficulty: 'easy',
    category: 'trading',
    question: 'A limit order executes immediately at the current market price.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'A limit order only executes when the price reaches your specified level. A market order executes immediately.',
    points: 10
  },
  {
    id: 7,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'defi',
    question: 'What does DEX stand for?',
    options: [
      'Digital Exchange',
      'Decentralized Exchange',
      'Direct Execution',
      'Derivative Exchange'
    ],
    correctAnswer: 1,
    explanation: 'A DEX (Decentralized Exchange) allows peer-to-peer trading without a central authority.',
    points: 10
  },
  {
    id: 8,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'defi',
    question: 'What is a "gas fee"?',
    options: [
      'A subscription fee for using crypto',
      'The cost to process a transaction on the blockchain',
      'A tax on crypto profits',
      'A fee for creating a wallet'
    ],
    correctAnswer: 1,
    explanation: 'Gas fees are payments made to validators/miners for processing and validating transactions on the blockchain.',
    points: 10
  },
  {
    id: 9,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'history',
    question: 'Who is the pseudonymous creator of Bitcoin?',
    options: [
      'Vitalik Buterin',
      'Satoshi Nakamoto',
      'Charles Hoskinson',
      'Gavin Wood'
    ],
    correctAnswer: 1,
    explanation: 'Satoshi Nakamoto is the pseudonym used by the unknown person or group who created Bitcoin and authored its whitepaper.',
    points: 10
  },
  {
    id: 10,
    type: 'multiple-choice',
    difficulty: 'easy',
    category: 'solana',
    question: 'What programming language is primarily used for Solana smart contracts?',
    options: [
      'Solidity',
      'JavaScript',
      'Rust',
      'Python'
    ],
    correctAnswer: 2,
    explanation: 'Solana programs are primarily written in Rust, though C and C++ are also supported.',
    points: 10
  },

  // MEDIUM QUESTIONS (11-25) - Requires understanding, not just definitions
  {
    id: 11,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'blockchain',
    question: 'If a blockchain has 12-second block times and requires 32 confirmations for finality, approximately how long until a transaction is considered final?',
    options: [
      'About 2 minutes',
      'About 6.5 minutes',
      'About 12 minutes',
      'About 32 minutes'
    ],
    correctAnswer: 1,
    explanation: '12 seconds × 32 confirmations = 384 seconds ≈ 6.4 minutes. Understanding block times and confirmation requirements is crucial for dApp development.',
    points: 20
  },
  {
    id: 12,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'blockchain',
    question: 'What happens to the gas you pay if your Ethereum transaction runs out of gas mid-execution?',
    options: [
      'All gas is refunded',
      'Unused gas is refunded, used gas is lost',
      'All gas is consumed and the transaction reverts',
      'The transaction pauses until you add more gas'
    ],
    correctAnswer: 2,
    explanation: 'When a transaction runs out of gas, it reverts but ALL the gas is consumed. This is why setting appropriate gas limits is important.',
    points: 20
  },
  {
    id: 13,
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'defi',
    question: 'In Uniswap V3, liquidity providers can concentrate their liquidity within specific price _______ to earn more fees.',
    correctAnswer: 'ranges',
    explanation: 'Concentrated liquidity in Uniswap V3 allows LPs to provide liquidity within custom price ranges, increasing capital efficiency but requiring active management.',
    points: 20
  },
  {
    id: 14,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'defi',
    question: 'A protocol has a 150% collateralization ratio. If you deposit $1500 in ETH, what is the maximum you can borrow?',
    options: [
      '$750',
      '$1000',
      '$1500',
      '$2250'
    ],
    correctAnswer: 1,
    explanation: 'With 150% collateralization, you need $1.50 of collateral per $1 borrowed. $1500 ÷ 1.5 = $1000 maximum borrow.',
    points: 20
  },
  {
    id: 15,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'defi',
    question: 'Why might impermanent loss become "permanent"?',
    options: [
      'If you remove liquidity before prices return to the original ratio',
      'If the pool runs out of one token',
      'If gas fees exceed your earnings',
      'If the protocol gets hacked'
    ],
    correctAnswer: 0,
    explanation: 'Impermanent loss only becomes realized (permanent) when you withdraw. If you withdraw while prices differ from your entry, the loss is locked in.',
    points: 20
  },
  {
    id: 16,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'trading',
    question: 'On a perpetual futures exchange, if the funding rate is -0.01% every 8 hours, who pays whom?',
    options: [
      'Longs pay shorts',
      'Shorts pay longs',
      'Both pay the exchange',
      'The exchange pays traders'
    ],
    correctAnswer: 1,
    explanation: 'Negative funding means shorts pay longs. This typically happens when the perpetual price is below the spot price, incentivizing longs.',
    points: 20
  },
  {
    id: 17,
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'trading',
    question: 'When a large order is split into smaller pieces to minimize price impact, this is called _______ execution.',
    correctAnswer: 'TWAP',
    explanation: 'TWAP (Time-Weighted Average Price) execution splits large orders over time to reduce slippage and market impact.',
    points: 20
  },
  {
    id: 18,
    type: 'spot-scam',
    difficulty: 'medium',
    category: 'security',
    question: 'Which transaction approval is MOST dangerous to sign?',
    options: [
      'Approve 100 USDC for Uniswap Router',
      'Approve unlimited USDC for an unknown contract',
      'Transfer 50 USDC to a friend',
      'Wrap 1 ETH to WETH'
    ],
    correctAnswer: 1,
    explanation: 'Unlimited approvals to unknown contracts are extremely dangerous - they can drain your entire balance at any time. Always verify contracts and limit approvals.',
    points: 20
  },
  {
    id: 19,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'security',
    question: 'What makes a "sweeper bot" attack different from a regular hack?',
    options: [
      'It steals NFTs instead of tokens',
      'It monitors compromised wallets and instantly transfers any incoming funds',
      'It only targets hardware wallets',
      'It requires physical access to your device'
    ],
    correctAnswer: 1,
    explanation: 'Sweeper bots continuously monitor compromised wallets and immediately steal any funds sent to them, making recovery nearly impossible.',
    points: 20
  },
  {
    id: 20,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'base',
    question: 'How does Base inherit security from Ethereum?',
    options: [
      'By running the same validators as Ethereum',
      'By posting transaction data to Ethereum L1 and using fraud proofs',
      'By using the same consensus mechanism',
      'By copying Ethereum\'s code'
    ],
    correctAnswer: 1,
    explanation: 'As an optimistic rollup, Base posts compressed transaction data to Ethereum and relies on a fraud proof system where anyone can challenge invalid state transitions.',
    points: 20
  },
  {
    id: 21,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'base',
    question: 'What is the typical withdrawal time from Base to Ethereum mainnet, and why?',
    options: [
      '10 minutes - for transaction confirmation',
      '1 hour - for security checks',
      '7 days - for the fraud proof challenge period',
      '24 hours - for liquidity settlement'
    ],
    correctAnswer: 2,
    explanation: 'Optimistic rollups have a ~7 day withdrawal period to allow time for fraud proofs. Users can use third-party bridges for faster withdrawals at a cost.',
    points: 20
  },
  {
    id: 22,
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'solana',
    question: 'Solana transactions can include multiple instructions that execute _______, meaning all succeed or all fail together.',
    correctAnswer: 'atomically',
    explanation: 'Atomic execution ensures transaction integrity - if any instruction fails, the entire transaction reverts, preventing partial state changes.',
    points: 20
  },
  {
    id: 23,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'solana',
    question: 'Why does Solana require you to pre-declare all accounts a transaction will read or write?',
    options: [
      'For billing purposes',
      'To enable parallel transaction processing',
      'To prevent spam',
      'For regulatory compliance'
    ],
    correctAnswer: 1,
    explanation: 'By knowing which accounts each transaction touches, Solana can run non-overlapping transactions in parallel, dramatically increasing throughput.',
    points: 20
  },
  {
    id: 24,
    type: 'order-ranking',
    difficulty: 'medium',
    category: 'history',
    question: 'Arrange these DeFi protocols by launch date (earliest first):',
    options: [
      'Uniswap V1',
      'Compound',
      'Aave (originally ETHLend)',
      'MakerDAO (DAI launch)'
    ],
    correctAnswer: [2, 3, 0, 1],
    explanation: 'ETHLend (2017), MakerDAO DAI (Dec 2017), Uniswap V1 (Nov 2018), Compound (Sep 2018 - mainnet 2019).',
    points: 20
  },
  {
    id: 25,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'history',
    question: 'What caused the Terra/LUNA collapse in May 2022?',
    options: [
      'A smart contract exploit',
      'The algorithmic stablecoin UST lost its peg, creating a death spiral',
      'The founder ran away with funds',
      'Government seizure of assets'
    ],
    correctAnswer: 1,
    explanation: 'UST depegged and the mint/burn mechanism with LUNA created hyperinflation as users rushed to exit, destroying ~$40B in value.',
    points: 20
  },

  // HARD QUESTIONS (26-40) - Requires deep technical knowledge
  {
    id: 26,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'defi',
    question: 'In Uniswap V2, if a pool has 100 ETH and 200,000 USDC, what price impact would buying 10 ETH have (approximately)?',
    options: [
      '~5%',
      '~10%',
      '~11%',
      '~20%'
    ],
    correctAnswer: 2,
    explanation: 'Using x*y=k: k=20M. After buying 10 ETH (90 left), USDC needed = 20M/90 = 222,222. Cost = 22,222 USDC for 10 ETH vs 20,000 at spot = ~11% price impact.',
    points: 35
  },
  {
    id: 27,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'defi',
    question: 'What is the primary risk of using flash loans for arbitrage?',
    options: [
      'The loan might not be approved',
      'You could lose the gas fee if the transaction reverts',
      'Interest rates are too high',
      'Flash loans require collateral'
    ],
    correctAnswer: 1,
    explanation: 'Flash loans are atomic - if the arbitrage fails, the entire transaction reverts. However, you still lose the gas fee for the failed transaction.',
    points: 35
  },
  {
    id: 28,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'defi',
    question: 'The attack where an attacker manipulates an oracle price within a single transaction to exploit a protocol is called a _______ attack.',
    correctAnswer: 'sandwich',
    explanation: 'While "oracle manipulation" is related, sandwich attacks specifically front-run and back-run victim transactions to extract value. Price oracle attacks are a broader category.',
    points: 35
  },
  {
    id: 29,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'trading',
    question: 'In options trading, the greek letter _______ measures how much an option\'s delta changes when the underlying price moves.',
    correctAnswer: 'gamma',
    explanation: 'Gamma measures the rate of change of delta. High gamma means delta changes rapidly with price movement, important for managing options positions.',
    points: 35
  },
  {
    id: 30,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'trading',
    question: 'A trader uses 10x leverage to long BTC at $50,000 with $1,000 collateral. At what price will they be liquidated (assuming 100% maintenance margin)?',
    options: [
      '$40,000',
      '$45,000',
      '$47,500',
      '$49,000'
    ],
    correctAnswer: 1,
    explanation: 'With 10x leverage, a 10% move wipes out the margin. Liquidation typically occurs before 100% loss, around 10% drop = $45,000.',
    points: 35
  },
  {
    id: 31,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'security',
    question: 'A vulnerability where a smart contract can be called repeatedly before the first execution completes is called a _______ attack.',
    correctAnswer: 'reentrancy',
    explanation: 'Reentrancy attacks exploit contracts that make external calls before updating state. The infamous DAO hack used this vulnerability.',
    points: 35
  },
  {
    id: 32,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'security',
    question: 'What is the danger of using tx.origin for authentication in Solidity?',
    options: [
      'It\'s slower than msg.sender',
      'It always returns the zero address',
      'A malicious contract can trick users into calling it, inheriting their tx.origin',
      'It doesn\'t work on Layer 2s'
    ],
    correctAnswer: 2,
    explanation: 'tx.origin returns the original transaction sender. If a user calls MaliciousContract which calls YourContract, tx.origin is still the user, enabling phishing attacks.',
    points: 35
  },
  {
    id: 33,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'blockchain',
    question: 'What is the purpose of EIP-1559\'s base fee mechanism?',
    options: [
      'To make transactions cheaper',
      'To make gas prices more predictable and burn ETH',
      'To speed up block times',
      'To increase validator rewards'
    ],
    correctAnswer: 1,
    explanation: 'EIP-1559 introduced a base fee that adjusts algorithmically based on demand, making fees more predictable. The base fee is burned, reducing ETH supply.',
    points: 35
  },
  {
    id: 34,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'blockchain',
    question: 'In the context of MEV, what is a "backrun"?',
    options: [
      'Canceling a pending transaction',
      'Placing a transaction immediately after a target transaction',
      'Reversing a confirmed transaction',
      'Running a node in reverse sync mode'
    ],
    correctAnswer: 1,
    explanation: 'Backrunning places your transaction right after a target (e.g., after a large swap) to capture arbitrage. Combined with frontrunning, it creates sandwich attacks.',
    points: 35
  },
  {
    id: 35,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'solana',
    question: 'What happens to rent-exempt SOL when a Solana account is closed?',
    options: [
      'It\'s burned',
      'It\'s sent to a system account',
      'It\'s refunded to a specified account',
      'It remains locked forever'
    ],
    correctAnswer: 2,
    explanation: 'When closing accounts, the rent-exempt SOL balance is refunded to a specified recipient. This is why proper account cleanup is important for cost efficiency.',
    points: 35
  },
  {
    id: 36,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'solana',
    question: 'The Solana runtime feature that allows compute units to be pre-declared to help validators schedule transactions is called _______ limits.',
    correctAnswer: 'compute',
    explanation: 'Compute limits help validators estimate resource usage for parallel processing. Exceeding declared compute units causes transaction failure.',
    points: 35
  },
  {
    id: 37,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'base',
    question: 'In optimistic rollups like Base, the period during which fraud proofs can be submitted is called the _______ period.',
    correctAnswer: 'challenge',
    explanation: 'The challenge period (typically 7 days) allows anyone to submit fraud proofs if they detect invalid state transitions.',
    points: 35
  },
  {
    id: 38,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'base',
    question: 'What role does the Sequencer play in Base?',
    options: [
      'It validates fraud proofs',
      'It orders and batches transactions before posting to L1',
      'It distributes rewards to validators',
      'It manages the bridge between L1 and L2'
    ],
    correctAnswer: 1,
    explanation: 'The Sequencer orders transactions, executes them, and periodically posts compressed batches to Ethereum L1 for data availability.',
    points: 35
  },
  {
    id: 39,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'defi',
    question: 'Why do Curve pools for like-assets (e.g., stablecoins) use a different formula than Uniswap?',
    options: [
      'To charge lower fees',
      'To minimize slippage for assets that should trade near 1:1',
      'To prevent flash loan attacks',
      'To reduce gas costs'
    ],
    correctAnswer: 1,
    explanation: 'Curve\'s StableSwap invariant creates a flatter curve near the 1:1 ratio, dramatically reducing slippage for like-asset swaps compared to constant product.',
    points: 35
  },
  {
    id: 40,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'security',
    question: 'What is "storage collision" in upgradeable smart contracts?',
    options: [
      'Running out of storage space',
      'Two contracts trying to write to the same address',
      'New contract versions overwriting storage slots used by old versions',
      'Hash collision in the storage trie'
    ],
    correctAnswer: 2,
    explanation: 'In proxy patterns, if the new implementation uses different storage layout, it can corrupt existing data. This is why upgradeable contracts must maintain storage compatibility.',
    points: 35
  },

  // EXPERT QUESTIONS (41-50)
  {
    id: 41,
    type: 'fill-blank',
    difficulty: 'expert',
    category: 'defi',
    question: 'In Compound\'s interest rate model, the _______ rate increases as pool utilization approaches 100%.',
    correctAnswer: 'borrow',
    explanation: 'Compound uses a kinked interest rate model where borrow rates spike dramatically as utilization approaches maximum to incentivize repayment.',
    points: 50
  },
  {
    id: 42,
    type: 'multiple-choice',
    difficulty: 'expert',
    category: 'defi',
    question: 'What is the purpose of a bonding curve in token economics?',
    options: [
      'To set a fixed token price',
      'To algorithmically adjust price based on supply',
      'To distribute governance rights',
      'To lock tokens for staking'
    ],
    correctAnswer: 1,
    explanation: 'Bonding curves are mathematical formulas that determine token price based on supply, enabling automated market making without liquidity providers.',
    points: 50
  },
  {
    id: 43,
    type: 'fill-blank',
    difficulty: 'expert',
    category: 'solana',
    question: 'In Anchor framework, the #[_______] macro is used to define the structure of accounts a program instruction expects.',
    correctAnswer: 'derive(accounts)',
    explanation: 'The #[derive(Accounts)] macro in Anchor defines account constraints and validation for program instructions.',
    points: 50
  },
  {
    id: 44,
    type: 'multiple-choice',
    difficulty: 'expert',
    category: 'solana',
    question: 'What mechanism does Solana use to achieve parallel transaction processing?',
    options: [
      'Sharding',
      'Sealevel runtime with declared account access',
      'Optimistic execution',
      'State channels'
    ],
    correctAnswer: 1,
    explanation: 'Sealevel is Solana\'s parallel smart contract runtime. Transactions declare which accounts they access, allowing non-conflicting ones to run in parallel.',
    points: 50
  },
  {
    id: 45,
    type: 'multiple-choice',
    difficulty: 'expert',
    category: 'security',
    question: 'What is a reentrancy attack?',
    options: [
      'Repeatedly trying different passwords',
      'Exploiting a contract that makes external calls before updating state',
      'Attacking the same address multiple times',
      'Re-entering a liquidity pool repeatedly'
    ],
    correctAnswer: 1,
    explanation: 'Reentrancy exploits contracts that call external addresses before updating their state, allowing attackers to recursively drain funds.',
    points: 50
  },
  {
    id: 46,
    type: 'fill-blank',
    difficulty: 'expert',
    category: 'security',
    question: 'The checks-effects-_______ pattern is a best practice to prevent reentrancy attacks.',
    correctAnswer: 'interactions',
    explanation: 'The checks-effects-interactions pattern requires validating conditions, updating state, then making external calls - in that order.',
    points: 50
  },
  {
    id: 47,
    type: 'multiple-choice',
    difficulty: 'expert',
    category: 'trading',
    question: 'In a liquidation cascade, what primarily causes prices to drop further?',
    options: [
      'Increased buying pressure',
      'Forced selling from margin calls triggering more liquidations',
      'Reduced trading volume',
      'Exchange maintenance'
    ],
    correctAnswer: 1,
    explanation: 'Liquidation cascades occur when forced selling triggers price drops, causing more positions to hit liquidation levels in a feedback loop.',
    points: 50
  },
  {
    id: 48,
    type: 'fill-blank',
    difficulty: 'expert',
    category: 'trading',
    question: 'A _______ attack involves buying tokens, artificially pumping the price through wash trading, then dumping on retail buyers.',
    correctAnswer: 'pump and dump',
    explanation: 'Pump and dump schemes manipulate prices through coordinated buying and fake volume before selling to unsuspecting buyers.',
    points: 50
  },
  {
    id: 49,
    type: 'multiple-choice',
    difficulty: 'expert',
    category: 'base',
    question: 'How does Base submit transaction data to Ethereum for data availability?',
    options: [
      'Storing full transaction data in smart contract storage',
      'Using calldata/blobs on Ethereum L1',
      'Through a separate data availability committee',
      'Via IPFS with on-chain hashes'
    ],
    correctAnswer: 1,
    explanation: 'Base posts compressed transaction data to Ethereum L1 using calldata (and EIP-4844 blobs when available) for data availability.',
    points: 50
  },
  {
    id: 50,
    type: 'multiple-choice',
    difficulty: 'expert',
    category: 'blockchain',
    question: 'What is the Byzantine Generals Problem that blockchain solves?',
    options: [
      'How to encrypt messages securely',
      'How to achieve consensus among untrusted parties',
      'How to increase transaction speed',
      'How to reduce energy consumption'
    ],
    correctAnswer: 1,
    explanation: 'The Byzantine Generals Problem asks how distributed parties can agree on a strategy when some may be traitors. Blockchain consensus mechanisms solve this.',
    points: 50
  }
];

export const categoryNames: Record<Category, string> = {
  blockchain: 'Blockchain Basics',
  defi: 'DeFi',
  trading: 'Trading & Markets',
  security: 'Security & Self-Custody',
  history: 'Crypto History & Culture',
  base: 'Base Ecosystem',
  solana: 'Solana Ecosystem'
};

export const difficultyPoints: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 35,
  expert: 50
};

export const iqTitles = [
  { min: 0, max: 69, title: 'Pre-Pilled', description: 'Just getting started', emoji: '🌱' },
  { min: 70, max: 89, title: 'Fresh Wallet', description: 'Learning the basics', emoji: '👛' },
  { min: 90, max: 109, title: 'Crypto Curious', description: 'Average knowledge', emoji: '🔍' },
  { min: 110, max: 129, title: 'Chain Scholar', description: 'Above average', emoji: '📚' },
  { min: 130, max: 149, title: 'DeFi Degen', description: 'Top 10%', emoji: '🦍' },
  { min: 150, max: 200, title: 'Onchain Oracle', description: 'Top 1%', emoji: '🔮' }
];

export function calculateIQ(score: number, maxScore: number): number {
  const percentage = score / maxScore;
  // Map percentage to IQ range (50-170)
  const iq = Math.round(50 + (percentage * 120));
  return Math.min(170, Math.max(50, iq));
}

export function getIQTitle(iq: number) {
  return iqTitles.find(t => iq >= t.min && iq <= t.max) || iqTitles[0];
}
