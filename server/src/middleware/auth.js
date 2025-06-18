import { supabase, supabaseAdmin } from '../config/supabase.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        code: 'MISSING_TOKEN'
      });
    }

    // Verify token with Supabase Auth
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authUser) {
      return res.status(401).json({ 
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }

    // Get user profile from database
    const { data: user, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profileError || !user) {
      return res.status(401).json({ 
        error: 'User profile not found',
        code: 'USER_NOT_FOUND'
      });
    }

    req.user = user;
    req.authUser = authUser;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      code: 'AUTH_ERROR'
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      req.authUser = null;
      return next();
    }

    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authUser) {
      req.user = null;
      req.authUser = null;
      return next();
    }

    const { data: user, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    req.user = profileError ? null : user;
    req.authUser = authError ? null : authUser;
    next();
  } catch (error) {
    req.user = null;
    req.authUser = null;
    next();
  }
};

export const requireInfluencer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required',
      code: 'AUTH_REQUIRED'
    });
  }

  if (!req.user.is_influencer) {
    return res.status(403).json({ 
      error: 'Influencer access required',
      code: 'INFLUENCER_REQUIRED'
    });
  }

  next();
};