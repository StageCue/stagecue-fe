import styled from "styled-components";
import CaretDownSVG from "@assets/icons/caret_down.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useSessionStore from "@/store/session";

const BizHeader = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();
  const clearUserSessionStorage = useSessionStore.persist.clearStorage;
  const [isMymenuShowing, setIsMymenuShowing] = useState<boolean>(false);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMymenuClick = () => {
    setIsMymenuShowing((prev) => !prev);
  };

  const handleLogoutClick = () => {
    sessionStore.logoutSession();
    clearUserSessionStorage();
    navigate("/");
  };

  return (
    <BizHeaderContainer>
      <LeftSideWrapper>
        <Logo
          src="https://s3.stagecue.co.kr/stagecue/troupe-logos/08c8c037-d47d-4ef7-9f05-42c97fa9ab5b.jpg"
          onClick={handleLogoClick}
        />
        <Title>극단주 서비스</Title>
      </LeftSideWrapper>
      <RightSideWrapper>
        <ButtonWrapper onClick={handleMymenuClick}>
          <AuthMenuBtn>
            대충 긴극단 이름 예시
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
    </BizHeaderContainer>
  );
};

export default BizHeader;

const BizHeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  border-bottom: 1px solid #e1e2e4;
  background-color: white;
  z-index: 400;
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

const Logo = styled.img`
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
