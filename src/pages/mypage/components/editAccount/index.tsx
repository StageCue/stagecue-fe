import {
  requestChangeEmail,
  requestChangeEmailToken,
  requestVerifyEmailToken,
} from "@/api/users";
import Button from "@/components/buttons/button";
import useSessionStore from "@/store";
import { useState } from "react";
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

  const {
    register: emailRegister,
    handleSubmit: emailHandleSubmit,
    watch: emailWatch,
  } = useForm();

  const [emailValue, isVerifiedValue, codeValue] = emailWatch([
    "email",
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

  const handleSendEmailCodeClick = async () => {
    const { requestToken } = await requestChangeEmailToken(emailValue);
    setRequestEmailToken(requestToken);
    setIsCodeSent(true);
  };

  const handleVerifyEmailCodeClick = async () => {
    const res = await requestVerifyEmailToken(requestEmailToken, codeValue);
    console.log(res);
    if (res.updateToken) {
      setUpdateEmailToken(res.updateToken);
      setIsVerifiedCode(true);
    }
  };

  const handleChangeEmailClick = async () => {
    const res = await requestChangeEmail(updateEmailToken);
    console.log(res);
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
                <CurrentEamil>{sessionStore.email}</CurrentEamil>
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
                  <Button
                    variation="outlined"
                    btnClass="primary"
                    width={116}
                    fontSize={15}
                    lineHeight={150}
                    letterSpacing={0.57}
                    type="button"
                    onClick={handleSendEmailCodeClick}
                  >
                    전송
                  </Button>
                </ShortInputWrapper>
              )}
              {isCodeSent && (
                <VerifyInputWrapper>
                  <VerifyInput {...emailRegister("code")} />
                  <Button
                    variation="text"
                    btnClass="primary"
                    width={56}
                    height={24}
                    fontSize={15}
                    padding="0px"
                    onClick={handleVerifyEmailCodeClick}
                  >
                    인증확인
                  </Button>
                </VerifyInputWrapper>
              )}
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
        </EditEmailWrapper>
      )}
      {selectedData === "휴대폰 번호" && (
        <EditPhonNumberWrapper>
          <Text>휴대폰 번호</Text>
          <Description>인증번호는 SMS로 전송됩니다.</Description>
          <Form>
            <Inputs>
              <ShortInputWrapper>
                <ShortInput />
                <Button variation="outlined" btnClass="primary" width={140}>
                  취소
                </Button>
              </ShortInputWrapper>
              <ShortInputWrapper>
                <ShortInput placeholder="변경할 번호를 입력하세요." />
                <Button variation="outlined" btnClass="primary" width={140}>
                  인증번호 받기
                </Button>
              </ShortInputWrapper>
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

const CurrentEamil = styled.div`
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

const VerifyInputWrapper = styled.div`
  width: 355px;
  height: 48px;
  padding: 12px 16px;
  display: flex;
  border: 1px solid #70737c;
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
