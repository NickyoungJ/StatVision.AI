import styled from 'styled-components';

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

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
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

export const Navbar = () => {
  return (
    <NavContainer>
      <Logo>
        <LogoIcon>S</LogoIcon>
        Stat<span>Vision</span>.AI
      </Logo>
    </NavContainer>
  );
}; 