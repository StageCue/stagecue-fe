import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BlackLogoSVG from '@assets/icons/black_logo.svg?react';

const DefaultFooter = () => {
  return (
    <FooterContainer>
      <Footer>
        <MenuWrapper>
          <Logo>
            <BlackLogoSVG />
          </Logo>
          <Menu>
            <Option to="/service-info">서비스 소개</Option>
            <Option to="/blog">블로그</Option>
            <Option to="/notice">공지사항</Option>
            <Option to="/privacy-policy">개인정보처리방침</Option>
          </Menu>
        </MenuWrapper>
        <TextContainer>
          <TextWrapper>
            <TextRow>
              (주)노소리 <TextDivder>|</TextDivder> 대표 노영준
            </TextRow>
            <TextRow>
              경기도 김포시 통진읍 서암로 325-40 <TextDivder>|</TextDivder>사업자등록번호
              809-02-02660
            </TextRow>
            <TextRow>📩 고객센터 stagecue.co.kr@gmail.com</TextRow>
          </TextWrapper>
          <Copyright>© (주)노소리. All rights reserved.</Copyright>
        </TextContainer>
      </Footer>
    </FooterContainer>
  );
};

export default DefaultFooter;

const FooterContainer = styled.div`
  width: 100%;
  height: fit-content;
  padding-top: 32px;
  padding-bottom: 32px;

  border-top: 1px solid #e1e2e4;
`;

const Footer = styled.div`
  width: 1060px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  line-height: 133.4%;
  letter-spacing: 2.52%;
  color: #47484b;
`;

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

const Option = styled(Link)`
  color: #171719;
  font-weight: var(--font-medium);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;

const Logo = styled.div`
  width: 66px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextRow = styled.div`
  display: flex;
  font-weight: var(--font-medium);
  font-size: 12px;
  line-height: 133%;
`;

const TextDivder = styled.div`
  color: #e1e2e4;
  margin: 0px 8px;
`;
