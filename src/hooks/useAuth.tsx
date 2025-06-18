import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

interface AuthUser {
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

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<AuthUser>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender: 'male' | 'female';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          await fetchUserProfile(session.access_token);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.access_token) {
        await fetchUserProfile(session.access_token);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await apiClient.getCurrentUser(token);
      setUser(response.user);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUser(null);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);

      // Call backend API to register user
      const response = await apiClient.register(data);

      if (response.session) {
        // Set the session in Supabase client
        await supabase.auth.setSession(response.session);
        setUser(response.user);
        toast.success('Account created successfully!');
      } else {
        throw new Error('Registration successful but no session returned');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      // Call backend API to login user
      const response = await apiClient.login({ email, password });

      if (response.session) {
        // Set the session in Supabase client
        await supabase.auth.setSession(response.session);
        setUser(response.user);
        toast.success('Logged in successfully!');
      } else {
        throw new Error('Login successful but no session returned');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const updateUser = async (data: Partial<AuthUser>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error('No valid session');

      await apiClient.updateUser(user.id, data, session.access_token);

      setUser(prev => prev ? { ...prev, ...data } : null);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error(error.message || 'Update failed');
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        await fetchUserProfile(session.access_token);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};