import { supabase } from '@/integrations/supabase/client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  gender: 'male' | 'female';
  is_influencer: boolean;
  avatar_url?: string;
  body_type?: string;
  style_preference?: string;
  color_season?: string;
  notes?: string;
  bio?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface UserMeasurements {
  height?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  shoe_size?: string;
  skin_tone?: string;
}

export interface Post {
  id: string;
  name: string;
  description: string;
  price: string;
  product_link: string;
  media_urls: string[];
  type: 'image' | 'video';
  is_published: boolean;
  created_at: string;
  updated_at: string;
  users?: {
    id: string;
    name: string;
    avatar_url?: string;
    category?: string;
  };
}

export interface WishlistItem {
  id: string;
  created_at: string;
  posts: {
    id: string;
    name: string;
    price: string;
    media_urls: string[];
    type: string;
    users: {
      id: string;
      name: string;
      avatar_url?: string;
      category?: string;
    };
  };
}

// API Client class
class ApiClient {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    gender: 'male' | 'female';
  }) {
    return this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  async refreshToken() {
    return this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
    });
  }

  async logout() {
    return this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async getUserProfile() {
    return this.request<{ user: User & { user_measurements?: UserMeasurements } }>('/users/profile');
  }

  async updateProfile(data: Partial<User>) {
    return this.request<{ user: User }>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateMeasurements(data: UserMeasurements) {
    return this.request<{ measurements: UserMeasurements }>('/users/measurements', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async upgradeToInfluencer(data: { bio?: string; category?: string }) {
    return this.request<{ user: User }>('/users/upgrade-to-influencer', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAvatar(avatar_url: string) {
    return this.request<{ user: User }>('/users/avatar', {
      method: 'POST',
      body: JSON.stringify({ avatar_url }),
    });
  }

  // Posts endpoints
  async getPosts(params?: { page?: number; limit?: number; category?: string; influencer_id?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.influencer_id) searchParams.append('influencer_id', params.influencer_id);
    
    const query = searchParams.toString();
    return this.request<{ posts: Post[]; pagination: any }>(`/posts${query ? `?${query}` : ''}`);
  }

  async getPost(id: string) {
    return this.request<{ post: Post }>(`/posts/${id}`);
  }

  async createPost(data: {
    name: string;
    description: string;
    price: string;
    product_link: string;
    media_urls: string[];
    type: 'image' | 'video';
  }) {
    return this.request<{ post: Post }>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyPosts(params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request<{ posts: Post[]; pagination: any }>(`/posts/my/posts${query ? `?${query}` : ''}`);
  }

  async updatePost(id: string, data: Partial<Post>) {
    return this.request<{ post: Post }>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: string) {
    return this.request<{ message: string }>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Wishlist endpoints
  async getWishlist() {
    return this.request<{ wishlistItems: WishlistItem[] }>('/wishlist');
  }

  async addToWishlist(post_id: string) {
    return this.request<{ wishlistItem: WishlistItem }>('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ post_id }),
    });
  }

  async removeFromWishlist(postId: string) {
    return this.request<{ message: string }>(`/wishlist/${postId}`, {
      method: 'DELETE',
    });
  }

  async checkWishlist(postId: string) {
    return this.request<{ isInWishlist: boolean }>(`/wishlist/check/${postId}`);
  }

  // Influencers endpoints
  async getInfluencers(params?: { page?: number; limit?: number; category?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    
    const query = searchParams.toString();
    return this.request<{ influencers: User[]; pagination: any }>(`/influencers${query ? `?${query}` : ''}`);
  }

  async getInfluencer(id: string) {
    return this.request<{ influencer: User }>(`/influencers/${id}`);
  }

  async getInfluencerPosts(id: string, params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request<{ posts: Post[]; pagination: any }>(`/influencers/${id}/posts${query ? `?${query}` : ''}`);
  }

  // Recommendations endpoints
  async getPersonalizedRecommendations(params?: { limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request<{ recommendations: Post[]; userProfile: any }>(`/recommendations/personalized${query ? `?${query}` : ''}`);
  }

  async getTrendingPosts(params?: { limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request<{ trendingPosts: Post[] }>(`/recommendations/trending${query ? `?${query}` : ''}`);
  }

  async getRecommendedInfluencers(params?: { limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request<{ recommendedInfluencers: User[] }>(`/recommendations/influencers${query ? `?${query}` : ''}`);
  }
}

export const apiClient = new ApiClient();