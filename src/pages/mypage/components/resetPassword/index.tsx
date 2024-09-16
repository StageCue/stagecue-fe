import Button from "@/components/buttons/button";
import { ResetPasswordInputs } from "@/types/user";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const onSubmitNewPassword = (data: ResetPasswordInputs) => {
    console.log(data);
  };

  const validatePassword = (password: string) => {
    return password.includes("abc");
  };

  return (
    <ResetPasswordContainer>
      <Title>비밀번호 재설정</Title>
      <Form onSubmit={handleSubmit(onSubmitNewPassword)}>
        <Inputs>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              {...register("password", {
                required: true,
                maxLength: {
                  value: 8,
                  message: "비밀번호는 최대 8자까지 입력할 수 있습니다.",
                },
                pattern: /[A-Za-z]{3}/,
                validate: (value) => validatePassword(value),
              })}
              placeholder="비밀번호를 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호 확인</Label>
            <Input
              {...register("confirmPassword", {
                required: true,
              })}
              placeholder="비밀번호 확인"
            />
          </InputWrapper>
        </Inputs>
        <Button variation="solid" btnClass="primary" type="submit" width={340}>
          제출
        </Button>
      </Form>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;

const ResetPasswordContainer = styled.div`
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
  margin-bottom: 48px;
`;

const Form = styled.form``;

const Inputs = styled.div`
  margin-bottom: 136px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Label = styled.label`
  color: #171719;
  font-weight: var(--font-semibold);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
