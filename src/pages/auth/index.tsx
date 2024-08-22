import styled from "styled-components";

const Auth = () => {
  return (
    <AuthContainer>
      <CenterTextWrapper>
        <ServiceName>
          <SubText>일상 속 특별한 무대</SubText>
          <MainText>Stage Cue</MainText>
        </ServiceName>
        <Description>
          <Text>직장인과 일반인을 위한 연극 커뮤니티</Text>
          <Text>스테이지큐에서 당신의 숨겨둔 재능을 펼쳐보세요</Text>
        </Description>
      </CenterTextWrapper>
      <GettingStartSNSWrapper>
        <div>카카오로 시작</div>
        <div>네이버로 시작</div>
        <div>구글계정으로 시작</div>
      </GettingStartSNSWrapper>
      <GettingStartEmailWrapper>
        <JoinWithEmailBtn>이메일로 시작하기</JoinWithEmailBtn>
        <FindAccountBtn>계정이 기억나지 않으시나요?</FindAccountBtn>
      </GettingStartEmailWrapper>
    </AuthContainer>
  );
};

export default Auth;

const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 177px;
  min-height: 854px;
`;

const CenterTextWrapper = styled.div`
  width: 186px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

const ServiceName = styled.div`
  width: 186px;
  height: 78px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubText = styled.div`
  height: 26px;
  text-align: center;
  line-height: 144.5%;
  letter-spacing: -0.02%;
  font-size: 18px;
  color: var(--color-black);
`;

const MainText = styled.div`
  height: 52px;
  text-align: center;
  font-size: 40px;
  line-height: 130%;
  letter-spacing: -2.82%;
  font-weight: var(--font-bold);
`;

const Description = styled.div`
  width: 309px;
  height: 52px;
  text-align: center;
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: var(--color-black);
`;

const GettingStartSNSWrapper = styled.div`
  padding-bottom: 56px;
`;

const GettingStartEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 162px;
  height: 68px;
`;

const JoinWithEmailBtn = styled.div`
  height: 28px;
  text-align: center;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-weight: var(--font-semibold);
  color: var(--color-blue);
  cursor: pointer;
`;

const FindAccountBtn = styled.div`
  height: 20px;
  text-align: center;
  font-weight: var(--font-semibold);
  color: var(--color-gray);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
  cursor: pointer;
`;
