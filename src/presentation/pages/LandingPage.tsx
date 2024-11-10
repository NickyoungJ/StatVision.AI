import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #00ff00;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StartButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #00ff00;
  color: #000000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 255, 0, 0.3);
  }
`;

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LandingContainer>
      <Title>NBA 예측 도우미</Title>
      <Subtitle>
        AI 기반의 NBA 경기 분석과 예측으로 더 스마트한 베팅을 시작하세요
      </Subtitle>
      <StartButton onClick={() => navigate('/nba')}>
        시작하기
      </StartButton>
    </LandingContainer>
  );
}; 