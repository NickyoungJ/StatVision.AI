import styled from 'styled-components';
import { GameSchedule } from '../components/GameSchedule';
import { TeamComparison } from '../components/TeamComparison';
import { PredictionSection } from '../components/PredictionSection';
import { Navbar } from '../components/Navbar';

const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 70px;
  background-color: #000000;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #00ff00;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
`;

export const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <HomeContainer>
        <ContentWrapper>
          <Title>NBA 예측 도우미</Title>
          <TeamComparison />
          <GameSchedule />
          <PredictionSection />
        </ContentWrapper>
      </HomeContainer>
    </>
  );
}; 