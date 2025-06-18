/*
  # Fix user registration RLS policy

  1. Security Policy Updates
    - Drop the existing INSERT policy that uses incorrect `uid()` function
    - Create a new INSERT policy using the correct `auth.uid()` function
    - This allows authenticated users to create their own profile during registration

  2. Changes Made
    - Replace `uid()` with `auth.uid()` in the INSERT policy
    - Ensure the policy allows users to insert their own profile data
*/

-- Drop the existing INSERT policy with incorrect function
DROP POLICY IF EXISTS "Allow authenticated users to insert own profile" ON public.users;

-- Create the correct INSERT policy using auth.uid()
CREATE POLICY "Allow authenticated users to insert own profile"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);