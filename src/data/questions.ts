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

  // MEDIUM QUESTIONS (11-25)
  {
    id: 11,
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'blockchain',
    question: 'The process by which new Bitcoin blocks are created and transactions are verified is called _______.',
    correctAnswer: 'mining',
    explanation: 'Mining is the process of using computational power to solve complex puzzles, validate transactions, and add new blocks to the blockchain.',
    points: 20
  },
  {
    id: 12,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'blockchain',
    question: 'What is the main difference between Proof of Work and Proof of Stake?',
    options: [
      'PoW is faster than PoS',
      'PoW uses computational power, PoS uses staked tokens',
      'PoS is more decentralized than PoW',
      'PoW doesn\'t require electricity'
    ],
    correctAnswer: 1,
    explanation: 'Proof of Work requires miners to solve computational puzzles, while Proof of Stake selects validators based on the amount of tokens they\'ve staked.',
    points: 20
  },
  {
    id: 13,
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'defi',
    question: 'When you provide liquidity to an AMM and the price ratio changes, you may experience _______ loss.',
    correctAnswer: 'impermanent',
    explanation: 'Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes compared to when you deposited.',
    points: 20
  },
  {
    id: 14,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'defi',
    question: 'What is TVL in DeFi?',
    options: [
      'Total Volume Locked',
      'Total Value Locked',
      'Token Value Limit',
      'Trading Volume Level'
    ],
    correctAnswer: 1,
    explanation: 'TVL (Total Value Locked) measures the total value of crypto assets deposited in a DeFi protocol.',
    points: 20
  },
  {
    id: 15,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'defi',
    question: 'What is yield farming?',
    options: [
      'Mining cryptocurrency',
      'Earning rewards by providing liquidity or staking',
      'Day trading tokens',
      'Creating new tokens'
    ],
    correctAnswer: 1,
    explanation: 'Yield farming involves depositing crypto into DeFi protocols to earn rewards, often through providing liquidity or staking.',
    points: 20
  },
  {
    id: 16,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'trading',
    question: 'What is "slippage"?',
    options: [
      'Losing your private key',
      'The difference between expected and executed price',
      'A type of trading fee',
      'Price manipulation by whales'
    ],
    correctAnswer: 1,
    explanation: 'Slippage is the difference between the price you expect and the price at which your trade actually executes.',
    points: 20
  },
  {
    id: 17,
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'trading',
    question: 'A _______ order automatically sells your position when the price drops to a specified level.',
    correctAnswer: 'stop-loss',
    explanation: 'A stop-loss order helps limit potential losses by automatically selling when the price falls to your set level.',
    points: 20
  },
  {
    id: 18,
    type: 'spot-scam',
    difficulty: 'medium',
    category: 'security',
    question: 'Which of these is a RED FLAG for a scam?',
    options: [
      'A DEX asking you to approve token spending',
      'A DM offering to "validate your wallet"',
      'A protocol requiring you to connect your wallet',
      'A dApp showing your token balances'
    ],
    correctAnswer: 1,
    explanation: 'Legitimate services never ask to "validate" or "sync" your wallet via DM. This is always a scam attempt.',
    points: 20
  },
  {
    id: 19,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'security',
    question: 'What is a hardware wallet?',
    options: [
      'A wallet app on your computer',
      'A physical device that stores private keys offline',
      'A wallet provided by exchanges',
      'A browser extension wallet'
    ],
    correctAnswer: 1,
    explanation: 'Hardware wallets are physical devices that keep your private keys offline, providing maximum security against online threats.',
    points: 20
  },
  {
    id: 20,
    type: 'true-false',
    difficulty: 'medium',
    category: 'base',
    question: 'Base uses optimistic rollups for transaction validation.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'Base is an optimistic rollup Layer 2, meaning it assumes transactions are valid and only checks them if challenged.',
    points: 20
  },
  {
    id: 21,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'base',
    question: 'Base is a Layer 2 built on top of which blockchain?',
    options: [
      'Solana',
      'Ethereum',
      'Bitcoin',
      'Polygon'
    ],
    correctAnswer: 1,
    explanation: 'Base is an Ethereum Layer 2 that inherits Ethereum\'s security while offering lower fees and faster transactions.',
    points: 20
  },
  {
    id: 22,
    type: 'fill-blank',
    difficulty: 'medium',
    category: 'solana',
    question: 'On Solana, smart contracts are called _______.',
    correctAnswer: 'programs',
    explanation: 'Solana refers to smart contracts as "programs" - they are stateless and store data in separate accounts.',
    points: 20
  },
  {
    id: 23,
    type: 'true-false',
    difficulty: 'medium',
    category: 'solana',
    question: 'Solana uses an account model where programs are stateless and data is stored in separate accounts.',
    options: ['True', 'False'],
    correctAnswer: 0,
    explanation: 'Unlike Ethereum, Solana separates program logic from data storage, making programs reusable and efficient.',
    points: 20
  },
  {
    id: 24,
    type: 'order-ranking',
    difficulty: 'medium',
    category: 'history',
    question: 'Arrange these events chronologically (earliest first):',
    options: [
      'Bitcoin whitepaper',
      'Ethereum launch',
      'The DAO hack',
      'DeFi Summer'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Bitcoin whitepaper (2008), Ethereum launch (2015), The DAO hack (2016), DeFi Summer (2020).',
    points: 20
  },
  {
    id: 25,
    type: 'multiple-choice',
    difficulty: 'medium',
    category: 'history',
    question: 'What was "The DAO"?',
    options: [
      'A centralized exchange',
      'An early decentralized investment fund on Ethereum',
      'A Bitcoin mining pool',
      'A stablecoin protocol'
    ],
    correctAnswer: 1,
    explanation: 'The DAO was one of the first DAOs on Ethereum, which was hacked in 2016, leading to the Ethereum/Ethereum Classic split.',
    points: 20
  },

  // HARD QUESTIONS (26-40)
  {
    id: 26,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'defi',
    question: 'What determines the price of assets in a constant product AMM?',
    options: [
      'Order book depth',
      'The ratio of tokens in the pool (x * y = k)',
      'Oracle price feeds',
      'Governance voting'
    ],
    correctAnswer: 1,
    explanation: 'Constant product AMMs like Uniswap use the formula x * y = k, where prices are determined by the ratio of tokens in the pool.',
    points: 35
  },
  {
    id: 27,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'defi',
    question: 'What is a flash loan?',
    options: [
      'A loan with very high interest rates',
      'An uncollateralized loan that must be repaid in the same transaction',
      'A loan from a centralized exchange',
      'A loan backed by NFTs'
    ],
    correctAnswer: 1,
    explanation: 'Flash loans allow borrowing without collateral, but the entire loan must be repaid within the same transaction block.',
    points: 35
  },
  {
    id: 28,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'defi',
    question: 'A protocol that allows users to borrow against their crypto without selling it is called a _______ protocol.',
    correctAnswer: 'lending',
    explanation: 'Lending protocols like Aave and Compound allow users to deposit crypto as collateral and borrow against it.',
    points: 35
  },
  {
    id: 29,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'trading',
    question: 'A funding rate in perpetual futures is positive when longs pay _______.',
    correctAnswer: 'shorts',
    explanation: 'Positive funding means long positions pay short positions, typically occurring when the perp price is above spot.',
    points: 35
  },
  {
    id: 30,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'trading',
    question: 'What is MEV (Maximal Extractable Value)?',
    options: [
      'The maximum profit from holding tokens',
      'Value extracted by reordering, inserting, or censoring transactions',
      'The maximum supply of a token',
      'A type of staking reward'
    ],
    correctAnswer: 1,
    explanation: 'MEV refers to profits that miners/validators can extract by manipulating the order of transactions in a block.',
    points: 35
  },
  {
    id: 31,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'security',
    question: 'A _______ signature allows someone to list your NFTs or drain tokens without a transaction appearing in your wallet history.',
    correctAnswer: 'off-chain',
    explanation: 'Off-chain signatures (like those used by OpenSea) can be exploited by scammers to steal assets without obvious on-chain activity.',
    points: 35
  },
  {
    id: 32,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'security',
    question: 'What is address poisoning?',
    options: [
      'Sending malware through transactions',
      'Creating lookalike addresses in your transaction history',
      'Corrupting smart contract storage',
      'DNS hijacking of dApp frontends'
    ],
    correctAnswer: 1,
    explanation: 'Address poisoning involves sending small transactions from addresses that look similar to ones you\'ve used, hoping you\'ll copy the wrong one.',
    points: 35
  },
  {
    id: 33,
    type: 'true-false',
    difficulty: 'hard',
    category: 'blockchain',
    question: 'In a proof-of-stake system, validators are selected purely based on the amount staked, with no randomness involved.',
    options: ['True', 'False'],
    correctAnswer: 1,
    explanation: 'Most PoS systems include randomness in validator selection to prevent the richest validators from always being chosen.',
    points: 35
  },
  {
    id: 34,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'blockchain',
    question: 'What is a Merkle tree used for in blockchain?',
    options: [
      'Encrypting private keys',
      'Efficiently verifying data integrity',
      'Generating wallet addresses',
      'Calculating gas fees'
    ],
    correctAnswer: 1,
    explanation: 'Merkle trees allow efficient verification that a transaction is included in a block without downloading the entire blockchain.',
    points: 35
  },
  {
    id: 35,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'solana',
    question: 'What is the purpose of the Solana Program Library (SPL)?',
    options: [
      'A collection of frontend components',
      'Standard on-chain programs for common functionality (tokens, etc.)',
      'A testing framework',
      'A block explorer API'
    ],
    correctAnswer: 1,
    explanation: 'SPL provides standard programs for common needs like token creation, token swaps, and lending.',
    points: 35
  },
  {
    id: 36,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'solana',
    question: 'Solana achieves high throughput partly through its unique _______ consensus mechanism that timestamps transactions.',
    correctAnswer: 'proof of history',
    explanation: 'Proof of History creates a historical record that proves events occurred at specific moments, reducing validator communication overhead.',
    points: 35
  },
  {
    id: 37,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'base',
    question: 'Base was developed by _______, making it the first L2 launched by a publicly traded company.',
    correctAnswer: 'coinbase',
    explanation: 'Coinbase developed Base, making it unique as the first Layer 2 from a public company (NASDAQ: COIN).',
    points: 35
  },
  {
    id: 38,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'base',
    question: 'What technology stack is Base built on?',
    options: [
      'Arbitrum Nitro',
      'OP Stack',
      'zkSync Era',
      'Polygon zkEVM'
    ],
    correctAnswer: 1,
    explanation: 'Base is built on the OP Stack (Optimism\'s open-source framework) and is part of the Optimism Superchain.',
    points: 35
  },
  {
    id: 39,
    type: 'fill-blank',
    difficulty: 'hard',
    category: 'history',
    question: 'The 2022 collapse of _______ triggered a contagion that brought down Celsius, BlockFi, and eventually FTX.',
    correctAnswer: 'terra',
    explanation: 'The Terra/Luna collapse in May 2022 triggered a chain reaction that exposed overleveraged crypto companies.',
    points: 35
  },
  {
    id: 40,
    type: 'multiple-choice',
    difficulty: 'hard',
    category: 'history',
    question: 'What was the main innovation of EIP-1559?',
    options: [
      'Proof of Stake transition',
      'Base fee burning mechanism',
      'Layer 2 scaling',
      'Smart contract upgrades'
    ],
    correctAnswer: 1,
    explanation: 'EIP-1559 introduced a base fee that gets burned, making ETH potentially deflationary and improving fee predictability.',
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
