import styled from "styled-components";

const DefaultFooter = () => {
  return (
    <FooterContainer>
      <FooterRow>
        <LeftSideWrapper>
          <Logo src="https://s3.stagecue.co.kr/stagecue/troupe-logos/08c8c037-d47d-4ef7-9f05-42c97fa9ab5b.jpg" />
          <TextWrapper>
            <TextRow>
              (주)노소리 <TextDivder>|</TextDivder> 대표 노영준
              <TextDivder>|</TextDivder> 사업자등록번호 809-02-02660
            </TextRow>
            <TextRow>
              경기도 김포시 통진읍 서암로 325-40 <TextDivder>|</TextDivder>
              고객센터 stagecue.co.kr@gmail.com
            </TextRow>
          </TextWrapper>
        </LeftSideWrapper>
        <RightSideWrapper>
          <Menu>
            <Option>서비스 소개</Option>
            <Option>블로그</Option>
            <Option>공지사항</Option>
            <Option>개인정보처리방침</Option>
          </Menu>
        </RightSideWrapper>
      </FooterRow>
      <Copyright>© (주)노소리. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default DefaultFooter;

const FooterContainer = styled.div`
  width: 100%;
  height: 140px;
  padding: 32px 24px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e1e2e4;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  font-size: 12px;
  line-height: 133.4%;
  letter-spacing: 2.52%;
  color: #47484b;
`;

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

const Logo = styled.img`
  width: 82.4px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextRow = styled.div`
  display: flex;
`;

const TextDivder = styled.div`
  color: #e1e2e4;
  margin: 0px 8px;
`;
