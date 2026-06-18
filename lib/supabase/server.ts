import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const buildSafeSupabaseUrl = supabaseUrl || 'https://spendflow-build-placeholder.supabase.co';
const buildSafeSupabaseAnonKey = supabaseAnonKey || 'build-placeholder-anon-key';

export const createSupabaseServerClient = () => {
  return createClient(buildSafeSupabaseUrl, buildSafeSupabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
};
