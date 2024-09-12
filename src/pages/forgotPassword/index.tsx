import styled from "styled-components";
import Button from "../../components/buttons/button";
import { useForm } from "react-hook-form";
import { ForgotPasswordInput } from "../../types/user";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<ForgotPasswordInput>();

  return (
    <ResetPasswordContainer>
      <Title>비밀번호 재설정</Title>
      <Description>
        비밀번호 재설정을 진행할 계정의 이메일을 입력해주세요.
      </Description>
      <Form onSubmit={handleSubmit()}>
        <InputWrapper>
          <Label>이메일</Label>
          <Input
            {...register("email", {
              required: true,
            })}
            placeholder="stagecue@example.com"
          />
        </InputWrapper>
        <Button variation="solid" type="primary">
          계속
        </Button>
      </Form>
    </ResetPasswordContainer>
  );
};

export default ForgotPassword;

const ResetPasswordContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div``;

const Description = styled.div``;

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
