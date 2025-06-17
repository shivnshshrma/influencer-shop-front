import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRequest, schemas } from '../middleware/validation.js';

const router = express.Router();

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data: wishlistItems, error } = await supabase
      .from('wishlist_items')
      .select(`
        id, created_at,
        posts (
          id, name, price, media_urls, type,
          users!posts_author_id_fkey (
            id, name, avatar_url, category
          )
        )
      `)
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get wishlist error:', error);
      return res.status(500).json({
        error: 'Failed to get wishlist',
        code: 'GET_WISHLIST_ERROR'
      });
    }

    res.json({ wishlistItems });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      error: 'Failed to get wishlist',
      code: 'GET_WISHLIST_ERROR'
    });
  }
});

// Add item to wishlist
router.post('/', authenticateToken, validateRequest(schemas.addToWishlist), async (req, res) => {
  try {
    const { post_id } = req.body;

    // Check if post exists
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', post_id)
      .single();

    if (postError || !post) {
      return res.status(404).json({
        error: 'Post not found',
        code: 'POST_NOT_FOUND'
      });
    }

    // Check if already in wishlist
    const { data: existingItem } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('post_id', post_id)
      .single();

    if (existingItem) {
      return res.status(409).json({
        error: 'Item already in wishlist',
        code: 'ITEM_EXISTS'
      });
    }

    // Add to wishlist
    const { data: wishlistItem, error } = await supabase
      .from('wishlist_items')
      .insert([{
        user_id: req.user.id,
        post_id,
        created_at: new Date().toISOString()
      }])
      .select(`
        id, created_at,
        posts (
          id, name, price, media_urls, type,
          users!posts_author_id_fkey (
            id, name, avatar_url, category
          )
        )
      `)
      .single();

    if (error) {
      console.error('Add to wishlist error:', error);
      return res.status(500).json({
        error: 'Failed to add to wishlist',
        code: 'ADD_WISHLIST_ERROR'
      });
    }

    res.status(201).json({
      message: 'Item added to wishlist',
      wishlistItem
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      error: 'Failed to add to wishlist',
      code: 'ADD_WISHLIST_ERROR'
    });
  }
});

// Remove item from wishlist
router.delete('/:postId', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;

    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', req.user.id)
      .eq('post_id', postId);

    if (error) {
      console.error('Remove from wishlist error:', error);
      return res.status(500).json({
        error: 'Failed to remove from wishlist',
        code: 'REMOVE_WISHLIST_ERROR'
      });
    }

    res.json({
      message: 'Item removed from wishlist'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      error: 'Failed to remove from wishlist',
      code: 'REMOVE_WISHLIST_ERROR'
    });
  }
});

// Check if item is in wishlist
router.get('/check/:postId', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;

    const { data: wishlistItem, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', req.user.id)
      .eq('post_id', postId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Check wishlist error:', error);
      return res.status(500).json({
        error: 'Failed to check wishlist',
        code: 'CHECK_WISHLIST_ERROR'
      });
    }

    res.json({
      isInWishlist: !!wishlistItem
    });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({
      error: 'Failed to check wishlist',
      code: 'CHECK_WISHLIST_ERROR'
    });
  }
});

export default router;