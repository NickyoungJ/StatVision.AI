import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    background-color: #000000;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #ffffff;
    line-height: 1.5;
    overflow-x: hidden;
    min-height: 100vh;
    background-color: #000000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
    background-color: #000000;
  }

  a {
    color: #00ff00;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #00ff00;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  div {
    background-color: inherit;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`; 