import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ResetPasswordInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";
import { requestResetPasswordFromMail } from "@/api/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FindPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const [isResetPassword, setIsResetPassword] = useState(true);

  const onSubmitNewPassword = async (data: ResetPasswordInputs) => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      const res = await requestResetPasswordFromMail({
        newPassword: data.password,
        token,
      });
      if (res) {
        setIsResetPassword(true);
      }
    }
  };

  const validatePassword = (password: string) => {
    return password.includes("abc");
  };

  const handleGoToLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <FindPasswordContainer>
      <TitleWrapper>
        <Title>비밀번호 재설정</Title>
      </TitleWrapper>
      {!isResetPassword && (
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
          <Button
            variation="solid"
            btnClass="primary"
            type="submit"
            width={340}
          >
            제출
          </Button>
        </Form>
      )}
      {isResetPassword && (
        <>
          <ResetPasswordBox>
            <TextWrapper>
              <MainText>비밀번호를 정상적으로 변경했어요</MainText>
              <SubText>아래버튼을 눌러 로그인을 진행해주세요</SubText>
            </TextWrapper>
          </ResetPasswordBox>
          <Button
            variation="solid"
            btnClass="primary"
            padding="12px"
            fontSize={16}
            letterSpacing={0.57}
            lineHeight={150}
            fontWeight="var(--font-semibold)"
            width={340}
            height={48}
            onClick={handleGoToLoginClick}
          >
            로그인 하러가기
          </Button>
        </>
      )}
    </FindPasswordContainer>
  );
};

export default FindPassword;

const FindPasswordContainer = styled.div`
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

  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const Form = styled.form`
  margin-top: 80px;
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

const ResetPasswordBox = styled.div`
  width: 520px;
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f7f8;
  padding: 24px;
  gap: 16px;
  border-radius: 10px;
  margin-bottom: 56px;
  margin-top: 80px;
  display: flex;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.div`
  font-size: 18px;
  line-height: 144.5%;
  letter-spacing: -0.02%;
  font-weight: var(--font-semibold);
  color: #000000;
`;

const SubText = styled.div`
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  font-weight: var(--font-regular);
  color: #000000;
`;
