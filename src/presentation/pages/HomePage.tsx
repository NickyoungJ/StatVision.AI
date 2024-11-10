import styled from 'styled-components';
import { GameSchedule } from '../components/GameSchedule';
import { TeamComparison } from '../components/TeamComparison';
import { PredictionSection } from '../components/PredictionSection';
import { Navbar } from '../components/Navbar';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  color: #ffffff;
  padding-top: 90px; // Navbar 높이 + 여백
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <HomeContainer>
        <ContentWrapper>
          <Title>NBA 예측 도우미</Title>
          <GridLayout>
            <GameSchedule />
            <TeamComparison />
            <PredictionSection />
          </GridLayout>
        </ContentWrapper>
      </HomeContainer>
    </>
  );
}; 