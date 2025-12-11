# 🧠 Crypto IQ

Test your blockchain knowledge with 50 questions across 7 categories. Get your Crypto IQ score, earn points, and compete with friends!

## Features

- **Crypto IQ Test**: 50 questions from easy to expert level
- **Daily Challenge**: New questions every day with streak tracking
- **Airdrop Points System**: Earn points for future possible token airdrop
- **Leaderboard**: Compete with friends and climb the rankings
- **Share Results**: Share your IQ score on social media

## 🪂 Points System (For Future possible Airdrop)

Users earn points by:

| Action | Points |
|--------|--------|
| Complete Daily Challenge | 10 |
| Per Correct Answer (Daily) | 5 |
| Perfect Daily Score | +25 bonus |
| Complete IQ Test | 50 |
| High IQ Score (130+) | +100 bonus |
| 7-Day Streak | +50 bonus |
| 30-Day Streak | +250 bonus |
| 100-Day Streak | +1000 bonus |

**Streak Multipliers:**
- 7+ days: 1.1x all points
- 30+ days: 1.25x all points
- 100+ days: 1.5x all points

Points are tied to wallet addresses for the future airdrop!

## Categories

- Blockchain Basics
- DeFi
- Trading & Markets
- Security & Self-Custody
- Crypto History & Culture
- Base Ecosystem
- Solana Ecosystem

## Adding More Questions

Edit `src/data/questions.ts` to add new questions. Follow the format:

```typescript
{
  id: 51, // Increment ID
  type: 'multiple-choice', // or 'true-false', 'fill-blank', 'spot-scam', 'order-ranking'
  difficulty: 'medium', // 'easy', 'medium', 'hard', 'expert'
  category: 'defi', // 'blockchain', 'defi', 'trading', 'security', 'history', 'base', 'solana'
  question: 'Your question here?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 1, // Index of correct option (0-based)
  explanation: 'Explanation shown after answering.',
  points: 20 // Based on difficulty: easy=10, medium=20, hard=35, expert=50
}
```

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Lucide Icons

## Deployment to Base (Vercel)

### Step 1: Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Click "Deploy"

### Step 2: Configure for Base Mini App

1. After deployment, note your Vercel URL (e.g., `your-app.vercel.app`)
2. Update `minikit.config.ts`:
   - Replace all `https://your-domain.vercel.app` with your actual URL
   - Add your icon and splash images to the `/public` folder

### Step 3: Set Up Account Association

1. Go to [base.dev](https://base.dev)
2. Connect your wallet
3. Register your app
4. Copy the account association values
5. Update `minikit.config.ts` with:
   - `header`
   - `payload`
   - `signature`

### Step 4: Validate Your App

1. Go to [base.dev/preview](https://base.dev/preview)
2. Enter your app URL
3. Test your mini app in the preview
4. Fix any issues shown in the validator

### Step 5: Go Live

1. In `minikit.config.ts`, set `noindex: false`
2. Redeploy to Vercel
3. Share your app in a Farcaster cast to trigger indexing

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Required Assets

Before deploying, add these to your `/public` folder:

- `icon.png` - 200x200px app icon
- `splash.png` - 1200x630px splash screen
- `og-image.png` - 1200x630px Open Graph image

## Database (For Production Leaderboards)

The app currently uses localStorage for points. For production with real leaderboards, you'll need a database. The schema is in `src/types/points.ts`.

Recommended options:
- Vercel Postgres
- Supabase
- PlanetScale

## Future: Creating Your Token

When ready to create your token for the airdrop:
1. Export user points data from the database
2. Create snapshot of wallet addresses and points
3. Deploy token contract on Base
4. Distribute based on points allocation

## License

MIT
