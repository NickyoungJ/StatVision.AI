import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { environment } from '@/config/environment';

export const supabase = createClient<Database>(
  environment.supabase.url,
  environment.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    global: {
      headers: {
        'x-application-name': 'nba-prediction',
      },
    },
  }
);

// 연결 상태 확인
supabase.auth.onAuthStateChange((event, session) => {
  console.log(`Supabase auth event: ${event}`, session);
});