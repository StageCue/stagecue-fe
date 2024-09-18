import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <LeftSideWrapper>
        <Copyright>© (주)노소리. All rights reserved.</Copyright>
      </LeftSideWrapper>
      <RightSideWrapper>
        <Menu>
          <Option>이용약관</Option>
          <Option>개인정보처리방침</Option>
        </Menu>
      </RightSideWrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: 42px 190px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSideWrapper = styled.div``;

const RightSideWrapper = styled.div``;

const Copyright = styled.div`
  font-size: 12px;
  letter-spacing: 2.52%;
  line-height: 133.4%;
  color: #999ba2;
  font-weight: var(--font-regular);
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;
`;

const Option = styled.div`
  color: #171719;
  font-weight: var(--font-medium);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;
