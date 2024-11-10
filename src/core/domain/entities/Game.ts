export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  predictedScore?: {
    home: number;
    away: number;
  };
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
} 