import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ForgotAccountInputs } from "../../types/user";
import Button from "../../components/buttons/button";

const ForgotAccount = () => {
  const { register, handleSubmit } = useForm<ForgotAccountInputs>();

  return (
    <ForgotAccountContainer>
      <Title>계정 찾기</Title>
      <Description>회원 가입시 인증했던 전화번호를 입력해주세요.</Description>
      <Form onSubmit={handleSubmit()}>
        <InputWrapper>
          <Label>휴대폰번호</Label>
          <Input
            {...register("phoneNumber", {
              required: true,
            })}
            placeholder="010-1234-5678"
          />
          <Button variation="solid" type="primary">
            인증번호 받기
          </Button>
        </InputWrapper>
        <InputWrapper>
          <Input
            {...register("certCode", { required: true })}
            placeholder="인증번호를 입력해주세요"
          />
        </InputWrapper>
        <Button variation="solid" type="primary">
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

const Title = styled.div`
  margin-bottom: 13px;
`;

const Description = styled.div`
  margin-bottom: 64px;
`;

const Form = styled.form``;

const Label = styled.label``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  width: 340px;
  padding: 12px 16px;
  border-radius: 10px;
`;
