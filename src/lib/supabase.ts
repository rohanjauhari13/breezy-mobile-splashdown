
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables set by the Lovable Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anonymous key. Make sure your Supabase integration is properly configured.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
