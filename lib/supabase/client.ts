import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client that throws helpful errors
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: new Error('Supabase not configured') }),
        signInWithPassword: async () => ({ error: new Error('Configure Supabase first') }),
        signUp: async () => ({ error: new Error('Configure Supabase first') }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        upsert: () => ({ error: null }),
        eq: () => ({ data: [], error: null }),
      }),
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
