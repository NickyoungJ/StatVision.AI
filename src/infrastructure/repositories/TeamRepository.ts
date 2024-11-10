import { supabase } from '../api/supabase';
import { Database } from '@/types/supabase';
import { PostgrestError, RealtimeChannel } from '@supabase/supabase-js';

type TeamStats = Database['public']['Tables']['nba_team_stats']['Row'];
type RealtimePayload = {
  new: TeamStats;
  old: TeamStats;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
};

export class TeamRepository {
  private handleError(error: unknown): never {
    if (error instanceof Error) {
      if ((error as PostgrestError).code) {
        const pgError = error as PostgrestError;
        throw new Error(`Database error: ${pgError.message} (Code: ${pgError.code})`);
      }
      throw error;
    }
    throw new Error('Unknown error occurred');
  }

  async getTeamStats(): Promise<TeamStats[]> {
    const { data, error } = await supabase
      .from('nba_team_stats')
      .select('*')
      .order('average_points', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getTeamComparison(team1Name: string, team2Name: string): Promise<TeamStats[]> {
    const { data, error } = await supabase
      .from('nba_team_stats')
      .select('*')
      .in('team_name', [team1Name, team2Name]);

    if (error) throw error;
    return data;
  }

  // 실시간 구독 설정
  subscribeToTeamUpdates(callback: (payload: RealtimePayload) => void): RealtimeChannel {
    return supabase
      .channel('team_stats_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'nba_team_stats'
        },
        (payload) => {
          // payload 타입 단언
          const typedPayload = payload as unknown as RealtimePayload;
          callback(typedPayload);
        }
      )
      .subscribe();
  }

  async getAllTeams(): Promise<TeamStats[]> {
    try {
      const { data, error } = await supabase
        .from('nba_team_stats')
        .select('*')
        .order('team_name', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }
} 