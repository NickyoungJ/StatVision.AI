import { Game } from '../entities/Game';

export interface IGameRepository {
  getTodayGames(): Promise<Game[]>;
  getGamePrediction(gameId: string): Promise<Game>;
} 