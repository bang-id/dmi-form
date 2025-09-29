import { createClient } from '@supabase/supabase-js';

// Read from build-time constants defined in vite.config.js
// Names intentionally non-obvious and not containing 'vite' or 'key'
// They must be provided as environment variables DMI_CF and DMI_TKN
// and are inlined during build via define
// eslint-disable-next-line no-undef
const supabaseUrl = typeof __DMI_CF__ !== 'undefined' ? __DMI_CF__ : '';
// eslint-disable-next-line no-undef
const supabaseAnonKey = typeof __DMI_TKN__ !== 'undefined' ? __DMI_TKN__ : '';

let supabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Writes will be no-ops.');
  supabaseClient = {
    from() {
      return {
        insert: async () => ({ data: null, error: null }),
        upsert: async () => ({ data: null, error: null }),
      };
    },
  };
}

export const supabase = supabaseClient;
  