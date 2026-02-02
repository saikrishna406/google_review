-- Run this in your Supabase SQL Editor to verify/create tables

-- 1. PROFILES (Extends Auth Users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. BUSINESSES
create table if not exists public.businesses (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  google_review_url text,
  industry text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CUSTOMERS
create table if not exists public.customers (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  name text not null,
  phone text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. REVIEW REQUESTS
create table if not exists public.review_requests (
  id uuid default uuid_generate_v4() primary key,
  business_id uuid references public.businesses(id) on delete cascade not null,
  customer_id uuid references public.customers(id) on delete cascade not null,
  status text default 'sent', -- sent, click, rated
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. RATING EVENTS
create table if not exists public.rating_events (
  id uuid default uuid_generate_v4() primary key,
  review_request_id uuid references public.review_requests(id) on delete set null,
  stars integer not null,
  redirected_to_google boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. FEEDBACK (Private)
create table if not exists public.feedback (
  id uuid default uuid_generate_v4() primary key,
  rating_event_id uuid references public.rating_events(id) on delete cascade not null,
  message text,
  contact_info text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) - Basic Policy for MVP
-- Enable RLS logic later if using Supabase client on frontend.
-- Since we use backend service key, we bypass RLS for now.
