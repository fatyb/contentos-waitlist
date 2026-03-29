-- Run this in Supabase → SQL Editor → New query

-- 1. Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text        UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous inserts (so the form can write without auth)
CREATE POLICY "Allow anonymous insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);
