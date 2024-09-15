import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ResetPasswordInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";

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
      <Form onSubmit={handleSubmit(onSubmitNewPassword)}>
        <InputWrapper>
          <TitleWrapper>
            <Title>비밀번호 재설정</Title>
          </TitleWrapper>
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
        <Button variation="solid" btnClass="primary" type="submit" width={340}>
          제출
        </Button>
      </Form>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;

const ResetPasswordContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-top: 211px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  margin-bottom: 85px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const Form = styled.form``;

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
  margin-bottom: 32px;
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