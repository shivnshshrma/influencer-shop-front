/*
  # Fix authentication and RLS policies

  1. Security Policy Updates
    - Fix RLS policies to work with Supabase Auth
    - Ensure proper authentication flow
    - Add missing policies for user operations

  2. Changes Made
    - Update all policies to use auth.uid() correctly
    - Add proper INSERT policies for user registration
    - Fix wishlist and posts policies
    - Ensure proper foreign key relationships
*/

-- Drop all existing policies to start fresh
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

-- Users policies
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

-- Add missing trigger for wishlist_items if needed
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set user_id on wishlist inserts
DROP TRIGGER IF EXISTS set_wishlist_user_id ON wishlist_items;
CREATE TRIGGER set_wishlist_user_id
  BEFORE INSERT ON wishlist_items
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

-- Create trigger to automatically set user_id on user_measurements inserts
DROP TRIGGER IF EXISTS set_measurements_user_id ON user_measurements;
CREATE TRIGGER set_measurements_user_id
  BEFORE INSERT ON user_measurements
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

-- Create trigger to automatically set author_id on posts inserts
CREATE OR REPLACE FUNCTION set_author_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.author_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_post_author_id ON posts;
CREATE TRIGGER set_post_author_id
  BEFORE INSERT ON posts
  FOR EACH ROW
  EXECUTE FUNCTION set_author_id();