import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ResetPasswordInputs } from "../../types/user";

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
        <button type="submit">제출</button>
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

const Form = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 340px;
  padding: 12px 16px;
  border-radius: 10px;
`;
