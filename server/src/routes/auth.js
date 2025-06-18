import express from 'express';
import { supabase, supabaseAdmin } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

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

    // 1. Create auth user with Supabase Auth
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

    // 2. Create user profile using admin client to bypass RLS
    const { data: user, error: profileError } = await supabaseAdmin
      .from('users')
      .insert([{
        id: authData.user.id,
        name,
        email,
        phone,
        gender,
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

    // 1. Authenticate with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error('Auth login error:', authError);
      return res.status(401).json({
        error: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      });
    }

    if (!authData.user || !authData.session) {
      return res.status(401).json({
        error: 'Authentication failed',
        code: 'AUTH_FAILED'
      });
    }

    // 2. Get user profile
    const { data: user, error: profileError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, phone, gender, is_influencer, avatar_url, body_type, style_preference, color_season, notes, bio, category, created_at, updated_at')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !user) {
      console.error('Profile fetch error:', profileError);
      return res.status(500).json({
        error: 'Failed to fetch user profile',
        code: 'PROFILE_FETCH_FAILED'
      });
    }

    res.json({
      message: 'Login successful',
      user,
      session: authData.session
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