/*
  # Initial Schema for InfluStyle Platform

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `password_hash` (text)
      - `phone` (text, optional)
      - `gender` (text)
      - `is_influencer` (boolean)
      - `avatar_url` (text, optional)
      - `body_type` (text, optional)
      - `style_preference` (text, optional)
      - `color_season` (text, optional)
      - `notes` (text, optional)
      - `bio` (text, optional, for influencers)
      - `category` (text, optional, for influencers)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_measurements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `height` (numeric, optional)
      - `chest` (numeric, optional)
      - `waist` (numeric, optional)
      - `hips` (numeric, optional)
      - `shoe_size` (text, optional)
      - `skin_tone` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `posts`
      - `id` (uuid, primary key)
      - `author_id` (uuid, foreign key)
      - `name` (text)
      - `description` (text)
      - `price` (text)
      - `product_link` (text)
      - `media_urls` (jsonb)
      - `type` (text) - 'image' or 'video'
      - `is_published` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `wishlist_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `post_id` (uuid, foreign key)
      - `created_at` (timestamptz)

    - `follows`
      - `id` (uuid, primary key)
      - `follower_id` (uuid, foreign key)
      - `following_id` (uuid, foreign key)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  phone text,
  gender text CHECK (gender IN ('male', 'female')),
  is_influencer boolean DEFAULT false,
  avatar_url text,
  body_type text,
  style_preference text,
  color_season text,
  notes text,
  bio text,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_measurements table
CREATE TABLE IF NOT EXISTS user_measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  height numeric,
  chest numeric,
  waist numeric,
  hips numeric,
  shoe_size text,
  skin_tone text CHECK (skin_tone IN ('fair', 'light', 'medium', 'olive', 'tan', 'deep', 'dark')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL,
  price text NOT NULL,
  product_link text NOT NULL,
  media_urls jsonb NOT NULL DEFAULT '[]',
  type text CHECK (type IN ('image', 'video')) DEFAULT 'image',
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create follows table
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES users(id) ON DELETE CASCADE,
  following_id uuid REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can read public user data"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- User measurements policies
CREATE POLICY "Users can manage own measurements"
  ON user_measurements
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Posts policies
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authors can manage own posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = author_id::text);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist"
  ON wishlist_items
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = user_id::text);

-- Follows policies
CREATE POLICY "Users can manage own follows"
  ON follows
  FOR ALL
  TO authenticated
  USING (auth.uid()::text = follower_id::text);

CREATE POLICY "Anyone can read follows"
  ON follows
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_influencer ON users(is_influencer);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_is_published ON posts(is_published);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_post_id ON wishlist_items(post_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_measurements_updated_at BEFORE UPDATE ON user_measurements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();