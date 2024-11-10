export const environment = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  api: {
    url: import.meta.env.VITE_API_URL,
  },
} as const;

// 환경 변수 유효성 검사
Object.entries(environment.supabase).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: VITE_SUPABASE_${key.toUpperCase()}`);
  }
}); 