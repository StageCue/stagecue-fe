import {
  requestChangeEmail,
  requestChangeEmailToken,
  requestChangePhoneToken,
  requestVerifyEmailToken,
  requestVerifyPhoneToken,
} from "@/api/users";
import Button from "@/components/buttons/button";
import useSessionStore from "@/store";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

type accountDataType = "이메일" | "휴대폰 번호";

const EditAccount = () => {
  const [selectedData, setSelectedData] = useState<accountDataType>("이메일");
  const sessionStore = useSessionStore();
  const [isChangeMail, setIsChangeMail] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [requestEmailToken, setRequestEmailToken] = useState("");
  const [updateEmailToken, setUpdateEmailToken] = useState("");
  const [isVerifiedCode, setIsVerifiedCode] = useState(false);

  const [isChangeNumber, setIsChangeNumber] = useState(false);
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false);
  const [requestPhoneToken, setRequestPhoneToken] = useState("");
  const [updatePhoneToken, setUpdatePhoneToken] = useState("");
  const [isVerifiedPhoneCode, setIsVerifiedPhoneCode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    watch: emailWatch,
  } = useForm();

  const {
    register: phoneRegister,
    handleSubmit: phoneHandleSubmit,
    watch: phoneWatch,
    setValue,
  } = useForm();

  const [emailValue, isVerifiedValue, codeValue] = emailWatch([
    "email",
    "verified",
    "code",
  ]);

  const [phoneNumberValue, isVerifiedPhoneValue, phoneCodeValue] = phoneWatch([
    "phoneNumber",
    "verified",
    "code",
  ]);

  const handleChipClick = (data: accountDataType) => {
    setSelectedData(data);
  };

  const handleChangeMailClick = () => {
    if (isChangeMail) {
      setIsChangeMail(false);
      setIsCodeSent(false);
    } else {
      setIsChangeMail(true);
    }
  };

  const handleChangePhoneClick = () => {
    if (isChangeNumber) {
      setIsChangeNumber(false);
      setIsPhoneCodeSent(false);
    } else {
      setIsChangeNumber(true);
    }
  };

  const handleSendEmailCodeClick = async () => {
    const { requestToken } = await requestChangeEmailToken(emailValue);

    if (requestToken) {
      setRequestEmailToken(requestToken);
      setIsCodeSent(true);
    }
  };

  const handleSendPhoneCodeClick = async () => {
    console.log(phoneNumberValue);
    const { requestToken } = await requestChangePhoneToken(phoneNumberValue);

    if (requestToken) {
      setRequestPhoneToken(requestToken);
      setIsPhoneCodeSent(true);
    }
  };

  const handleVerifyEmailCodeClick = async () => {
    const res = await requestVerifyEmailToken(requestEmailToken, codeValue);

    if (res.updateToken) {
      setUpdateEmailToken(res.updateToken);
      setIsVerifiedCode(true);
    }
  };

  const handleVerifyPhoneCodeClick = async () => {
    const res = await requestVerifyPhoneToken(requestPhoneToken, codeValue);

    if (res.updateToken) {
      setUpdatePhoneToken(res.updateToken);
      setIsVerifiedPhoneCode(true);
    }
  };

  const handleChangeEmailClick = async () => {
    const res = await requestChangeEmail(updateEmailToken);
    console.log(res);
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
  return (
    <EditAccountContainer>
      <Title>기본정보 변경</Title>
      <AccountData>
        <Chip
          $isSelected={selectedData === "이메일"}
          onClick={() => handleChipClick("이메일")}
        >
          이메일
        </Chip>
        <Chip
          $isSelected={selectedData === "휴대폰 번호"}
          onClick={() => handleChipClick("휴대폰 번호")}
        >
          휴대폰번호
        </Chip>
      </AccountData>
      {selectedData === "이메일" && (
        <EditEmailWrapper>
          <Text>이메일</Text>
          <Description>
            변경된 이메일은 로그인 아이디로 적용되며, 재로그인이 필요합니다.
          </Description>
          <Description>
            지원한 이력이 있는 경우, 지원 정보에도 변경된 메일이 적용됩니다.
          </Description>
          <Form>
            <Inputs>
              <ShortInputWrapper>
                <CurrentValue>{sessionStore.email}</CurrentValue>
                <Button
                  variation="outlined"
                  btnClass="primary"
                  width={116}
                  fontSize={15}
                  lineHeight={150}
                  letterSpacing={0.57}
                  onClick={handleChangeMailClick}
                >
                  {isChangeMail ? "취소" : "메일 변경"}
                </Button>
              </ShortInputWrapper>
              {isChangeMail && (
                <ShortInputWrapper>
                  <ShortInput
                    {...emailRegister("email", { required: true })}
                    placeholder="변경할 이메일을 입력하세요."
                  />
                  {isCodeSent ? (
                    <Button
                      variation="outlined"
                      btnClass="assistive"
                      width={116}
                      fontSize={15}
                      lineHeight={150}
                      letterSpacing={0.57}
                      fontWeight="var(--font-medium)"
                      type="button"
                      onClick={handleSendEmailCodeClick}
                      disabled={!emailValue}
                    >
                      재전송
                    </Button>
                  ) : (
                    <Button
                      variation="solid"
                      btnClass="primary"
                      width={116}
                      fontSize={15}
                      lineHeight={150}
                      letterSpacing={0.57}
                      type="button"
                      onClick={handleSendEmailCodeClick}
                      disabled={!emailValue}
                    >
                      전송
                    </Button>
                  )}
                </ShortInputWrapper>
              )}
              {isCodeSent && (
                <WithMessageWrapper>
                  <VerifyInputWrapper
                    $isDirty={codeValue}
                    $isError={!isVerifiedCode}
                  >
                    <VerifyInput {...emailRegister("code")} />
                    <Button
                      variation="text"
                      btnClass="primary"
                      width={56}
                      height={24}
                      fontSize={15}
                      padding="0px"
                      onClick={handleVerifyEmailCodeClick}
                      disabled={!codeValue}
                    >
                      인증확인
                    </Button>
                  </VerifyInputWrapper>
                  <Message $isSuccess={isVerifiedCode}>
                    {isVerifiedCode
                      ? "인증되었습니다."
                      : "올바르지 않은 인증번호입니다. 인증번호를 확인해주세요."}
                  </Message>
                </WithMessageWrapper>
              )}
            </Inputs>
            <Button
              type="submit"
              variation="solid"
              btnClass="primary"
              width={340}
              onClick={handleChangeEmailClick}
              disabled={!isVerifiedCode}
            >
              변경완료
            </Button>
          </Form>
        </EditEmailWrapper>
      )}
      {selectedData === "휴대폰 번호" && (
        <EditPhonNumberWrapper>
          <Text>휴대폰 번호</Text>
          <Description>인증번호는 SMS로 전송됩니다.</Description>
          <Form>
            <Inputs>
              <ShortInputWrapper>
                <CurrentValue>010-1234-5678</CurrentValue>
                <Button
                  variation="outlined"
                  btnClass="primary"
                  width={140}
                  onClick={handleChangePhoneClick}
                >
                  {isChangeNumber ? "취소" : "번호 변경"}
                </Button>
              </ShortInputWrapper>
              {isChangeNumber && (
                <ShortInputWrapper>
                  <ShortInput
                    {...phoneRegister("phoneNumber", {
                      required: true,
                      pattern: {
                        value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                      },
                    })}
                    placeholder="변경할 번호를 입력하세요."
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                  />
                  {isPhoneCodeSent ? (
                    <Button
                      variation="outlined"
                      btnClass="assistive"
                      width={140}
                      fontSize={15}
                      lineHeight={150}
                      letterSpacing={0.57}
                      fontWeight="var(--font-medium)"
                      type="button"
                      onClick={handleSendPhoneCodeClick}
                      disabled={false}
                    >
                      인증번호 재전송
                    </Button>
                  ) : (
                    <Button
                      variation="solid"
                      btnClass="primary"
                      width={140}
                      fontSize={14}
                      lineHeight={150}
                      letterSpacing={0.57}
                      fontWeight="var(--font-medium)"
                      type="button"
                      padding="12px 26px"
                      onClick={handleSendPhoneCodeClick}
                      disabled={false}
                    >
                      인증번호 받기
                    </Button>
                  )}
                </ShortInputWrapper>
              )}
              <WithMessageWrapper>
                <VerifyInputWrapper
                  $isDirty={phoneCodeValue}
                  $isError={!isVerifiedPhoneCode}
                >
                  <VerifyInput {...phoneRegister("code")} />
                  <Button
                    variation="text"
                    btnClass="primary"
                    width={56}
                    height={24}
                    fontSize={15}
                    padding="0px"
                    onClick={handleVerifyPhoneCodeClick}
                    disabled={!phoneCodeValue}
                  >
                    인증확인
                  </Button>
                </VerifyInputWrapper>
                <Message $isSuccess={isVerifiedPhoneCode}>
                  {isVerifiedPhoneCode
                    ? "인증되었습니다."
                    : "올바르지 않은 인증번호입니다. 인증번호를 확인해주세요."}
                </Message>
              </WithMessageWrapper>
            </Inputs>
            <Button
              type="submit"
              variation="solid"
              btnClass="primary"
              width={340}
            >
              변경완료
            </Button>
          </Form>
        </EditPhonNumberWrapper>
      )}
    </EditAccountContainer>
  );
};

