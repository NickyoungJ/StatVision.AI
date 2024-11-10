export interface Database {
  public: {
    Tables: {
      nba_team_stats: {
        Row: {
          id: number;
          team_name: string;
          average_points: number | null;
          three_point_attempts: number | null;
          three_point_makes: number | null;
          three_point_percentage: number | null;
          free_throw_attempts: number | null;
          free_throw_makes: number | null;
          free_throw_percentage: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database['public']['Tables']['nba_team_stats']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['nba_team_stats']['Insert']>;
      };
    };
  };
} 