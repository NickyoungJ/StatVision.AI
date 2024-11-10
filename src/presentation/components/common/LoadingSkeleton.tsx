import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #111111 25%,
    #222222 50%,
    #111111 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

const ChartSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 400px;
  margin: 2rem 0;
  border-radius: 8px;
`;

const StatsSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const StatItemSkeleton = styled(SkeletonBase)`
  height: 100px;
  width: 100%;
  border-radius: 8px;
`;

export const LoadingSkeleton = {
  Chart: ChartSkeleton,
  Stats: StatsSkeleton,
  StatItem: StatItemSkeleton,
}; 