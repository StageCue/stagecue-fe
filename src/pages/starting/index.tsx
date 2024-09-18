import styled from "styled-components";
import Button from "../../components/buttons/button";
import { useNavigate } from "react-router-dom";

const Starting = () => {
  const navigate = useNavigate();

  const handleWithEmailClick = () => {
    navigate("/auth/login");
  };

  const handleForgotAccont = () => {
    navigate("/auth/forgotaccount");
  };

  return (
    <StartingContainer>
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
      <SocialLoginWrapper>
        <WithKaKaoBtn>카카오로 시작하기</WithKaKaoBtn>
        <WithNaverBtn>네이버 계정으로 시작하기</WithNaverBtn>
        <WithGoogleBtn>구글 계정으로 시작하기</WithGoogleBtn>
      </SocialLoginWrapper>
      <WithEmailWrapper>
        <Button
          variation="text"
          btnClass="primary"
          height={30}
          width={150}
          onClick={handleWithEmailClick}
        >
          이메일로 시작하기
        </Button>
        <Button
          variation="text"
          btnClass="assistive"
          width={162}
          height={28}
          fontSize={14}
          padding="16px 0"
          onClick={handleForgotAccont}
        >
          계정이 기억나지 않으시나요?
        </Button>
      </WithEmailWrapper>
    </StartingContainer>
  );
};

export default Starting;

const StartingContainer = styled.div`
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
  margin-bottom: 16px;
`;

const SubText = styled.div`
  height: 26px;
  text-align: center;
  line-height: 144.5%;
  letter-spacing: -0.02%;
  font-size: 18px;
  font-weight: var(--font-regular);
  color: #000000;
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
  font-weight: var(--font-regular);
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: var(--color-black);
`;

const WithEmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 162px;
  height: 68px;
`;

const SocialLoginWrapper = styled.div`
  padding-bottom: 56px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const WithKaKaoBtn = styled.div`
  width: 340px;
  height: 48px;
  border-radius: 10px;
  background-color: #fee500;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-semibold);
  line-height: 22px;
  color: #363636;
`;

const WithNaverBtn = styled.div`
  width: 340px;
  height: 48px;
  border-radius: 10px;
  background-color: #03c75a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-semibold);
  line-height: 22px;
  color: #ffffff;
`;

const WithGoogleBtn = styled.div`
  width: 340px;
  height: 48px;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-semibold);
  line-height: 22px;
  color: #363636;
  border: 1px solid #70737c;
`;
