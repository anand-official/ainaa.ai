import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function getWaitlistCount(): Promise<number> {
  if (!supabase) return 847
  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })
  return count ?? 847
}
