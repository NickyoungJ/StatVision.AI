import * as React from 'react';
import { useQuery } from 'react-query';
import { GameRepository } from '@/infrastructure/repositories/GameRepository';
import styled from 'styled-components';

const GameScheduleContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #111111;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 255, 0, 0.1);
  min-height: 200px;
`;

const Title = styled.h2`
  color: #00ff00;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const GameItem = styled.div`
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: #222222;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #ffffff;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 2rem;
  color: #00ff00;
  font-size: 1.2rem;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff0000;
  font-size: 1.2rem;
`;

export const GameSchedule: React.FC = () => {
  const gameRepository = new GameRepository();
  const { data: games, isLoading, isError } = useQuery('todayGames', () => 
    gameRepository.getTodayGames(),
    {
      staleTime: 30000,
      cacheTime: 60000,
    }
  );

  if (isError) return <ErrorText>데이터를 불러오는데 실패했습니다.</ErrorText>;
  
  return (
    <GameScheduleContainer>
      <Title>오늘의 경기</Title>
      {isLoading ? (
        <LoadingText>로딩 중...</LoadingText>
      ) : Array.isArray(games) && games.length > 0 ? (
        games.map(game => (
          <GameItem key={game.id}>
            {game.homeTeam} vs {game.awayTeam}
          </GameItem>
        ))
      ) : (
        <GameItem>오늘 예정된 경기가 없습니다.</GameItem>
      )}
    </GameScheduleContainer>
  );
}; 