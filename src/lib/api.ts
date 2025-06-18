import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    gender: 'male' | 'female';
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getCurrentUser(token: string) {
    return this.request('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Posts endpoints
  async getPosts(token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request('/posts', { headers });
  }

  async getPost(id: string, token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request(`/posts/${id}`, { headers });
  }

  async createPost(postData: any, token: string) {
    return this.request('/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
  }

  async updatePost(id: string, postData: any, token: string) {
    return this.request(`/posts/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
  }

  async deletePost(id: string, token: string) {
    return this.request(`/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Wishlist endpoints
  async getWishlist(token: string) {
    return this.request('/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addToWishlist(postId: string, token: string) {
    return this.request('/wishlist', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId }),
    });
  }

  async removeFromWishlist(postId: string, token: string) {
    return this.request(`/wishlist/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Users endpoints
  async getUsers(token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request('/users', { headers });
  }

  async getUser(id: string, token?: string) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    return this.request(`/users/${id}`, { headers });
  }

  async updateUser(id: string, userData: any, token: string) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);