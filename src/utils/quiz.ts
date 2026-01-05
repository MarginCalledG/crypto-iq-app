// Utility functions for quiz mechanics

/**
 * Shuffle an array and return the new array with a mapping of old to new indices
 */
export function shuffleOptions(options: string[], correctIndex: number): {
  shuffledOptions: string[];
  newCorrectIndex: number;
} {
  // Create array of indices
  const indices = options.map((_, i) => i);
  
  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  
  // Create shuffled options and find new correct index
  const shuffledOptions = indices.map(i => options[i]);
  const newCorrectIndex = indices.indexOf(correctIndex);
  
  return { shuffledOptions, newCorrectIndex };
}

/**
 * Shuffle options with a seed (for consistent shuffling per question per session)
 */
export function shuffleOptionsSeeded(
  options: string[], 
  correctIndex: number, 
  seed: number
): {
  shuffledOptions: string[];
  newCorrectIndex: number;
} {
  // Seeded random number generator
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  // Create array of indices with random values for sorting
  const indices = options.map((_, i) => ({
    index: i,
    sort: seededRandom(seed + i * 1000)
  }));
  
  // Sort by random values
  indices.sort((a, b) => a.sort - b.sort);
  
  // Create shuffled options and find new correct index
  const shuffledOptions = indices.map(item => options[item.index]);
  const newCorrectIndex = indices.findIndex(item => item.index === correctIndex);
  
  return { shuffledOptions, newCorrectIndex };
}

/**
 * Calculate Levenshtein distance between two strings
 * This measures the minimum number of single-character edits needed to change one string into another
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  const m = s1.length;
  const n = s2.length;
  
  // Create a matrix
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  // Fill in the rest of the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1,     // insertion
          dp[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }
  
  return dp[m][n];
}

/**
 * Check if an answer is correct with typo tolerance
 * @param userAnswer - The user's input
 * @param correctAnswer - The correct answer
 * @param maxTypos - Maximum allowed typos (default 3)
 * @returns true if the answer is close enough
 */
export function checkAnswerWithTypoTolerance(
  userAnswer: string,
  correctAnswer: string,
  maxTypos: number = 3
): boolean {
  const user = userAnswer.toLowerCase().trim();
  const correct = correctAnswer.toLowerCase().trim();
  
  // Exact match
  if (user === correct) return true;
  
  // Check Levenshtein distance
  const distance = levenshteinDistance(user, correct);
  
  // Allow typos based on word length
  // For short words (< 5 chars), allow fewer typos
  // For longer words, allow up to maxTypos
  const wordLength = correct.length;
  let allowedTypos = maxTypos;
  
  if (wordLength <= 3) {
    allowedTypos = 1;
  } else if (wordLength <= 5) {
    allowedTypos = 2;
  }
  
  return distance <= allowedTypos;
}

/**
 * Normalize string for comparison (remove extra spaces, lowercase)
 */
export function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().trim().replace(/\s+/g, ' ');
}
