import { useCallback } from 'react';
import { PostgrestError } from '@supabase/supabase-js';

interface ErrorResponse {
  message: string;
  code?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown): ErrorResponse => {
    if (error instanceof Error) {
      // Supabase 에러 처리
      if ((error as PostgrestError).code) {
        const pgError = error as PostgrestError;
        switch (pgError.code) {
          case '42P01':
            return { message: '데이터베이스 테이블을 찾을 수 없습니다.', code: pgError.code };
          case '23505':
            return { message: '중복된 데이터가 존재합니다.', code: pgError.code };
          default:
            return { message: '데이터베이스 오류가 발생했습니다.', code: pgError.code };
        }
      }
      
      // 일반 에러 처리
      return { message: error.message };
    }
    
    // 알 수 없는 에러 처리
    return { message: '알 수 없는 오류가 발생했습니다.' };
  }, []);

  return { handleError };
}; 