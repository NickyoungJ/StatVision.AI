import * as React from 'react';
import styled from 'styled-components';

const PredictionContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background-color: #111111;
  border-radius: 8px;
`;

export const PredictionSection: React.FC = () => {
  return (
    <PredictionContainer>
      <h2>경기 예측</h2>
      {/* 추후 구현 */}
    </PredictionContainer>
  );
}; 