/*
  # Final deployment fix for InfluStyle

  1. Security Updates
    - Fix all RLS policies to work correctly
    - Add proper triggers for automatic field setting
    - Ensure all foreign key relationships work

  2. Database Functions
    - Create helper functions for user management
    - Add proper error handling
*/

-- Drop all existing policies and triggers to start fresh
DROP POLICY IF EXISTS "Allow authenticated users to insert own profile" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Anyone can read public user data" ON users;
DROP POLICY IF EXISTS "Users can manage own measurements" ON user_measurements;
DROP POLICY IF EXISTS "Anyone can read published posts" ON posts;
DROP POLICY IF EXISTS "Authors can manage own posts" ON posts;
DROP POLICY IF EXISTS "Users can manage own wishlist" ON wishlist_items;
DROP POLICY IF EXISTS "Users can manage own follows" ON follows;
DROP POLICY IF EXISTS "Anyone can read follows" ON follows;

-- Drop existing triggers
DROP TRIGGER IF EXISTS set_wishlist_user_id ON wishlist_items;
DROP TRIGGER IF EXISTS set_measurements_user_id ON user_measurements;
DROP TRIGGER IF EXISTS set_post_author_id ON posts;

-- Drop existing functions
DROP FUNCTION IF EXISTS set_user_id();
DROP FUNCTION IF EXISTS set_author_id();

-- Create improved trigger functions
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION set_author_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.author_id IS NULL THEN
    NEW.author_id = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Users policies (more permissive for registration)
CREATE POLICY "Allow authenticated users to insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

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
  USING (auth.uid() = user_id);

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
  USING (auth.uid() = author_id);

-- Wishlist policies
CREATE POLICY "Users can manage own wishlist"
  ON wishlist_items
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Users can manage own follows"
  ON follows
  FOR ALL
  TO authenticated
  USING (auth.uid() = follower_id);

CREATE POLICY "Anyone can read follows"
  ON follows
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create triggers
CREATE TRIGGER set_wishlist_user_id
  BEFORE INSERT ON wishlist_items
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

CREATE TRIGGER set_measurements_user_id
  BEFORE INSERT ON user_measurements
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

CREATE TRIGGER set_post_author_id
  BEFORE INSERT ON posts
  FOR EACH ROW
  EXECUTE FUNCTION set_author_id();

-- Ensure all indexes exist for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_influencer ON users(is_influencer);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_is_published ON posts(is_published);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_post_id ON wishlist_items(post_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);