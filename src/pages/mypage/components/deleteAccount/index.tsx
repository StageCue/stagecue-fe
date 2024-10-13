import Button from "@/components/buttons/button";
import styled from "styled-components";
import RadioSVG from "@/assets/icons/radio.svg?react";
import RadioCheckedSVG from "@/assets/icons/radio_checked.svg?react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  requestDeleteAccount,
  requestDeleteAccountToken,
  requestVerifyDeleteAccount,
} from "@/api/users";

interface DeleteAccountInputs {
  email: string;
  code: string;
  isAgreed: boolean;
}

const DeleteAccount = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [emailRequestToken, setEmailRequestToken] = useState("");
  const [deleteUpdateToken, setDeleteUpdateToken] = useState("");
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    setError,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm<DeleteAccountInputs>();

  const handleCheckboxClick = () => {
    if (isVerified) {
      const isAgreed = getValues("isAgreed");
      if (isAgreed) {
        setValue("isAgreed", false);
      } else {
        setValue("isAgreed", true);
      }
    }
  };

  const handleSendEmailClick = async () => {
    const email = getValues("email");
    console.log(email);
    const { requestToken } = await requestDeleteAccountToken(email);

    if (requestToken) {
      setEmailRequestToken(requestToken);
      setIsCodeSent(true);
    }
  };

  const handleVerifyEmail = async () => {
    const code = getValues("code");
    const res = await requestVerifyDeleteAccount(emailRequestToken, code);

    if (res.updateToken) {
      setDeleteUpdateToken(res.updateToken);
      setIsVerified(true);
      clearErrors("code");
    } else {
      setError("code", {
        type: "verify",
        message: "인증번호가 일치하지 않습니다.",
      });
    }
  };

  const onSubmitDeleteAccout = async () => {
    const res = await requestDeleteAccount(
      getValues("isAgreed"),
      deleteUpdateToken
    );

    return res;
  };

  return (
    <DeleteAccountContainer>
      <Title>계정 탈퇴</Title>
      <Instruction>
        <Caution>회원 탈퇴 전, 안내 사항을 꼭 확인해주세요.</Caution>
        <Articles>
          <Paragraph>
            <Article>1. 탈퇴 아이디 복구 불가</Article>
            <Description>
              탈퇴 후에는 아이디와 데이터 복구가 불가능합니다.
            </Description>
            <Description>신중하게 선택해주세요.</Description>
          </Paragraph>
          <Paragraph>
            <Article>2. 서비스 이용 기록 삭제</Article>
            <Description>
              프로필 등록 정보, 지원 정보, 지원 현황에 대한 서비스 이용기록이 모
            </Description>
            <Description>
              두 삭제되며, 삭제된 데이터는 복구되지 않습니다.
            </Description>
            <Description>
              필요한 데이터는 미리 백업을 해두시기 바랍니다.
            </Description>
          </Paragraph>
        </Articles>
      </Instruction>
      <Paragraph>
        <Article>본인 확인</Article>
        <Description>본인 확인을 위해 이메일 인증을 완료해주세요.</Description>
      </Paragraph>
      <Form onSubmit={handleSubmit(onSubmitDeleteAccout)}>
        <Inputs>
          <Label>이메일</Label>
          <ShortInputWrapper>
            <ShortInput
              $isDirty={Boolean(dirtyFields.email)}
              {...register("email", { required: true })}
              placeholder="사용중인 이메일을 입력하세요."
            />
            {isCodeSent ? (
              <Button
                variation="outlined"
                btnClass="assistive"
                width={116}
                onClick={handleSendEmailClick}
                disabled={!dirtyFields.email}
                type="button"
              >
                재전송
              </Button>
            ) : (
              <Button
                variation="solid"
                btnClass="primary"
                width={116}
                onClick={handleSendEmailClick}
                disabled={!dirtyFields.email}
                type="button"
              >
                전송
              </Button>
            )}
          </ShortInputWrapper>
          {isCodeSent && (
            <WithMessageWrapper>
              <VerifyInputWrapper
                $isDirty={Boolean(dirtyFields.code)}
                $isError={!isVerified && Boolean(dirtyFields.code)}
              >
                <VerifyInput {...register("code")} />
                <Button
                  variation="text"
                  btnClass="primary"
                  width={56}
                  height={24}
                  fontSize={15}
                  padding="0px"
                  onClick={handleVerifyEmail}
                  disabled={!dirtyFields.code}
                >
                  인증확인
                </Button>
              </VerifyInputWrapper>
              <Message $isSuccess={isVerified}>
                {errors.code &&
                  !isVerified &&
                  "올바르지 않은 인증번호입니다. 인증번호를 확인해주세요."}
                {isVerified && "인증되었습니다."}
              </Message>
            </WithMessageWrapper>
          )}
        </Inputs>
        <CheckboxInputWrapper onClick={handleCheckboxClick}>
          {getValues("isAgreed") ? <RadioCheckedSVG /> : <RadioSVG />}
          <CheckboxLabel>
            안내 사항을 모두 확인했으며, 이에 동의합니다.
          </CheckboxLabel>
        </CheckboxInputWrapper>
        <Button
          variation="solid"
          btnClass="primary"
          width={340}
          disabled={!isVerified}
        >
          탈퇴하기
        </Button>
      </Form>
    </DeleteAccountContainer>
  );
};

export default DeleteAccount;

const DeleteAccountContainer = styled.div`
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

const Instruction = styled.div`
  width: 355px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f3f3f3;
`;

const Caution = styled.div`
  font-weight: var(--font-medium);
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  margin-bottom: 28px;
`;

const Article = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-weight: var(--font-medium);
  font-size: 13px;
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const Articles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Paragraph = styled.div`
  width: 355px;
`;

const Form = styled.div`
  width: 355px;
  margin-top: 28px;
`;

const Label = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
`;

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ShortInput = styled.input<{ $isDirty: boolean }>`
  padding: 12px 16px;
  width: 231px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isDirty }) =>
    $isDirty ? "1px solid #000000" : "1px solid #e0e0E2"};
  outline: none;

  ::placeholder {
    color: #171719;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const CheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 106.33px;
  gap: 4px;
  margin-bottom: 34px;
  width: fit-content;
  cursor: pointer;
`;

const CheckboxLabel = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
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

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
