import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Searchbar from '../components/searchbar';
import Button from '@/components/buttons/button';
import useSessionStore from '@/store/session';
import ChevronDownSVG from '@assets/icons/chebron_down_s.svg?react';
import BlackLogoSVG from '@assets/icons/black_logo.svg?react';
import { useState } from 'react';

const DefaultHeader = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();
  const clearUserSessionStorage = useSessionStore.persist.clearStorage;
  const [isMymenuShowing, setIsMymenuShowing] = useState<boolean>(false);

  const isTroupeUser = sessionStore.userType === 'TROUPE';

  const handlePostPageClick = () => {
    navigate('/casts');
  };

  const handleLoginClick = () => {
    navigate('/auth/starting');
  };

  const handleBizClick = () => {
    navigate('/biz');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMymenuClick = () => {
    setIsMymenuShowing(prev => !prev);
  };

  const handleLogoutClick = () => {
    sessionStore.logoutSession();
    clearUserSessionStorage();
    navigate('/');
  };

  const handleMyStageClick = () => {
    navigate('/mypage');
    setIsMymenuShowing(false);
  };

  return (
    <DefaultHeaderContainer>
      <HeaderContainer>
        <LeftSideWrapper>
          <Logo onClick={handleLogoClick}>
            <BlackLogoSVG />
          </Logo>
          <PostPageBtn onClick={handlePostPageClick}>모집공고</PostPageBtn>
        </LeftSideWrapper>
        <RightSideWrapper>
          <Searchbar />
          {sessionStore.isLoggined ? (
            <ButtonWrapper>
              <Button
                variation="outlined"
                btnClass="primary"
                width={114}
                height={32}
                padding="7px 14px"
                fontSize={13}
                onClick={handleMymenuClick}
              >
                {sessionStore.username}님
                <IconWrapper>
                  <ChevronDownSVG />
                </IconWrapper>
              </Button>
              {isMymenuShowing && (
                <MyMenu>
                  <Option onClick={handleMyStageClick}>My Stage</Option>
                  <Option onClick={handleLogoutClick}>로그아웃</Option>
                </MyMenu>
              )}
            </ButtonWrapper>
          ) : (
            <Button
              variation="solid"
              btnClass="primary"
              width={114}
              height={32}
              padding="7px 14px"
              fontSize={13}
              onClick={handleLoginClick}
            >
              로그인/회원가입
            </Button>
          )}

          {isTroupeUser && (
            <Button
              variation="outlined"
              btnClass="assistive"
              width={102}
              height={32}
              padding="7px 14px"
              fontSize={13}
              onClick={handleBizClick}
            >
              극단주 서비스
            </Button>
          )}
        </RightSideWrapper>
      </HeaderContainer>
    </DefaultHeaderContainer>
  );
};

export default DefaultHeader;

const DefaultHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  position: fixed;
  left: 0;
  z-index: 400;
  border-bottom: 1px solid #e1e2e4;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1060px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  padding-bottom: 14px;
  margin: 0 auto;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const RightSideWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Logo = styled.div`
  width: 66px;
  cursor: pointer;
`;

const PostPageBtn = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 150%;
  color: #171719;
  white-space: nowrap;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  rect {
    fill: #b82824;
  }
`;

const MyMenu = styled.div`
  position: absolute;
  width: 114px;
  height: 89px;
  background-color: white;
  bottom: -95px;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Option = styled.div`
  font-size: 14px;
  font-weight: var(font-medium);
  letter-spacing: 1.45%;
  line-height: 157.1%;
  color: #000000;
  cursor: pointer;
`;
