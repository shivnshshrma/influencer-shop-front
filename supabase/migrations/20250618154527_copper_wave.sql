/*
  # Add INSERT policy for user registration

  1. Security Changes
    - Add policy to allow authenticated users to insert their own user profile
    - This enables the registration flow to work properly by allowing users to create their profile after Supabase Auth creates their account

  The policy ensures users can only insert a row where the id matches their authenticated user ID (auth.uid()).
*/

-- Add INSERT policy for user registration
CREATE POLICY "Users can insert own profile during registration"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);