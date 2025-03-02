import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BlackLogoSVG from '@assets/icons/black_logo.svg?react';

const AuthHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };
  return (
    <AuthHeaderContainer>
      <Header>
        <Logo onClick={handleLogoClick}>
          <BlackLogoSVG />
        </Logo>
      </Header>
    </AuthHeaderContainer>
  );
};

export default AuthHeader;

const AuthHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  z-index: 400;
  border-bottom: 1px solid #e1e2e4;
`;

const Header = styled.div`
  width: 1440px;
  height: 100%;
  padding: 14px 190px;

  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 66px;
  cursor: pointer;
`;
