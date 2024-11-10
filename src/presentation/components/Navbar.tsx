import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 255, 0, 0.1);
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  span {
    color: #00ff00;
  }
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #000000;
  font-weight: bold;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? '#00ff00' : '#ffffff'};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #00ff00;
    background: rgba(0, 255, 0, 0.1);
  }
`;

export const Navbar = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">
          <LogoIcon>S</LogoIcon>
          Stat<span>Vision</span>.AI
        </Logo>
        <NavMenu>
          <NavLink to="/nba" $isActive={location.pathname === '/nba'}>
            NBA
          </NavLink>
        </NavMenu>
      </NavContent>
    </NavContainer>
  );
}; 