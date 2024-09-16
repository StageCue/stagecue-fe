import { useForm } from "react-hook-form";
import styled from "styled-components";
import { SignupInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { requestCellPhoneCertCode } from "@/api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [isSentCertCode, setIsSendCertCode] = useState<boolean>(false);
  const [certTime, setCertTime] = useState<number>(300);
  const [certCode, setCertCode] = useState<string>("");
  const [isCertificated, setIsCertificagted] = useState<false>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<SignupInputs>({ mode: "all" });

  const [
    emailValue,
    nameValue,
    phoneNumberValue,
    certificated,
    passwordValue,
    confirmPasswordValue,
  ] = watch([
    "email",
    "name",
    "phoneNumber",
    "certificated",
    "password",
    "confirmPassword",
  ]);

  console.log(certificated);

  const onSubmitSignup = (data: SignupInputs) => {
    console.log(data);
    navigate("/welcome");
  };

  const handleSendCertClick = async () => {
    const isCodeSent = await requestCellPhoneCertCode({
      cell: phoneNumberValue,
    });

    console.log(isCodeSent);

    if (isSentCertCode) {
      setCertTime(300);
    }
    setIsSendCertCode(true);
  };

  const handleCertInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCertCode(event.target.value);
  };

  const handleVerifyCertCodeClick = () => {
    setValue("certificated", true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    if (certTime === 0 || !isSentCertCode) return;

    const timer = setInterval(() => {
      setCertTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [certTime, isSentCertCode]);

  useEffect(() => {
    if (certTime === 0) {
      setIsSendCertCode(false);
    }
  }, [certTime]);

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <SignupForm onSubmit={handleSubmit(onSubmitSignup)}>
        <Inputs>
          <InputWrapper>
            <Label>이메일</Label>
            <Input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
              placeholder="stagecue@example.com"
              $isError={Boolean(errors.email?.message)}
              $isDirty={Boolean(emailValue)}
              onBlur={() => trigger("email")}
            />
            <InputError>{errors.email?.message}</InputError>
          </InputWrapper>
          <InputWrapper>
            <Label>이름</Label>
            <Input
              {...register("name", {
                required: true,
              })}
              placeholder="홍길동"
              $isError={Boolean(errors.name?.message)}
              $isDirty={Boolean(nameValue)}
              onBlur={() => trigger("name")}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>휴대폰번호</Label>
            <ShortInputWrapper>
              <ShortInput
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                    message: "올바른 휴대폰 번호 형식이 아닙니다",
                  },
                })}
                placeholder="010-1234-5678"
                $isError={Boolean(errors.phoneNumber?.message)}
                $isDirty={Boolean(phoneNumberValue)}
                onBlur={() => trigger("phoneNumber")}
              />
              <Button
                variation={isSentCertCode ? "outlined" : "solid"}
                btnClass="primary"
                width={140}
                padding="12px 20px"
                fontSize={15}
                disabled={
                  Boolean(!phoneNumberValue) || Boolean(errors.phoneNumber)
                }
                onClick={handleSendCertClick}
              >
                {isSentCertCode ? "인증번호 재전송" : "인증번호 받기"}
              </Button>
            </ShortInputWrapper>
            <ShortInputWrapper>
              <CertInputWrapper
                $isError={false}
                $isDirty={isSentCertCode}
                $isDisabled={!isSentCertCode}
              >
                <CertInput
                  name="certCode"
                  type="text"
                  onChange={handleCertInputChange}
                  disabled={!isSentCertCode}
                  placeholder={isSentCertCode ? "" : "인증번호를 입력해주세요"}
                  $isSentCode={isSentCertCode}
                />
                {isSentCertCode && <Timer>{formatTime(certTime)}</Timer>}
              </CertInputWrapper>
              <Button
                variation="solid"
                btnClass="primary"
                disabled={certCode.length === 0}
                width={112}
                height={48}
                fontSize={16}
                padding="12px 28px"
                onClick={handleVerifyCertCodeClick}
              >
                인증확인
              </Button>
            </ShortInputWrapper>
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              {...register("password", {
                required: true,
              })}
              placeholder="비밀번호를 입력해주세요"
              $isError={Boolean(errors.password?.message)}
              $isDirty={Boolean(passwordValue)}
              onBlur={() => trigger("password")}
            />
            <ValidationGuide>
              영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합하여 8~24자로
              입력해주세요.
            </ValidationGuide>
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호 확인</Label>
            <Input
              {...register("confirmPassword", {
                required: true,
              })}
              placeholder="비밀번호를 다시 한번 입력해주세요"
              $isError={Boolean(errors.confirmPassword?.message)}
              $isDirty={Boolean(confirmPasswordValue)}
              onBlur={() => trigger("confirmPassword")}
            />
          </InputWrapper>
          <AgreeWrapper>
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("allAgreed", { required: true })}
              />
              <Label>전체 동의</Label>
            </CheckboxInputWrapper>
            <Divder />
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("ageCheck", { required: true })}
              />
              <Label>만 14세 이상입니다 (필수)</Label>
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("agreeServicePolicy", { required: true })}
              />
              <Label>스테이지큐 이용약관 동의 (필수)</Label>
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("agreePrivatePolicy", { required: true })}
              />
              <Label>스에이지큐 개인정보 수집 및 이용 동의 (필수)</Label>
            </CheckboxInputWrapper>
          </AgreeWrapper>
        </Inputs>
        <Button type="submit" variation="solid" btnClass="primary" width={340}>
          회원가입
        </Button>
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 95px;
  margin-bottom: 85px;
  font-size: 28px;
  font-weight: var(--font-bold);
  line-height: 135.8%;
  letter-spacing: -2.36%;
  color: black;