export default EditAccount;

const EditAccountContainer = styled.div`
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
  margin-bottom: 32px;
`;

const AccountData = styled.div`
  display: flex;
  gap: 6px;
  width: 355px;
  margin-bottom: 32px;
`;

const Chip = styled.div<{ $isSelected: boolean }>`
  min-width: 72px;
  width: fit-content;
  height: 40px;
  padding: 9px 16px;
  border: 1px solid #70737c;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1000px;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? "black" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "black")};
`;

const EditEmailWrapper = styled.div`
  width: 355px;
`;

const Text = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
  margin-bottom: 12px;
`;

const Description = styled.div`
  font-weight: var(--font-medium);
  font-size: 13px;
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const Form = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 122px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CurrentValue = styled.div`
  padding: 12px 16px;
  width: 231px;
  height: 48px;
  border-radius: 10px;
  border: 1px solid #dadada;
  outline: none;
  display: flex;
  align-items: center;
  color: #dadada;
  font-weight: var(--font-regular);
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 150%;
`;

const ShortInput = styled.input`
  padding: 12px 16px;
  width: 231px;
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

const EditPhonNumberWrapper = styled.div`
  width: 355px;
`;

const VerifyInputWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 355px;
  height: 48px;
  padding: 12px 16px;
  display: flex;
  border: ${({ $isDirty, $isError }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0E2"};
  gap: 12px;
  border-radius: 10px;
`;

const VerifyInput = styled.input`
  width: 255px;
  height: 24px;
  border: none;
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

const Message = styled.div<{ $isSuccess: boolean }>`
  font-weight: var(--font-regular);
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  color: ${({ $isSuccess }) => ($isSuccess ? "#00bf40;" : "#FF4242")};
`;
