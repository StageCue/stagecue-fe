import styled from "styled-components";
import CaretDownSVG from "@assets/icons/caret_down.svg?react";
const BizHeader = () => {
  return (
    <BizHeaderContainer>
      <LeftSideWrapper>
        <Logo />
        <Title>극단주 서비스</Title>
      </LeftSideWrapper>
      <RightSideWrapper>
        <AuthMenuBtn>대충 긴극단 이름 예시 </AuthMenuBtn>
        <CaretDownSVG />
      </RightSideWrapper>
    </BizHeaderContainer>
  );
};

export default BizHeader;

const BizHeaderContainer = styled.div`
  width: 100%;
  height: 70px;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  border-bottom: 1px solid #e1e2e4;
  background-color: white;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightSideWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
`;

const Logo = styled.div`
  width: 65.92px;
  height: 25.6px;
  background-color: red;
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
`;
