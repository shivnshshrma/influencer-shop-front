import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select(`
        id, name, email, phone, gender, is_influencer, avatar_url, 
        body_type, style_preference, color_season, notes, bio, category,
        created_at, updated_at,
        user_measurements (
          height, chest, waist, hips, shoe_size, skin_tone
        )
      `)
      .eq('id', req.user.id)
      .single();

    if (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({
        error: 'Failed to get profile',
        code: 'GET_PROFILE_ERROR'
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to get profile',
      code: 'GET_PROFILE_ERROR'
    });
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateRequest(schemas.updateProfile), async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    const { data: user, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select('id, name, email, phone, gender, is_influencer, avatar_url, body_type, style_preference, color_season, notes, bio, category, updated_at')
      .single();

    if (error) {
      console.error('Update profile error:', error);
      return res.status(500).json({
        error: 'Failed to update profile',
        code: 'UPDATE_PROFILE_ERROR'
      });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      code: 'UPDATE_PROFILE_ERROR'
    });
  }
});

// Update user measurements
router.put('/measurements', authenticateToken, validateRequest(schemas.updateMeasurements), async (req, res) => {
  try {
    // Check if measurements exist
    const { data: existingMeasurements } = await supabase
      .from('user_measurements')
      .select('id')
      .eq('user_id', req.user.id)
      .single();

    let result;
    
    if (existingMeasurements) {
      // Update existing measurements
      const { data, error } = await supabase
        .from('user_measurements')
        .update({
          ...req.body,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', req.user.id)
        .select()
        .single();
      
      result = { data, error };
    } else {
      // Create new measurements
      const { data, error } = await supabase
        .from('user_measurements')
        .insert([{
          user_id: req.user.id,
          ...req.body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();
      
      result = { data, error };
    }

    if (result.error) {
      console.error('Update measurements error:', result.error);
      return res.status(500).json({
        error: 'Failed to update measurements',
        code: 'UPDATE_MEASUREMENTS_ERROR'
      });
    }

    res.json({
      message: 'Measurements updated successfully',
      measurements: result.data
    });
  } catch (error) {
    console.error('Update measurements error:', error);
    res.status(500).json({
      error: 'Failed to update measurements',
      code: 'UPDATE_MEASUREMENTS_ERROR'
    });
  }
});

// Upgrade to influencer
router.post('/upgrade-to-influencer', authenticateToken, async (req, res) => {
  try {
    const { bio, category } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({
        is_influencer: true,
        bio: bio || '',
        category: category || 'Fashion & Style',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.user.id)
      .select('id, name, email, is_influencer, bio, category')
      .single();

    if (error) {
      console.error('Upgrade to influencer error:', error);
      return res.status(500).json({
        error: 'Failed to upgrade to influencer',
        code: 'UPGRADE_INFLUENCER_ERROR'
      });
    }

    res.json({
      message: 'Successfully upgraded to influencer',
      user
    });
  } catch (error) {
    console.error('Upgrade to influencer error:', error);
    res.status(500).json({
      error: 'Failed to upgrade to influencer',
      code: 'UPGRADE_INFLUENCER_ERROR'
    });
  }
});

// Upload avatar
router.post('/avatar', authenticateToken, async (req, res) => {
  try {
    const { avatar_url } = req.body;

    if (!avatar_url) {
      return res.status(400).json({
        error: 'Avatar URL is required',
        code: 'MISSING_AVATAR_URL'
      });
    }

    const { data: user, error } = await supabase
      .from('users')
      .update({
        avatar_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', req.user.id)
      .select('id, name, avatar_url')
      .single();

    if (error) {
      console.error('Update avatar error:', error);
      return res.status(500).json({
        error: 'Failed to update avatar',
        code: 'UPDATE_AVATAR_ERROR'
      });
    }

    res.json({
      message: 'Avatar updated successfully',
      user
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      error: 'Failed to update avatar',
      code: 'UPDATE_AVATAR_ERROR'
    });
  }
});

export default router;