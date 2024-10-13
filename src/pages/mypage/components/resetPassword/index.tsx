import {
  requestChangePassword,
  requestConfrimCurrentPassword,
} from "@/api/users";
import Button from "@/components/buttons/button";
import { ResetPasswordInputs } from "@/types/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface CurrentPasswordInput {
  password: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<ResetPasswordInputs>();
  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    formState: {
      errors: currentPasswordErrors,
      isDirty: isDirtyCurrentPassword,
    },
    setError: setCurrentPasswordError,
  } = useForm<CurrentPasswordInput>();

  const [isVerifiedCurrentPassword, setIsVerifiedCurrentPassword] =
    useState(false);
  const [updateToken, setUpdateToken] = useState("");

  const onSubmitNewPassword = async (data: ResetPasswordInputs) => {
    const res = await requestChangePassword(data, updateToken);

    console.log(res);
  };

  const onSubmitCurrentPassword = async (data: CurrentPasswordInput) => {
    const { password } = data;
    const res = await requestConfrimCurrentPassword(password);

    if (res.updateToken) {
      setUpdateToken(updateToken);
      setIsVerifiedCurrentPassword(true);
    } else {
      setCurrentPasswordError("password", {
        type: "match",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  };

  const validatePassword = (confirmPassword: string) => {
    if (confirmPassword === getValues("password")) {
      return true;
    } else {
      return "비밀번호가 일치하지 않습니다.";
    }
  };

  return (
    <ResetPasswordContainer>
      <Title>비밀번호 재설정</Title>
      <Form
        onSubmit={
          isVerifiedCurrentPassword
            ? handleSubmit(onSubmitNewPassword)
            : passwordHandleSubmit(onSubmitCurrentPassword)
        }
      >
        {!isVerifiedCurrentPassword && (
          <WithMessageWrapper>
            <InputWrapper>
              <Label>현재 비밀번호 확인</Label>
              <Input
                {...passwordRegister("password", {
                  required: true,
                })}
                type="password"
                placeholder="비밀번호를 입력해주십시오"
                $isDirty={isDirtyCurrentPassword}
                $isError={Boolean(currentPasswordErrors.password)}
              />
            </InputWrapper>
            <Message $isError={Boolean(currentPasswordErrors.password)}>
              {currentPasswordErrors.password?.message}
            </Message>
          </WithMessageWrapper>
        )}
        {isVerifiedCurrentPassword && (
          <Inputs>
            <WithMessageWrapper>
              <InputWrapper>
                <Label>비밀번호</Label>
                <Input
                  {...register("password", {
                    required: true,
                    // maxLength: {
                    //   value: 8,
                    //   message: "비밀번호는 최대 8자까지 입력할 수 있습니다.",
                    // },
                    pattern: /[A-Za-z]{3}/,
                  })}
                  $isDirty={Boolean(dirtyFields.password)}
                  $isError={Boolean(errors.password)}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                />
              </InputWrapper>
              <Message $isError={Boolean(errors.password)}>
                {errors.password?.message}
              </Message>
            </WithMessageWrapper>
            <WithMessageWrapper>
              <InputWrapper>
                <Label>비밀번호 확인</Label>
                <Input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => validatePassword(value),
                  })}
                  placeholder="비밀번호 확인"
                  $isDirty={Boolean(dirtyFields.confirmPassword)}
                  $isError={Boolean(errors.confirmPassword)}
                  type="password"
                />
              </InputWrapper>
              <Message $isError={Boolean(errors.confirmPassword)}>
                {errors.confirmPassword?.message}
              </Message>
            </WithMessageWrapper>
          </Inputs>
        )}
        <Button variation="solid" btnClass="primary" type="submit" width={340}>
          {isVerifiedCurrentPassword ? "변경완료" : "다음단계"}
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

const Form = styled.form`
  height: 338px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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

const Input = styled.input<{ $isDirty: boolean; $isError: boolean }>`
  padding: 12px 16px;
  width: 340px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isDirty, $isError }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0E2"};
  outline: none;

  ::placeholder {
    color: #171719;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const WithMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Message = styled.div<{ $isError: boolean }>`
  font-weight: var(--font-regular);
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  color: ${({ $isError }) => ($isError ? "#FF4242" : "#00bf40;")};
`;
