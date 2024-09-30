import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ForgotAccountInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";

const ForgotAccount = () => {
  const { register } = useForm<ForgotAccountInputs>();

  return (
    <ForgotAccountContainer>
      <TitleWrapper>
        <Title>계정 찾기</Title>
        <Description>회원 가입시 인증했던 전화번호를 입력해주세요.</Description>
      </TitleWrapper>
      <Form>
        <InputWrapper>
          <Label>휴대폰번호</Label>
          <ShortInputWrapper>
            <ShortInput
              {...register("phoneNumber", {
                required: true,
              })}
              placeholder="010-1234-5678"
            />
            <Button variation="solid" btnClass="primary" width={140}>
              인증번호 받기
            </Button>
          </ShortInputWrapper>
          <Input
            {...register("certCode", { required: true })}
            placeholder="인증번호를 입력해주세요"
          />
        </InputWrapper>
        <Button variation="solid" btnClass="primary" width={340}>
          계속
        </Button>
      </Form>
    </ForgotAccountContainer>
  );
};

export default ForgotAccount;

const ForgotAccountContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-top: 219px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 64px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const Description = styled.div`
  font-weight: var(--font-regualr);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
`;

const Form = styled.form``;

const Label = styled.label`
  color: #171719;
  font-weight: var(--font-semibold);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  width: 340px;
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ShortInput = styled.input`
  padding: 12px 16px;
  width: 192px;
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
