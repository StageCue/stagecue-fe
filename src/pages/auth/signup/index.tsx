import { useForm } from "react-hook-form";
import styled from "styled-components";
import { SignupInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { requestCellPhoneCertCode, requestSignup } from "@/api/auth";
import CheckboxSVG from "@assets/icons/checkbox.svg?react";
import CheckedSVG from "@assets/icons/checkbox_checked.svg?react";
import ChevronRight from "@assets/icons/chevron_right_gray_s.svg?react";
// import CalendarSVG from "@assets/icons/calendar.svg?react";

const Signup = () => {
  const navigate = useNavigate();
  const [isSentCertCode, setIsSendCertCode] = useState<boolean>(false);
  const [certTime, setCertTime] = useState<number>(300);
  const [certCode, setCertCode] = useState<string>("");
  // const [isCertificated, setIsCertificagted] = useState<false>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAllAgree, setIsAllAgree] = useState(false);

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
    certificatedValue,
    genderValue,
    passwordValue,
    confirmPasswordValue,
    ageCheckValue,
    agreeServicePolicyValue,
    agreePrivatePolicyValue,
  ] = watch([
    "email",
    "name",
    "phoneNumber",
    "certificated",
    "gender",
    "password",
    "confirmPassword",
    "ageCheck",
    "agreeServicePolicy",
    "agreePrivatePolicy",
  ]);

  const isAllInputHasValue = useMemo(() => {
    return (
      emailValue &&
      nameValue &&
      phoneNumberValue &&
      certificatedValue &&
      genderValue &&
      passwordValue &&
      confirmPasswordValue &&
      ageCheckValue &&
      agreeServicePolicyValue &&
      agreePrivatePolicyValue
    );
  }, [
    emailValue,
    nameValue,
    phoneNumberValue,
    certificatedValue,
    genderValue,
    passwordValue,
    confirmPasswordValue,
    ageCheckValue,
    agreeServicePolicyValue,
    agreePrivatePolicyValue,
  ]);

  const onSubmitSignup = async (data: SignupInputs) => {
    setValue("certificated", true);

    const { email, name, phoneNumber, password, birthday, gender } = data;

    const userData = {
      username: name,
      email,
      cell: phoneNumber,
      password,
      birthday,
      gender,
      terms: true,
    };
    const res = await requestSignup(userData);

    if (res.data) {
      navigate("/welcome");
    }
  };

  const handleGenderClick = (gender: string) => {
    setValue("gender", gender);
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

  const handleAllAgreeClick = () => {
    setIsAllAgree((prev) => {
      if (prev) {
        setValue("ageCheck", false);
        setValue("agreePrivatePolicy", false);
        setValue("agreeServicePolicy", false);
      } else {
        setValue("ageCheck", true);
        setValue("agreePrivatePolicy", true);
        setValue("agreeServicePolicy", true);
      }
      return !prev;
    });
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, ""); // 원시 데이터를 위한 숫자만 추출
    setPhoneNumber(formatPhoneNumber(event.target.value)); // 포맷된 번호를 상태로 설정
    setValue("phoneNumber", rawValue); // 폼에 원시 값을 설정
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleAgeCheckClick = () => {
    if (ageCheckValue) {
      setValue("ageCheck", false);
    } else {
      setValue("ageCheck", true);
    }
  };

  const handleServicePolicyClick = () => {
    if (agreeServicePolicyValue) {
      setValue("agreeServicePolicy", false);
    } else {
      setValue("agreeServicePolicy", true);
    }
  };

  const handlePrivatePolicyClick = () => {
    if (agreePrivatePolicyValue) {
      setValue("agreePrivatePolicy", false);
    } else {
      setValue("agreePrivatePolicy", true);
    }
  };

  const handleCertInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCertCode(event.target.value);
  };

  const handleVerifyCertCodeClick = () => {
    ("");
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

  useEffect(() => {
    if (ageCheckValue && agreePrivatePolicyValue && agreeServicePolicyValue) {
      setIsAllAgree(true);
    }
  }, [ageCheckValue, agreePrivatePolicyValue, agreeServicePolicyValue]);

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <SignupForm onSubmit={handleSubmit(onSubmitSignup)}>
        <Inputs>
          <InputWrapper>
            <RequiredLabel>
              이메일
              <RequiedRedDot />
            </RequiredLabel>
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
            <RequiredLabel>
              이름
              <RequiedRedDot />
            </RequiredLabel>
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
            <RequiredLabel>
              휴대폰번호
              <RequiedRedDot />
            </RequiredLabel>
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
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
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
                  onChange={(event) => handleCertInputChange(event)}
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
            <RequiredLabel>
              생년월일
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper>
              <WithIconHalfInput
                {...register("birthday", {
                  required: true,
                })}
                placeholder="YYYY.MM.DD"
                type="date"
              />
              {/* <CalendarSVG /> */}
            </WithIconInputWrapper>
          </InputWrapper>
          <InputWrapper>
            <Label>성별</Label>
            <GenderButtonWrapper>
              <GenderButton
                onClick={() => handleGenderClick("male")}
                $isSelected={genderValue === "male"}
              >
                남성
              </GenderButton>
              <GenderButton
                onClick={() => handleGenderClick("female")}
                $isSelected={genderValue === "female"}
              >
                여성
              </GenderButton>
            </GenderButtonWrapper>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              비밀번호
              <RequiedRedDot />
            </RequiredLabel>
            <Input
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 24,
              })}
              placeholder="비밀번호를 입력해주세요"
              $isError={Boolean(errors.password?.message)}
              $isDirty={Boolean(passwordValue)}
              onBlur={() => trigger("password")}
            />
            <ValidationGuide>
              영문 대소문자, 숫자, 특수문자를 포함해 8~24자로 입력해주세요.
            </ValidationGuide>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              비밀번호 확인
              <RequiedRedDot />
            </RequiredLabel>
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
            <CheckboxInputWrapper onClick={handleAllAgreeClick}>
              <CheckboxWrapper>
                {isAllAgree ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>전체 동의</CheckboxLabel>
              </CheckboxWrapper>
            </CheckboxInputWrapper>
            <Divder />
            <CheckboxInputWrapper onClick={handleAgeCheckClick}>
              <CheckboxWrapper>
                {ageCheckValue ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>
                  만 14세 이상입니다 <RequiredText>(필수)</RequiredText>
                </CheckboxLabel>
              </CheckboxWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("ageCheck", { required: true })}
              />
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxWrapper onClick={handleServicePolicyClick}>
                {agreeServicePolicyValue ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>
                  스테이지큐 이용약관 동의 <RequiredText>(필수)</RequiredText>
                </CheckboxLabel>
              </CheckboxWrapper>
              <IconWrapper>
                <ChevronRight />
              </IconWrapper>
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxWrapper onClick={handlePrivatePolicyClick}>
                {agreePrivatePolicyValue ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>
                  스테이지큐 개인정보 수집 및 이용 동의
                  <RequiredText>(필수)</RequiredText>
                </CheckboxLabel>
              </CheckboxWrapper>
              <IconWrapper>
                <ChevronRight />
              </IconWrapper>
            </CheckboxInputWrapper>
          </AgreeWrapper>
        </Inputs>
        <Button
          type="submit"
          variation="solid"
          btnClass="primary"
          width={340}
          disabled={!isAllInputHasValue}
        >
          회원가입
        </Button>
        <CheckboxInput
          type="checkbox"
          {...register("certificated", { required: true, value: true })}
        />
        <CheckboxInput
          type="checkbox"
          {...register("agreeServicePolicy", { required: true })}
        />
        <CheckboxInput
          type="checkbox"
          {...register("agreePrivatePolicy", { required: true })}
        />
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
  margin-bottom: 138px;
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

  &::placeholder {
    color: #dadada;
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

  &::placeholder {
    color: #dadada;
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
  display: flex;
  gap: 4px;
`;

const RequiredLabel = styled.div`
  position: relative;
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #171719;
`;

const RequiedRedDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #b81716;
  border-radius: 50%;
  position: absolute;
  left: -2px;
  top: -2px;
`;

const ValidationGuide = styled.div`
  width: 340px;
  height: 36px;
  margin-top: 8px;
  color: #c7c7c8;
  font-size: 13px;
  line-height: 138%.5;
  letter-spacing: 1.94%;
`;

const Divder = styled.div`
  width: 338px;
  height: 1px;
  background-color: #e1e2e4;
`;

const CheckboxInput = styled.input`
  visibility: hidden;
  height: 0px;
  width: 0px;
`;

const CheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  gap: 4px;
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
  // $isError: boolean;
  // $isDirty: boolean;
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

  &::placeholder {
    color: #dadada;
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

const WithIconInputWrapper = styled.div`
  width: 340px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  gap: 12px;
  border: 1px solid #e0e0e2;
`;

const WithIconHalfInput = styled.input`
  width: 272px;
  height: 24px;
  border: none;
  outline: none;

  &::placeholder {
    color: #dadada;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const GenderButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const GenderButton = styled.div<{ $isSelected: boolean }>`
  width: 164px;
  height: 48px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#b81716" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "#dfdfe0")};
  border: ${({ $isSelected }) => ($isSelected ? "none" : "1px solid #dfdfe0")};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: var(--font-semibold);
  cursor: pointer;
`;

const RequiredText = styled.div`
  color: #b81716;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  gap: 4px;
  cursor: pointer;
`;

const CheckboxLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 340px;
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
  color: #171719;
  font-weight: var(--font-regualr);
  width: fit-content;
`;

const IconWrapper = styled.div``;
