import { IGameRepository } from '@/core/domain/repositories/IGameRepository';
import { Game } from '@/core/domain/entities/Game';
import { api } from '../api/axios';

export class GameRepository implements IGameRepository {
  async getTodayGames(): Promise<Game[]> {
    const { data } = await api.get('/games/today');
    return data;
  }

  async getGamePrediction(gameId: string): Promise<Game> {
    const { data } = await api.get(`/games/${gameId}/prediction`);
    return data;
  }
} 