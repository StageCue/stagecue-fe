import Button from "@/components/buttons/button";
import styled from "styled-components";

const ManageTroupe = () => {
  return (
    <ManageTroupeContainer>
      <CoverImageWrapper>
        <CoverImageWrapper>
          <Cover />
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </CoverImageWrapper>
      </CoverImageWrapper>
      <Content>
        <ButtonWapper>
          <Button
            variation="outlined"
            btnClass="secondary"
            width={129}
            height={40}
            fontSize={15}
            padding="9px 20px"
          >
            극단 정보 수정
          </Button>
        </ButtonWapper>
        <ContentWrapper>
          <TextColumn>
            <TextTitleWrapper>
              <Title>대충 그냥 긴 극단이름예시</Title>
              <FollowerWrapper></FollowerWrapper>
            </TextTitleWrapper>
          </TextColumn>
          <SummaryColumn></SummaryColumn>
        </ContentWrapper>
      </Content>
    </ManageTroupeContainer>
  );
};

export default ManageTroupe;

const ManageTroupeContainer = styled.div`
  padding: 24px 40px;
`;

const CoverImageWrapper = styled.div`
  position: relative;
`;

const Cover = styled.div`
  width: 1100px;
  height: 300px;
  background-color: gray;
  border-radius: 12px;
`;

const LogoWrapper = styled.div`
  position: absolute;
  bottom: -30px;
  left: 25px;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: black;
`;

const Content = styled.div`
  width: 1100px;
  margin-top: 30px;
  padding: 0px 24px 20px 24px;
`;

const ButtonWapper = styled.div`
  width: 100%;
  margin-right: 24px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 35px;
`;

const TextColumn = styled.div``;

const TextTitleWrapper = styled.div``;

const Title = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const FollowerWrapper = styled.div``;

const FollowerText = styled.div``;

const FollowerValue = styled.div``;

const SummaryColumn = styled.div``;
