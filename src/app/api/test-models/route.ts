import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function GET() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!
    });
    
    // Try the new model name from documentation
    const modelsToTest = [
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro', 
      'gemini-pro'
    ];

    const results = [];

    for (const modelName of modelsToTest) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: 'Hello, this is a test.'
        });
        
        results.push({
          model: modelName,
          status: 'success',
          response: (response.text || '').substring(0, 100) + '...'
        });
      } catch (error) {
        results.push({
          model: modelName,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({ 
      apiKey: process.env.GEMINI_API_KEY ? 'Present' : 'Missing',
      results 
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to test models', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}