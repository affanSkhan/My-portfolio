import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    apiKey: process.env.GEMINI_API_KEY ? 'configured' : 'missing',
    environment: process.env.NODE_ENV || 'development'
  });
}