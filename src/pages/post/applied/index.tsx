import Button from "@/components/buttons/button";
import styled from "styled-components";

const Applied = () => {
  return (
    <AppliedContainer>
      <SuccessBox>
        <SuccessGIF src="https://lottiefiles.com/animations/progress-completed-animation-qy0WxXRTgS" />
        <CompleteTextWrapper>
          <Text>공고지원을 완료했어요!</Text>
          <SubText>다른 공고도 둘러볼까요?</SubText>
        </CompleteTextWrapper>
        <Button variation="solid" btnClass="primary" width={308} height={48}>
          공고 둘러보기
        </Button>
      </SuccessBox>
      <CastsWrapper></CastsWrapper>
    </AppliedContainer>
  );
};

export default Applied;

const AppliedContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-bottom: 100px;
`;

const SuccessBox = styled.div`
  width: 920px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid #dfdfe0;
  border-radius: 8px;
`;

const SuccessGIF = styled.img``;

const CompleteTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  line-height: 144.5%;
  letter-spacing: -0.02;
  color: #000000;
`;

const SubText = styled.div`
  font-weight: var(--font-regular);
  font-size: 15px;
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #999ba2;
`;

const CastsWrapper = styled.div``;
