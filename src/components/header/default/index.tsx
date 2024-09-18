import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Searchbar from "../components/searchbar";
import Button from "@/components/buttons/button";
import useSessionStore from "@/store";
import ChevronDownSVG from "@assets/icons/chebron_down_s.svg?react";
import { useState } from "react";

const DefaultHeader = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();
  const clearUserSessionStorage = useSessionStore.persist.clearStorage;
  const [isMymenuShowing, setIsMymenuShowing] = useState<boolean>(false);

  const handlePostPageClick = () => {
    navigate("/post");
  };

  const handleLoginClick = () => {
    navigate("/auth/starting");
  };

  const handleBizClick = () => {
    navigate("/biz");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMymenuClick = () => {
    setIsMymenuShowing((prev) => !prev);
  };

  const handleLogoutClick = () => {
    sessionStore.logoutSession();
    clearUserSessionStorage();
    window.location.reload();
  };

  const handleMyStageClick = () => {
    navigate("/mypage");
    setIsMymenuShowing(false);
  };

  return (
    <DefaultHeaderContainer>
      <LeftSideWrapper>
        <Logo
          onClick={handleLogoClick}
          src="https://s3.stagecue.co.kr/stagecue/troupe-logos/08c8c037-d47d-4ef7-9f05-42c97fa9ab5b.jpg"
        />
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
              범석님
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
      </RightSideWrapper>
    </DefaultHeaderContainer>
  );
};

export default DefaultHeader;

const DefaultHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 14px 190px;
  background-color: white;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  z-index: 400;
  border-bottom: 1px solid #e1e2e4;
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

const Logo = styled.img`
  width: 66px;
  cursor: pointer;
`;

const PostPageBtn = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 150%;
  color: #171719;
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
