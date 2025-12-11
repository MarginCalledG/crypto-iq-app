import { NextRequest, NextResponse } from 'next/server';
import { questions as defaultQuestions } from '@/data/questions';

// In production, replace this with database calls (Supabase, Vercel Postgres, etc.)
// For now, we serve the default questions from the data file
// Custom questions can be added via the admin panel and stored in a database

export async function GET() {
  // TODO: In production, fetch from database and merge with default questions
  // const customQuestions = await db.query('SELECT * FROM questions');
  // const allQuestions = [...defaultQuestions, ...customQuestions];
  
  return NextResponse.json({
    questions: defaultQuestions,
    total: defaultQuestions.length,
    lastUpdated: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate question structure
    const requiredFields = ['type', 'difficulty', 'category', 'question', 'correctAnswer', 'explanation', 'points'];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // TODO: In production, save to database
    // const newQuestion = await db.insert('questions', body);
    
    // For now, return success (questions would be saved to DB in production)
    return NextResponse.json({
      success: true,
      message: 'Question saved. Note: In production, this would persist to database.',
      question: {
        id: Date.now(),
        ...body
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
