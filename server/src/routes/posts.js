import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireInfluencer, optionalAuth } from '../middleware/auth.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();

// Get all posts (public, with optional auth for personalization)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, category, influencer_id } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('posts')
      .select(`
        id, name, description, price, media_urls, type, product_link,
        created_at, updated_at,
        users!posts_author_id_fkey (
          id, name, avatar_url, category, is_influencer
        )
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq('users.category', category);
    }

    if (influencer_id) {
      query = query.eq('author_id', influencer_id);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Get posts error:', error);
      return res.status(500).json({
        error: 'Failed to get posts',
        code: 'GET_POSTS_ERROR'
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
    console.error('Get posts error:', error);
    res.status(500).json({
      error: 'Failed to get posts',
      code: 'GET_POSTS_ERROR'
    });
  }
});

// Get single post
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        id, name, description, price, media_urls, type, product_link,
        created_at, updated_at,
        users!posts_author_id_fkey (
          id, name, avatar_url, category, is_influencer, bio
        )
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error || !post) {
      return res.status(404).json({
        error: 'Post not found',
        code: 'POST_NOT_FOUND'
      });
    }

    res.json({ post });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      error: 'Failed to get post',
      code: 'GET_POST_ERROR'
    });
  }
});

// Create post (influencers only)
router.post('/', authenticateToken, requireInfluencer, validateRequest(schemas.createPost), async (req, res) => {
  try {
    const { name, description, price, product_link, media_urls, type } = req.body;

    const { data: post, error } = await supabase
      .from('posts')
      .insert([{
        author_id: req.user.id,
        name,
        description,
        price,
        product_link,
        media_urls,
        type,
        is_published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select(`
        id, name, description, price, media_urls, type, product_link,
        created_at, updated_at,
        users!posts_author_id_fkey (
          id, name, avatar_url, category
        )
      `)
      .single();

    if (error) {
      console.error('Create post error:', error);
      return res.status(500).json({
        error: 'Failed to create post',
        code: 'CREATE_POST_ERROR'
      });
    }

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      error: 'Failed to create post',
      code: 'CREATE_POST_ERROR'
    });
  }
});

// Get user's own posts
router.get('/my/posts', authenticateToken, requireInfluencer, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id, name, description, price, media_urls, type, product_link,
        is_published, created_at, updated_at
      `)
      .eq('author_id', req.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Get my posts error:', error);
      return res.status(500).json({
        error: 'Failed to get posts',
        code: 'GET_MY_POSTS_ERROR'
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
    console.error('Get my posts error:', error);
    res.status(500).json({
      error: 'Failed to get posts',
      code: 'GET_MY_POSTS_ERROR'
    });
  }
});

// Update post
router.put('/:id', authenticateToken, requireInfluencer, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updated_at: new Date().toISOString()
    };

    // Verify ownership
    const { data: existingPost } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', id)
      .single();

    if (!existingPost || existingPost.author_id !== req.user.id) {
      return res.status(404).json({
        error: 'Post not found or access denied',
        code: 'POST_NOT_FOUND'
      });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update post error:', error);
      return res.status(500).json({
        error: 'Failed to update post',
        code: 'UPDATE_POST_ERROR'
      });
    }

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      error: 'Failed to update post',
      code: 'UPDATE_POST_ERROR'
    });
  }
});

// Delete post
router.delete('/:id', authenticateToken, requireInfluencer, async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const { data: existingPost } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', id)
      .single();

    if (!existingPost || existingPost.author_id !== req.user.id) {
      return res.status(404).json({
        error: 'Post not found or access denied',
        code: 'POST_NOT_FOUND'
      });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete post error:', error);
      return res.status(500).json({
        error: 'Failed to delete post',
        code: 'DELETE_POST_ERROR'
      });
    }

    res.json({
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      error: 'Failed to delete post',
      code: 'DELETE_POST_ERROR'
    });
  }
});

export default router;