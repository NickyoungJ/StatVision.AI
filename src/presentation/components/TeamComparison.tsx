import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { TeamRepository } from '@/infrastructure/repositories/TeamRepository';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { LoadingSkeleton } from './common/LoadingSkeleton';
import { useRealtimeTeamStats } from '../hooks/useRealtimeTeamStats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ComparisonContainer = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  background-color: #111111;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 255, 0, 0.1);

  @media (max-width: 768px) {
    margin: 0.5rem;
    padding: 1rem;
  }
`;

const SectionTitle = styled.h2`
  color: #00ff00;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const TeamSelectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const TeamSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  background-color: #222222;
  color: #ffffff;
  border: 1px solid #333333;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #00ff00;
  }

  option {
    background-color: #222222;
  }
`;

const ChartContainer = styled.div`
  height: 400px;
  margin: 2rem 0;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: rgba(0, 255, 0, 0.1);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 0, 0.2);
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 576px) {
    padding: 0.8rem;
  }
`;

const StatLabel = styled.div`
  color: #00ff00;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;

  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  background-color: rgba(255, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #111111;
  border-top: 3px solid #00ff00;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: #00ff00;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
`;

const UpdateNotification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid #00ff00;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: #00ff00;
  font-size: 0.9rem;
  animation: slideIn 0.3s ease-out forwards;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 255, 0, 0.1);

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 576px) {
    bottom: 10px;
    right: 10px;
    left: 10px;
    text-align: center;
  }
`;

export const TeamComparison: React.FC = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const teamRepository = new TeamRepository();
  const { handleError } = useErrorHandler();

  // 실시간 업데이트 훅 사용
  useRealtimeTeamStats((eventType) => {
    setShowUpdate(true);
    // 이벤트 타입에 따라 다른 메시지 설정 가능
    switch (eventType) {
      case 'INSERT':
        console.log('새로운 팀 데이터가 추가되었습니다.');
        break;
      case 'UPDATE':
        console.log('팀 데이터가 업데이트되었습니다.');
        break;
      case 'DELETE':
        console.log('팀 데이터가 삭제되었습니다.');
        break;
    }
  });

  // 팀 목록 로드
  const { data: teams, isLoading: isLoadingTeams, error: teamsError } = useQuery(
    ['teams'],
    () => teamRepository.getAllTeams(),
  );

  // 팀 비교 데이터 로드
  const { data: comparison, isLoading: isLoadingComparison, error: comparisonError } = useQuery(
    ['teamComparison', team1, team2],
    () => teamRepository.getTeamComparison(team1, team2),
    {
      enabled: !!(team1 && team2),
    }
  );

  const isLoading = isLoadingTeams || isLoadingComparison;

  // 에러 처리
  if (teamsError || comparisonError) {
    const errorMessage = handleError(teamsError || comparisonError).message;
    return (
      <ComparisonContainer>
        <SectionTitle>팀 비교</SectionTitle>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </ComparisonContainer>
    );
  }

  // 업데이트 알림 자동 숨김
  useEffect(() => {
    if (showUpdate) {
      const timer = setTimeout(() => setShowUpdate(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showUpdate]);

  const chartData = {
    labels: ['평균득점', '3점 성공률', '자유투 성공률', '리바운드', '어시스트'],
    datasets: [
      {
        label: team1 || '팀 1',
        data: comparison?.[0] ? [
          comparison[0].average_points || 0,
          comparison[0].three_point_percentage || 0,
          comparison[0].free_throw_percentage || 0,
          
          
        ] : [],
        borderColor: '#00ff00',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#00ff00',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#00ff00',
      },
      {
        label: team2 || '팀 2',
        data: comparison?.[1] ? [
          comparison[1].average_points || 0,
          comparison[1].three_point_percentage || 0,
          comparison[1].free_throw_percentage || 0,
          
          
        ] : [],
        borderColor: '#ff00ff',
        backgroundColor: 'rgba(255, 0, 255, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 255, 0, 0.1)',
        },
        grid: {
          color: 'rgba(0, 255, 0, 0.1)',
        },
        pointLabels: {
          color: '#ffffff',
          font: {
            size: 12,
          },
        },
        ticks: {
          color: '#00ff00',
          backdropColor: 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00ff00',
        bodyColor: '#ffffff',
        borderColor: '#00ff00',
        borderWidth: 1,
        padding: 10,
      },
    },
  };

  if (isLoading) {
    return (
      <ComparisonContainer>
        <SectionTitle>팀 비교</SectionTitle>
        <TeamSelectionContainer>
          <LoadingSkeleton.StatItem />
          <LoadingSkeleton.StatItem />
        </TeamSelectionContainer>
        <LoadingSkeleton.Chart />
        <LoadingSkeleton.Stats>
          <LoadingSkeleton.StatItem />
          <LoadingSkeleton.StatItem />
          <LoadingSkeleton.StatItem />
          <LoadingSkeleton.StatItem />
        </LoadingSkeleton.Stats>
      </ComparisonContainer>
    );
  }

  return (
    <ComparisonContainer>
      <SectionTitle>팀 비교</SectionTitle>
      
      <TeamSelectionContainer>
        <TeamSelect 
          value={team1} 
          onChange={(e) => setTeam1(e.target.value)}
          disabled={isLoading}
        >
          <option value="">팀 선택</option>
          {teams?.map(team => (
            <option key={team.id} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </TeamSelect>
        
        <TeamSelect 
          value={team2} 
          onChange={(e) => setTeam2(e.target.value)}
          disabled={isLoading}
        >
          <option value="">팀 선택</option>
          {teams?.map(team => (
            <option key={team.id} value={team.team_name}>
              {team.team_name}
            </option>
          ))}
        </TeamSelect>
      </TeamSelectionContainer>

      <ChartContainer>
        <Line data={chartData} options={chartOptions} />
      </ChartContainer>
      {comparison && (
        <StatsGrid>
          <StatCard>
            <StatLabel>평균 득점</StatLabel>
            <StatValue>{comparison[0]?.average_points?.toFixed(1) || '-'}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>3점 성공률</StatLabel>
            <StatValue>{comparison[0]?.three_point_percentage?.toFixed(1) || '-'}%</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>자유투 성공률</StatLabel>
            <StatValue>{comparison[0]?.free_throw_percentage?.toFixed(1) || '-'}%</StatValue>
          </StatCard>
        </StatsGrid>
      )}
      {showUpdate && (
        <UpdateNotification>
          데이터가 업데이트되었습니다
        </UpdateNotification>
      )}
    </ComparisonContainer>
  );
}; 