import express from 'express';
import { supabase, supabaseAdmin } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, gender } = req.body;

    // Validate required fields
    if (!name || !email || !password || !gender) {
      return res.status(400).json({
        error: 'Name, email, password, and gender are required',
        code: 'MISSING_FIELDS'
      });
    }

    // Validate gender
    if (!['male', 'female'].includes(gender)) {
      return res.status(400).json({
        error: 'Gender must be either "male" or "female"',
        code: 'INVALID_GENDER'
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email already exists',
        code: 'USER_EXISTS'
      });
    }

    // 1. Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 2. Create auth user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error('Auth signup error:', authError);
      return res.status(400).json({
        error: authError.message,
        code: 'AUTH_SIGNUP_FAILED'
      });
    }

    if (!authData.user) {
      return res.status(400).json({
        error: 'Failed to create user account',
        code: 'USER_CREATION_FAILED'
      });
    }

    // 3. Create user profile using admin client to bypass RLS
    const { data: user, error: profileError } = await supabaseAdmin
      .from('users')
      .insert([{
        id: authData.user.id,
        name,
        email,
        phone,
        gender,
        password_hash, // Add the hashed password
        is_influencer: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select('id, name, email, phone, gender, is_influencer, avatar_url, body_type, style_preference, color_season, notes, bio, category, created_at, updated_at')
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Clean up auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({
        error: 'Failed to create user profile',
        code: 'PROFILE_CREATION_FAILED'
      });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user,
      session: authData.session
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        code: 'MISSING_FIELDS'
      });
    }

    // 1. Get user from database with password hash
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, phone, gender, is_influencer, avatar_url, body_type, style_preference, color_season, notes, bio, category, created_at, updated_at, password_hash')
      .eq('email', email)
      .single();

    if (userError || !user) {
      console.error('User fetch error:', userError);
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // 3. Try to authenticate with Supabase Auth first
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Remove password_hash from user object before sending
    const { password_hash, ...userWithoutPassword } = user;

    // If Supabase auth works, use that session
    if (!authError && authData.session) {
      return res.json({
        message: 'Login successful',
        user: userWithoutPassword,
        session: authData.session
      });
    }

    // If Supabase auth fails, create a custom session token
    console.log('Supabase auth failed, creating custom session');
    
    // Create a simple JWT-like token for the session
    const sessionToken = Buffer.from(JSON.stringify({
      user_id: user.id,
      email: user.email,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    })).toString('base64');

    // Create a custom session object
    const customSession = {
      access_token: sessionToken,
      token_type: 'bearer',
      expires_in: 86400, // 24 hours in seconds
      expires_at: Math.floor(Date.now() / 1000) + 86400,
      refresh_token: sessionToken,
      user: {
        id: user.id,
        email: user.email,
        email_confirmed_at: new Date().toISOString(),
        created_at: user.created_at,
        updated_at: user.updated_at
      }
    };

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      session: customSession
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    res.json({
      user: req.user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to get user data',
      code: 'GET_USER_ERROR'
    });
  }
});

export default router;