import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './presentation/pages/HomePage';
import { LandingPage } from './presentation/pages/LandingPage';
import { GlobalStyle } from './presentation/styles/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { Suspense } from 'react';

interface AppContainerProps {
  $isLoaded: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  visibility: ${props => props.$isLoaded ? 'visible' : 'hidden'};
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: #00ff00;
  font-size: 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const theme = {
  colors: {
    background: '#000000',
    primary: '#00ff00',
    secondary: '#111111',
    text: '#ffffff',
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
      suspense: false,
      useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <AppContainer $isLoaded={true}>
            <Suspense fallback={<LoadingContainer>로딩 중...</LoadingContainer>}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/nba" element={<HomePage />} />
              </Routes>
            </Suspense>
          </AppContainer>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App; 