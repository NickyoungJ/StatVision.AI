import { useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ComparisonContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #111111;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 255, 0, 0.1);
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

const ComparisonStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  background-color: #222222;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
`;

const StatLabel = styled.div`
  color: #888888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #00ff00;
  font-size: 1.2rem;
  font-weight: bold;
`;

// 임시 팀 데이터
const NBA_TEAMS = [
  { id: 'LAL', name: 'Los Angeles Lakers' },
  { id: 'GSW', name: 'Golden State Warriors' },
  { id: 'BOS', name: 'Boston Celtics' },
  { id: 'MIA', name: 'Miami Heat' },
  // ... 더 많은 팀 추가
];

export const TeamComparison: React.FC = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const chartData = {
    labels: ['승률', '평균득점', '평균실점', '리바운드', '어시스트'],
    datasets: [
      {
        label: team1 || '팀 1',
        data: [65, 110, 102, 45, 25],
        borderColor: '#00ff00',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        tension: 0.4,
      },
      {
        label: team2 || '팀 2',
        data: [58, 108, 105, 42, 23],
        borderColor: '#ff00ff',
        backgroundColor: 'rgba(255, 0, 255, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      r: {
        grid: {
          color: '#333333',
        },
      },
      y: {
        grid: {
          color: '#333333',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      x: {
        grid: {
          color: '#333333',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };

  return (
    <ComparisonContainer>
      <SectionTitle>팀 비교</SectionTitle>
      <TeamSelectionContainer>
        <TeamSelect 
          value={team1} 
          onChange={(e) => setTeam1(e.target.value)}
        >
          <option value="">팀 선택</option>
          {NBA_TEAMS.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </TeamSelect>
        <TeamSelect 
          value={team2} 
          onChange={(e) => setTeam2(e.target.value)}
        >
          <option value="">팀 선택</option>
          {NBA_TEAMS.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </TeamSelect>
      </TeamSelectionContainer>

      <Line data={chartData} options={chartOptions} />

      <ComparisonStats>
        <StatCard>
          <StatLabel>승률</StatLabel>
          <StatValue>65%</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>평균 득점</StatLabel>
          <StatValue>110.5</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>평균 실점</StatLabel>
          <StatValue>102.3</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>리바운드</StatLabel>
          <StatValue>45.2</StatValue>
        </StatCard>
      </ComparisonStats>
    </ComparisonContainer>
  );
}; 