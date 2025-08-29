import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { hashPassword, generateToken, setAuthCookie } from '@/lib/auth';
import { signUpSchema } from '@/lib/validations';
import { createGHLContact } from '@/lib/ghl';

const sql = neon(process.env.DATABASE_URL);

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = signUpSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${validatedData.email}
    `;
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Create user in database
    const [newUser] = await sql`
      INSERT INTO users (email, password, first_name, last_name, created_at, updated_at)
      VALUES (
        ${validatedData.email},
        ${hashedPassword},
        ${validatedData.firstName},
        ${validatedData.lastName},
        NOW(),
        NOW()
      )
      RETURNING id, email, first_name, last_name
    `;
    
    // Debug environment variables
    console.log('🔍 GHL Debug Info:', {
      hasApiKey: !!process.env.GHL_API_KEY,
      hasLocationId: !!process.env.GHL_LOCATION_ID,
      apiKeyPreview: process.env.GHL_API_KEY ? `${process.env.GHL_API_KEY.substring(0, 10)}...` : 'NOT SET',
      locationId: process.env.GHL_LOCATION_ID || 'NOT SET'
    });
    
    // Create contact in GHL
    const ghlLocationId = process.env.GHL_LOCATION_ID;
    let ghlContactCreated = false;
    let ghlError = null;
    
    if (ghlLocationId && process.env.GHL_API_KEY) {
      try {
        console.log(`🚀 Attempting to create GHL contact for user: ${newUser.email}`);
        
        const contactData = {
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          // Remove phone since it's not in validation schema
          locationId: ghlLocationId,
        };
        
        console.log('📝 GHL Contact Data:', contactData);
        
        const ghlResult = await createGHLContact(contactData);
        
        console.log('📊 GHL Result:', ghlResult);
        
        if (ghlResult) {
          ghlContactCreated = true;
          console.log(`✅ GHL contact created successfully for user ${newUser.id}`);
        } else {
          console.warn(`⚠️ GHL contact creation returned null for user ${newUser.id}`);
          ghlError = 'GHL API returned null result';
        }
        
      } catch (error) {
        console.error(`❌ GHL contact creation failed for user ${newUser.id}:`, {
          message: error.message,
          stack: error.stack,
          response: error.response?.data
        });
        ghlError = error.message;
      }
    } else {
      const missingVars = [];
      if (!process.env.GHL_API_KEY) missingVars.push('GHL_API_KEY');
      if (!process.env.GHL_LOCATION_ID) missingVars.push('GHL_LOCATION_ID');
      
      console.warn(`⚠️ GHL integration disabled - missing: ${missingVars.join(', ')}`);
      ghlError = `Missing environment variables: ${missingVars.join(', ')}`;
    }
    
    // Generate token and set cookie
    const token = generateToken(newUser.id);
    await setAuthCookie(token);
    
    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
      },
      // Include detailed GHL status for debugging
      ghlIntegration: {
        enabled: !!(ghlLocationId && process.env.GHL_API_KEY),
        contactCreated: ghlContactCreated,
        error: ghlError
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    // Check for duplicate email error
    if (error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}