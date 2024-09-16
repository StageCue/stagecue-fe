import Button from "@/components/buttons/button";
import styled from "styled-components";
import RadioSVG from "@/assets/icons/radio.svg?react";
import RadioCheckedSVG from "@/assets/icons/radio_checked.svg?react";
import { useState } from "react";

const DeleteAccount = () => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleCheckboxClick = () => {
    setIsAgreed((curr) => !curr);
  };

  return (
    <DeleteAccountContainer>
      <Title>계정 탈퇴</Title>
      <Instruction>
        <Caution>회원 탈퇴 전, 안내 사항을 꼭 확인해주세요.</Caution>
        <Articles>
          <Paragraph>
            <Article>1. 탈퇴 아이디 복구 불가</Article>
            <Description>
              탈퇴 후에는 아이디와 데이터 복구가 불가능합니다.
            </Description>
            <Description>신중하게 선택해주세요.</Description>
          </Paragraph>
          <Paragraph>
            <Article>2. 서비스 이용 기록 삭제</Article>
            <Description>
              프로필 등록 정보, 지원 정보, 지원 현황에 대한 서비스 이용기록이 모
            </Description>
            <Description>
              두 삭제되며, 삭제된 데이터는 복구되지 않습니다.
            </Description>
            <Description>
              필요한 데이터는 미리 백업을 해두시기 바랍니다.
            </Description>
          </Paragraph>
        </Articles>
      </Instruction>
      <Paragraph>
        <Article>본인 확인</Article>
        <Description>본인 확인을 위해 이메일 인증을 완료해주세요.</Description>
      </Paragraph>
      <Form>
        <Label>이메일</Label>
        <ShortInputWrapper>
          <ShortInput />
          <Button variation="outlined" btnClass="primary" width={116}>
            전송
          </Button>
        </ShortInputWrapper>
        <CheckboxInputWrapper onClick={handleCheckboxClick}>
          {isAgreed ? <RadioCheckedSVG /> : <RadioSVG />}
          <CheckboxLabel>
            안내 사항을 모두 확인했으며, 이에 동의합니다.
          </CheckboxLabel>
        </CheckboxInputWrapper>
        <Button variation="solid" btnClass="primary" width={340}>
          탈퇴하기
        </Button>
      </Form>
    </DeleteAccountContainer>
  );
};

export default DeleteAccount;

const DeleteAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-weight: var(--font-semibold);
  font-size: 22px;
  line-height: 136.4%;
  letter-spacing: 1.94%;
  color: #1e1e1e;
  margin-bottom: 32px;
`;

const Instruction = styled.div`
  width: 355px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f3f3f3;
`;

const Caution = styled.div`
  font-weight: var(--font-medium);
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  margin-bottom: 28px;
`;

const Article = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-weight: var(--font-medium);
  font-size: 13px;
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const Articles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Paragraph = styled.div`
  width: 355px;
`;

const Form = styled.div`
  width: 355px;
  margin-top: 28px;
`;

const Label = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
  margin-bottom: 12px;
`;

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ShortInput = styled.input`
  padding: 12px 16px;
  width: 231px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid #70737c;
  outline: none;

  ::placeholder {
    color: #171719;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const CheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 106.33px;
  gap: 4px;
  margin-bottom: 34px;
`;

const CheckboxLabel = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
`;
