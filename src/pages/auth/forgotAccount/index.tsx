import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ForgotAccountInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";
import { ChangeEvent, useEffect, useState } from "react";
import {
  requestFindAccount,
  requestFindAccountCode,
  requestVerifyFindAccountCode,
} from "@/api/auth";

const ForgotAccount = () => {
  const [isSentCode, setIsSentCode] = useState(false);
  const [certTime, setCertTime] = useState<number>(300);
  const [certCode, setCertCode] = useState<string>("");
  const [findAccountToken, setFindAccountToken] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foundAccount, setFoundAccount] = useState("");
  const [isFound, setIsFound] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, dirtyFields },
    setError,
    trigger,
  } = useForm<ForgotAccountInputs>();

  const [phoneNumberValue, certificatedValue] = watch([
    "phoneNumber",
    "certificated",
  ]);

  const handleSendCodeClick = async () => {
    const res = await requestFindAccountCode({
      phoneNumber: phoneNumberValue,
    });
    setCertTime(300);
    setIsSentCode(true);
  };

  const handleVerifyClick = async () => {
    const res = await requestVerifyFindAccountCode({
      phoneNumber: phoneNumberValue,
      token: certCode,
    });

    if (res) {
      console.log(res);
      setValue("certificated", true);
      setFindAccountToken(res.findAccountToken);
    } else {
      setError("certificated", {
        type: "verify",
        message: "인증번호를 확인해주세요.",
      });
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleCertInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCertCode(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, "");
    setPhoneNumber(formatPhoneNumber(event.target.value));
    setValue("phoneNumber", rawValue);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = ("" + value).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const onSubmitFindAccount = async () => {
    const res = await requestFindAccount({ findAccountToken });
    console.log(res);
    setFoundAccount(res.email);
  };

  useEffect(() => {
    if (certTime === 0 || !isSentCode) return;

    const timer = setInterval(() => {
      setCertTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [certTime, isSentCode]);

  return (
    <ForgotAccountContainer>
      <TitleWrapper>
        <Title>계정 찾기</Title>
        {!foundAccount && (
          <Description>
            회원 가입시 인증했던 전화번호를 입력해주세요.
          </Description>
        )}
      </TitleWrapper>
      {!foundAccount && (
        <Form onSubmit={handleSubmit(onSubmitFindAccount)}>
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
                onChange={handlePhoneNumberChange}
                $isError={Boolean(errors.phoneNumber?.message)}
                $isDirty={Boolean(dirtyFields.phoneNumber)}
                value={phoneNumber}
                onBlur={() => trigger("phoneNumber")}
              />
              <Button
                variation="solid"
                btnClass="primary"
                width={140}
                padding="12px 20px"
                fontSize={15}
                type="button"
                disabled={
                  Boolean(!phoneNumberValue) || Boolean(errors.phoneNumber)
                }
                onClick={handleSendCodeClick}
              >
                {isSentCode ? "인증번호 재전송" : "인증번호 받기"}
              </Button>
            </ShortInputWrapper>
            <WithCertInputWrapper>
              <VerifyWrapper>
                <CertInputWrapper
                  $isError={false}
                  $isDirty={isSentCode}
                  $isDisabled={!isSentCode}
                >
                  <CertInput
                    {...register("certCode", { required: true })}
                    placeholder={isSentCode ? "" : "인증번호를 입력해주세요"}
                    $isSentCode={isSentCode}
                    disabled={!isSentCode}
                    name="certCode"
                    type="text"
                    onChange={(event) => handleCertInputChange(event)}
                  />
                  {isSentCode && !certificatedValue ? (
                    <Timer>{formatTime(certTime)}</Timer>
                  ) : null}
                </CertInputWrapper>
                <Button
                  variation="solid"
                  btnClass="primary"
                  disabled={certCode.length === 0 || certificatedValue}
                  width={112}
                  height={48}
                  fontSize={16}
                  padding="12px 28px"
                  onClick={handleVerifyClick}
                  type="button"
                >
                  인증확인
                </Button>
              </VerifyWrapper>
              <InputError>{errors.certificated?.message}</InputError>
              {certificatedValue && <SuccessCert>인증되었습니다.</SuccessCert>}
            </WithCertInputWrapper>
          </InputWrapper>
          <Button
            variation="solid"
            btnClass="primary"
            width={340}
            disabled={!certificatedValue}
          >
            계속
          </Button>
        </Form>
      )}
      {foundAccount && <FoundAccountBox>{foundAccount}</FoundAccountBox>}
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

const TitleWrapper = styled.div`
  margin-top: 219px;
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
  font-weight: var(--font-medium);
  font-size: 13px;
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const Form = styled.form``;

const Label = styled.label`
  color: #171719;
  font-weight: var(--font-semibold);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 8px;
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

const WithCertInputWrapper = styled.div`
  gap: 8px;
`;

const VerifyWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const CertInputWrapper = styled.div<{
  $isDisabled: boolean;
  $isError: boolean;
  $isDirty: boolean;
}>`
  padding: 12px 16px;
  width: 220px;
  height: 48px;
  background-color: ${({ $isDisabled }) => ($isDisabled ? "#f4f4f5;" : "none")};
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

const InputError = styled.div`
  color: #ff4242;
  font-size: 13px;
  font-weight: var(--font-regular);
  letter-spacing: 1.94%;
  letter-spacing: 138.5%;
`;

const SuccessCert = styled.div`
  color: #00bf40;
  font-size: 13px;
  font-weight: var(--font-regular);
  letter-spacing: 1.94%;
  letter-spacing: 138.5%;
`;

const FoundAccountBox = styled.div`
  width: 520px;
  height: 164px;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #f7f7f8;
`;

const TextWrapper = styled.div``;

const MainText = styled.div``;

const SubText = styled.div``;

const Divder = styled.div``;

const AccountText = styled.div``;
