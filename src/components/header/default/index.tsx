import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Searchbar from '../components/searchbar';
import Button from '@/components/buttons/button';
import useSessionStore from '@/store/session';
import ChevronDownSVG from '@assets/icons/chebron_down_s.svg?react';
import BlackLogoSVG from '@assets/icons/black_logo.svg?react';
import { useEffect, useRef } from 'react';
import useHandleClickOutside from '@/hooks/useHandleClickOutside';

const DefaultHeader = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const { isOpen: isMyMenuShowing, setIsOpen: setIsMyMenuShowing } =
    useHandleClickOutside(buttonWrapperRef);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonWrapperRef.current && !buttonWrapperRef.current.contains(event.target as Node)) {
        setIsMyMenuShowing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    setIsMyMenuShowing(prev => !prev);
  };

  const handleLogoutClick = () => {
    sessionStore.logoutSession();
  };

  const handleMyStageClick = () => {
    navigate('/mypage');
    setIsMyMenuShowing(false);
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
            <AuthButtonWrapper>
              <ButtonWrapper ref={buttonWrapperRef}>
                <Button
                  variation="outlined"
                  btnClass="primary"
                  height={32}
                  padding="7px 14px"
                  fontSize={13}
                  onClick={handleMymenuClick}
                  borderRadius="6px"
                >
                  {sessionStore.username}님
                  <IconWrapper>
                    <ChevronDownSVG />
                  </IconWrapper>
                </Button>
                {isMyMenuShowing && (
                  <MyMenu>
                    <Option onClick={handleMyStageClick}>My Stage</Option>
                    <Option onClick={handleLogoutClick}>로그아웃</Option>
                  </MyMenu>
                )}
              </ButtonWrapper>
              <Button
                variation="outlined"
                btnClass="assistive"
                width={102}
                height={32}
                padding="7px 14px"
                fontSize={13}
                onClick={handleBizClick}
                borderRadius="6px"
              >
                극단주 서비스
              </Button>
            </AuthButtonWrapper>
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
        </RightSideWrapper>
      </HeaderContainer>
    </DefaultHeaderContainer>
  );
};

export default DefaultHeader;

const DefaultHeaderContainer = styled.div`
  width: 100%;
  min-width: 900px;
  height: 60px;
  background-color: white;
  position: fixed;
  left: 0;
  z-index: 400;
  border-bottom: 1px solid #e1e2e4;
  padding: 0 50px;
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

const AuthButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
