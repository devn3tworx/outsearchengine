import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    environment_variables: {
      DATABASE_URL: process.env.DATABASE_URL ? 'Set ✓' : 'Missing ✗',
      DATABASE_URL_preview: process.env.DATABASE_URL?.substring(0, 30) + '...',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set ✓' : 'Missing ✗',
      GHL_API_KEY: process.env.GHL_API_KEY ? 'Set ✓' : 'Missing ✗',
      GHL_API_BASE_URL: process.env.GHL_API_BASE_URL ? 'Set ✓' : 'Missing ✗',
      GHL_LOCATION_ID: process.env.GHL_LOCATION_ID ? 'Set ✓' : 'Missing ✗',
      NODE_ENV: process.env.NODE_ENV || 'Not set'
    }
  });
}
