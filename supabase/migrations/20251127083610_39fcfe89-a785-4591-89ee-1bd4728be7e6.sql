-- Add tier column to profiles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'tier'
  ) THEN
    ALTER TABLE profiles ADD COLUMN tier subscription_tier DEFAULT 'free';
  END IF;
END $$;

-- Create usage tracking table
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_usage INTEGER DEFAULT 0 NOT NULL,
  max_usage INTEGER DEFAULT 2 NOT NULL,
  reset_date TIMESTAMP WITH TIME ZONE DEFAULT date_trunc('month', NOW()) + INTERVAL '1 month' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id)
);

-- Enable RLS on usage_tracking
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own usage" ON usage_tracking;
DROP POLICY IF EXISTS "Users can update own usage" ON usage_tracking;
DROP POLICY IF EXISTS "Users can insert own usage" ON usage_tracking;

-- RLS policies for usage_tracking
CREATE POLICY "Users can view own usage"
  ON usage_tracking FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own usage"
  ON usage_tracking FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own usage"
  ON usage_tracking FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Function to reset monthly usage
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE usage_tracking 
  SET current_usage = 0,
      reset_date = date_trunc('month', NOW()) + INTERVAL '1 month',
      updated_at = NOW()
  WHERE reset_date <= NOW();
END;
$$;