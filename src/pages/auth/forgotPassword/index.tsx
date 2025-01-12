import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ForgotPasswordInput } from "../../../types/user";
import Button from "../../../components/buttons/button";
import { requestResetPasswordEmail } from "@/api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, watch } = useForm<ForgotPasswordInput>();
  const [isSentEmail, setIsSentEmail] = useState(false)
  const [emailValue] = watch(["email"]);

  const onSubmitEmail = async (data: ForgotPasswordInput) => {
    await requestResetPasswordEmail(data.email);
    setIsSentEmail(true)
  };

  const handleLoginClick = () => {
    navigate("/auth/login")
  }

  return (
    <ResetPasswordContainer>
      <TitleWrapper>
        <Title>비밀번호 재설정</Title>
        <Description>
        {!isSentEmail ? "비밀번호 재설정을 진행할 계정의 이메일을 입력해주세요." : `비밀번호 재설정을 위한 이메일을 아래의 메일로 전송했어요.\n이메일이 오지 않았다면, 스팸메일함 또는 메일주소를 확인해주세요.`}
        </Description>
      </TitleWrapper>
      { !isSentEmail ?  <Form onSubmit={handleSubmit(onSubmitEmail)}>
        <InputWrapper>
          <Label>이메일</Label>
          <Input
            {...register("email", {
              required: true,
            })}
            placeholder="stagecue@example.com"
          />
        </InputWrapper>
        <Button
          variation="solid"
          btnClass="primary"
          width={340}
          disabled={!emailValue}
        >
          비밀번호 변경
        </Button>
      </Form> : <><AccountBox>{emailValue}</AccountBox>
      <Button
          variation="solid"
          btnClass="primary"
          width={340}
          disabled={!emailValue}
          onClick={handleLoginClick}
        >
         로그인으로 이동
        </Button></>}
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

const TitleWrapper = styled.div`
  margin-top: 251px;
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
  white-space: pre-wrap;
  text-align: center;
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


const AccountBox = styled.div`
  width: 520px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f7f8;
  padding: 24px;
  gap: 16px;
  border-radius: 10px;
  margin-bottom: 56px;
  font-size: 18px;
  font-weight: var(font-semibold);
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;