import express from 'express';
import { supabase } from '../config/supabase.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all influencers
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, category } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('users')
      .select(`
        id, name, avatar_url, category, bio,
        created_at,
        posts!posts_author_id_fkey (count)
      `)
      .eq('is_influencer', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data: influencers, error } = await query;

    if (error) {
      console.error('Get influencers error:', error);
      return res.status(500).json({
        error: 'Failed to get influencers',
        code: 'GET_INFLUENCERS_ERROR'
      });
    }

    res.json({
      influencers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: influencers.length === parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get influencers error:', error);
    res.status(500).json({
      error: 'Failed to get influencers',
      code: 'GET_INFLUENCERS_ERROR'
    });
  }
});

// Get single influencer
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: influencer, error } = await supabase
      .from('users')
      .select(`
        id, name, avatar_url, category, bio, created_at,
        posts!posts_author_id_fkey (
          id, name, price, media_urls, type, created_at
        )
      `)
      .eq('id', id)
      .eq('is_influencer', true)
      .single();

    if (error || !influencer) {
      return res.status(404).json({
        error: 'Influencer not found',
        code: 'INFLUENCER_NOT_FOUND'
      });
    }

    res.json({ influencer });
  } catch (error) {
    console.error('Get influencer error:', error);
    res.status(500).json({
      error: 'Failed to get influencer',
      code: 'GET_INFLUENCER_ERROR'
    });
  }
});

// Get influencer's posts
router.get('/:id/posts', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    // Verify influencer exists
    const { data: influencer } = await supabase
      .from('users')
      .select('id')
      .eq('id', id)
      .eq('is_influencer', true)
      .single();

    if (!influencer) {
      return res.status(404).json({
        error: 'Influencer not found',
        code: 'INFLUENCER_NOT_FOUND'
      });
    }

    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id, name, description, price, media_urls, type, product_link,
        created_at, updated_at
      `)
      .eq('author_id', id)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Get influencer posts error:', error);
      return res.status(500).json({
        error: 'Failed to get influencer posts',
        code: 'GET_INFLUENCER_POSTS_ERROR'
      });
    }

    res.json({
      posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: posts.length === parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get influencer posts error:', error);
    res.status(500).json({
      error: 'Failed to get influencer posts',
      code: 'GET_INFLUENCER_POSTS_ERROR'
    });
  }
});

// Get influencer categories
router.get('/categories/list', async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from('users')
      .select('category')
      .eq('is_influencer', true)
      .not('category', 'is', null);

    if (error) {
      console.error('Get categories error:', error);
      return res.status(500).json({
        error: 'Failed to get categories',
        code: 'GET_CATEGORIES_ERROR'
      });
    }

    // Get unique categories
    const uniqueCategories = [...new Set(categories.map(item => item.category))];

    res.json({ categories: uniqueCategories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      error: 'Failed to get categories',
      code: 'GET_CATEGORIES_ERROR'
    });
  }
});

export default router;