`;

const SignupForm = styled.form`
  margin-bottom: 32px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input<{ $isError: boolean; $isDirty: boolean }>`
  padding: 12px 16px;
  width: 340px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isError, $isDirty }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0e2"};
  outline: none;

  ::placeholder {
    color: #171719;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const ShortInput = styled.input<{ $isError: boolean; $isDirty: boolean }>`
  padding: 12px 16px;
  width: 192px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isError, $isDirty }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0e2"};
  outline: none;

  ::placeholder {
    color: #171719;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const Label = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;

const ValidationGuide = styled.div`
  width: 340px;
  height: 36px;
  margin-top: 8px;
`;

const Divder = styled.div`
  width: 338px;
  height: 1px;
  background-color: var(--color-gray);
`;

const CheckboxInput = styled.input``;

const CheckboxInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const AgreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputError = styled.div`
  color: #ff4242;
  font-size: 13px;
  font-weight: var(--font-regular);
  letter-spacing: 1.94%;
  letter-spacing: 138.5%;
`;

const CertInputWrapper = styled.div<{
  $isDisabled: boolean;
  $isError: boolean;
  $isDirty: boolean;
}>`
  padding: 12px 16px;
  width: 220px;
  height: 48px;
  background-color: ${({ $isDisabled }) =>
    $isDisabled ? "#f4f4f5;" : "white"};
  border: ${({ $isError, $isDirty }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0e2"};
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CertInput = styled.input<{
  $isError: boolean;
  $isDirty: boolean;
  $isSentCode: boolean;
}>`
  width: ${({ $isSentCode }) => ($isSentCode ? "133px" : "188px")};
  height: 24px;
  outline: none;
  border: none;
  letter-spacing: 0.57%;
  font-size: 16px;
  color: #171719;
  line-height: 150%;

  ::placeholder {
    color: #171719;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }

  &:disabled {
    background-color: #f4f4f5;
  }
`;

const Timer = styled.div`
  font-size: 16px;
  font-weight: var(--font-regular);
  letter-spacing: 0.57%;
  line-height: 150%;
  width: 43px;
  height: 24px;
  color: #c7c7c8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HiddenCertInput = styled.input``;
