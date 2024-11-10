import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

const LandingContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
  padding-top: 70px;
`;

const HeroSection = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(0,255,0,0.1) 0%, rgba(0,0,0,1) 100%);
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  color: #000000;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const LandingPage = () => {
  return (
    <>
      <Navbar />
      <LandingContainer>
        <HeroSection>
          <Title>스포츠 예측의 미래</Title>
          <Subtitle>
            AI 기반의 정확한 경기 예측과 데이터 분석으로
            더 스마트한 스포츠 베팅을 경험하세요.
          </Subtitle>
          <CTAButton to="/nba">
            NBA 예측 시작하기
          </CTAButton>
        </HeroSection>
      </LandingContainer>
    </>
  );
}; 