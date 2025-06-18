/*
  # Fix User Registration RLS Policy

  1. Security Policy Updates
    - Update INSERT policy to use correct auth.uid() function
    - Ensure proper RLS policies for user registration
    - Fix policy conditions to allow authenticated users to create their own profiles

  2. Changes Made
    - Drop existing INSERT policy with incorrect uid() function
    - Create new INSERT policy with correct auth.uid() function
    - Ensure policy allows users to insert their own profile during registration
*/

-- Drop the existing INSERT policy that uses incorrect uid() function
DROP POLICY IF EXISTS "Allow authenticated users to insert own profile" ON users;

-- Create new INSERT policy with correct auth.uid() function
CREATE POLICY "Allow authenticated users to insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the SELECT policy also uses correct auth.uid() function
DROP POLICY IF EXISTS "Users can read own data" ON users;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Ensure the UPDATE policy also uses correct auth.uid() function  
DROP POLICY IF EXISTS "Users can update own data" ON users;

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Keep the existing policy for public read access to published user data
-- This allows anyone to read basic user information (like for influencer profiles)
-- The "Anyone can read public user data" policy should remain as is