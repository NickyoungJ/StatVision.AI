export interface Team {
  id: string;
  name: string;
  stats: {
    wins: number;
    losses: number;
    winPercentage: number;
    pointsPerGame: number;
    pointsAgainstPerGame: number;
  };
} 