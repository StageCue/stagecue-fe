import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useSessionStore from '@/store/session';
import CaretDownSVG from '@assets/icons/caret_down.svg?react';
import BlackLogoSVG from '@assets/icons/black_logo.svg?react';
import { useGetTroupeInfo } from '@/pages/biz/components/manageTroupe/hooks/useGetTroupe';

const BizHeader = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();

  const { data } = useGetTroupeInfo();
  const setUserType = useSessionStore(state => state.setUserType);
  const { name = '극단을 설정해주세요.' } = data ?? {};
  const [isMymenuShowing, setIsMymenuShowing] = useState<boolean>(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMymenuClick = () => {
    setIsMymenuShowing(prev => !prev);
  };

  const handleLogoutClick = () => {
    sessionStore.logoutSession();
  };

  useEffect(() => {
    if (data) {
      setUserType('TROUPE');
    }
  }, [data, setUserType]);

  return (
    <BizHeaderContainer>
      <BizHeaderContent>
        <LeftSideWrapper>
          <Logo onClick={handleLogoClick}>
            <BlackLogoSVG />
          </Logo>
          <Title>극단주 서비스</Title>
        </LeftSideWrapper>
        <RightSideWrapper>
          <ButtonWrapper onClick={handleMymenuClick}>
            <AuthMenuBtn>
              {name}
              <CaretDownSVG />
            </AuthMenuBtn>
          </ButtonWrapper>
          {isMymenuShowing && (
            <MyMenu>
              <UserWrapper>
                <Name>{sessionStore.username}</Name>
                <Email>{sessionStore.email}</Email>
              </UserWrapper>
              <Divider />
              <Option onClick={handleLogoutClick}>로그아웃</Option>
            </MyMenu>
          )}
        </RightSideWrapper>
      </BizHeaderContent>
    </BizHeaderContainer>
  );
};

export default BizHeader;

const BizHeaderContainer = styled.div`
  width: 100%;
  min-width: 800px;
  height: 60px;
  padding: 14px 24px;

  position: fixed;

  border-bottom: 1px solid #e1e2e4;
  background-color: white;
  z-index: 400;
`;

const BizHeaderContent = styled.div`
  width: 100%;
  max-width: 1440px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  font-weight: var(--var-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
  color: #000000;
`;

const AuthMenuBtn = styled.div`
  font-weight: var(--font-regular);
  font-size: 15px;
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #1e1e1e;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Logo = styled.div`
  width: 66px;
  cursor: pointer;
`;

const MyMenu = styled.div`
  position: absolute;
  width: 220px;
  height: 117px;
  right: 28px;
  background-color: white;
  bottom: -105px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #000000;
`;

const Email = styled.div`
  font-weight: var(--font-regular);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
  color: #c7c7c8;
`;

const Divider = styled.div`
  height: 1px;
  width: 188px;
  border: 0.5px solid #e0e0e2;
`;

const Option = styled.div`
  font-size: 14px;
  font-weight: var(font-semibold);
  letter-spacing: 1.45%;
  line-height: 142.9%;
  color: #b81716;
  cursor: pointer;
`;
