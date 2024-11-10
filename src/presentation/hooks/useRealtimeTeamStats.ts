import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { TeamRepository } from '@/infrastructure/repositories/TeamRepository';

export const useRealtimeTeamStats = (onUpdate?: (type: 'INSERT' | 'UPDATE' | 'DELETE') => void) => {
  const queryClient = useQueryClient();
  const teamRepository = new TeamRepository();

  useEffect(() => {
    const subscription = teamRepository.subscribeToTeamUpdates((payload) => {
      // 데이터 변경 시 캐시 업데이트
      queryClient.invalidateQueries('teams');
      queryClient.invalidateQueries(['teamComparison']);
      
      // 콜백 실행 시 이벤트 타입 전달
      onUpdate?.(payload.eventType);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient, onUpdate]);
}; 