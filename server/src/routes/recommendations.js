import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get personalized recommendations
router.get('/personalized', authenticateToken, async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Get user's measurements and preferences
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select(`
        gender, body_type, style_preference, color_season,
        user_measurements (
          height, skin_tone
        )
      `)
      .eq('id', req.user.id)
      .single();

    if (profileError) {
      console.error('Get user profile error:', profileError);
      return res.status(500).json({
        error: 'Failed to get user profile',
        code: 'GET_PROFILE_ERROR'
      });
    }

    // Build recommendation query based on user preferences
    let query = supabase
      .from('posts')
      .select(`
        id, name, description, price, media_urls, type, product_link,
        created_at,
        users!posts_author_id_fkey (
          id, name, avatar_url, category, is_influencer
        )
      `)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filter by user preferences if available
    if (userProfile.style_preference) {
      // This would need a more sophisticated matching algorithm
      // For now, we'll just get recent posts
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Get recommendations error:', error);
      return res.status(500).json({
        error: 'Failed to get recommendations',
        code: 'GET_RECOMMENDATIONS_ERROR'
      });
    }

    // Simple scoring algorithm (in a real app, this would be more sophisticated)
    const scoredPosts = posts.map(post => ({
      ...post,
      score: calculateRecommendationScore(post, userProfile)
    }));

    // Sort by score
    scoredPosts.sort((a, b) => b.score - a.score);

    res.json({
      recommendations: scoredPosts,
      userProfile: {
        hasCompleteProfile: !!(userProfile.gender && userProfile.user_measurements?.height)
      }
    });
  } catch (error) {
    console.error('Get personalized recommendations error:', error);
    res.status(500).json({
      error: 'Failed to get recommendations',
      code: 'GET_RECOMMENDATIONS_ERROR'
    });
  }
});

// Get trending posts
router.get('/trending', optionalAuth, async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Get posts with engagement metrics (simplified)
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id, name, description, price, media_urls, type, product_link,
        created_at,
        users!posts_author_id_fkey (
          id, name, avatar_url, category, is_influencer
        ),
        wishlist_items (count)
      `)
      .eq('is_published', true)
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()) // Last 7 days
      .order('created_at', { ascending: false })
      .limit(limit * 2); // Get more to sort by engagement

    if (error) {
      console.error('Get trending posts error:', error);
      return res.status(500).json({
        error: 'Failed to get trending posts',
        code: 'GET_TRENDING_ERROR'
      });
    }

    // Sort by engagement (wishlist count + recency)
    const trendingPosts = posts
      .map(post => ({
        ...post,
        engagementScore: (post.wishlist_items?.[0]?.count || 0) + 
                        (7 - Math.floor((Date.now() - new Date(post.created_at).getTime()) / (24 * 60 * 60 * 1000)))
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, limit);

    res.json({ trendingPosts });
  } catch (error) {
    console.error('Get trending posts error:', error);
    res.status(500).json({
      error: 'Failed to get trending posts',
      code: 'GET_TRENDING_ERROR'
    });
  }
});

// Get recommended influencers
router.get('/influencers', authenticateToken, async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get user's preferences
    const { data: userProfile } = await supabase
      .from('users')
      .select('style_preference, color_season')
      .eq('id', req.user.id)
      .single();

    // Get influencers with recent activity
    const { data: influencers, error } = await supabase
      .from('users')
      .select(`
        id, name, avatar_url, category, bio,
        posts!posts_author_id_fkey (count)
      `)
      .eq('is_influencer', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Get recommended influencers error:', error);
      return res.status(500).json({
        error: 'Failed to get recommended influencers',
        code: 'GET_RECOMMENDED_INFLUENCERS_ERROR'
      });
    }

    // Score influencers based on user preferences
    const scoredInfluencers = influencers.map(influencer => ({
      ...influencer,
      score: calculateInfluencerScore(influencer, userProfile),
      reason: getRecommendationReason(influencer, userProfile)
    }));

    scoredInfluencers.sort((a, b) => b.score - a.score);

    res.json({ recommendedInfluencers: scoredInfluencers });
  } catch (error) {
    console.error('Get recommended influencers error:', error);
    res.status(500).json({
      error: 'Failed to get recommended influencers',
      code: 'GET_RECOMMENDED_INFLUENCERS_ERROR'
    });
  }
});

// Helper functions for recommendation algorithms
function calculateRecommendationScore(post, userProfile) {
  let score = 1;

  // Recency bonus
  const daysSincePost = (Date.now() - new Date(post.created_at).getTime()) / (24 * 60 * 60 * 1000);
  score += Math.max(0, 7 - daysSincePost) * 0.1;

  // Category matching
  if (userProfile.style_preference) {
    const categoryMap = {
      'casual': ['Fashion & Style', 'Lifestyle'],
      'formal': ['Fashion & Style'],
      'athletic': ['Fitness & Wellness'],
      'streetwear': ['Fashion & Style']
    };

    if (categoryMap[userProfile.style_preference]?.includes(post.users.category)) {
      score += 0.5;
    }
  }

  // Skin tone matching for beauty products
  if (post.users.category === 'Beauty & Skincare' && userProfile.user_measurements?.skin_tone) {
    score += 0.3;
  }

  return score;
}

function calculateInfluencerScore(influencer, userProfile) {
  let score = 1;

  // Post count bonus
  const postCount = influencer.posts?.[0]?.count || 0;
  score += Math.min(postCount * 0.1, 2);

  // Category matching
  if (userProfile.style_preference) {
    const categoryMap = {
      'casual': ['Fashion & Style', 'Home & Lifestyle'],
      'formal': ['Fashion & Style'],
      'athletic': ['Fitness & Wellness'],
      'streetwear': ['Fashion & Style']
    };

    if (categoryMap[userProfile.style_preference]?.includes(influencer.category)) {
      score += 1;
    }
  }

  return score;
}

function getRecommendationReason(influencer, userProfile) {
  if (userProfile.style_preference) {
    const categoryMap = {
      'casual': 'Great for casual style',
      'formal': 'Perfect for formal looks',
      'athletic': 'Fitness and wellness expert',
      'streetwear': 'Trendy streetwear inspiration'
    };

    if (categoryMap[userProfile.style_preference]) {
      return categoryMap[userProfile.style_preference];
    }
  }

  return 'Popular in your area';
}

export default router;