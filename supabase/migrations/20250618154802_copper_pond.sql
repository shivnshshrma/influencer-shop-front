/*
  # Fix User Registration RLS Policy

  1. Security Changes
    - Drop existing problematic INSERT policy for users table
    - Create new INSERT policy that allows authenticated users to insert their own profile
    - Ensure the policy works correctly during the registration flow
  
  2. Policy Updates
    - Remove the restrictive INSERT policy that was blocking registration
    - Add a proper INSERT policy that allows users to create their profile during signup
    - Keep existing SELECT and UPDATE policies intact
*/

-- Drop the existing problematic INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile during registration" ON users;

-- Create a new INSERT policy that allows authenticated users to insert their own profile
-- This policy checks that the user ID matches the authenticated user's ID
CREATE POLICY "Allow authenticated users to insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure the policy for reading own data is correct
DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Ensure the policy for updating own data is correct  
DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Keep the policy for anonymous users to read public data
-- This should already exist but let's ensure it's correct
DROP POLICY IF EXISTS "Anyone can read public user data" ON users;
CREATE POLICY "Anyone can read public user data"
  ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);