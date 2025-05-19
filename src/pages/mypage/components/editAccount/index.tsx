import {
  requestChangeEmail,
  requestChangeEmailToken,
  requestChangePhone,
  requestChangePhoneToken,
  requestVerifyEmailToken,
  requestVerifyPhoneToken,
} from '@/api/users';
import Button from '@/components/buttons/button';
import Overlay from '@/components/modal/overlay';
import ModalPortal from '@/components/modal/portal';
import useSessionStore from '@/store/session';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

type accountDataType = '이메일' | '휴대폰 번호';

const EditAccount = ({ accountType }: { accountType?: accountDataType }) => {
  const [selectedData, setSelectedData] = useState<accountDataType>(accountType ?? '이메일');
  const sessionStore = useSessionStore();
  const [isChangeMail, setIsChangeMail] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [certTime, setCertTime] = useState<number>(300);
  const [updateEmailToken, setUpdateEmailToken] = useState('');
  const [isVerifiedCode, setIsVerifiedCode] = useState(false);
  const [isErrorEmailVerify, setIsErrorEmailVerify] = useState(false);
  const [isChangeConfirmed, setIsChangeConfirmed] = useState(false);

  const [isChangeNumber, setIsChangeNumber] = useState(false);
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false);
  const [updatePhoneToken, setUpdatePhoneToken] = useState('');
  const [isVerifiedPhoneCode, setIsVerifiedPhoneCode] = useState(false);
  const [isErrorPhoneVerify, setIsErrorPhoneVerify] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const { register: emailRegister, handleSubmit: emailHandleSubmit, watch: emailWatch } = useForm();

  const {
    register: phoneRegister,
    handleSubmit: phoneHandleSubmit,
    watch: phoneWatch,
    setValue,
  } = useForm();

  const [emailValue, codeValue] = emailWatch(['email', 'code']);

  const [phoneNumberValue, phoneCodeValue] = phoneWatch(['phoneNumber', 'code']);

  const handleChipClick = (data: accountDataType) => {
    setSelectedData(data);
    resetStates();
  };

  const resetStates = () => {
    setIsChangeMail(false);
    setIsCodeSent(false);
    setUpdateEmailToken('');
    setIsVerifiedCode(false);
    setIsErrorEmailVerify(false);

    setIsChangeNumber(false);
    setIsPhoneCodeSent(false);
    setUpdatePhoneToken('');
    setIsVerifiedPhoneCode(false);
    setIsErrorPhoneVerify(false);
    setPhoneNumber('');
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
    const { result, error } = await requestChangeEmailToken({ changeEmail: emailValue });

    if (error) {
      alert(error.element?.message?.resolved);
      return;
    }

    if (result) {
      setIsCodeSent(true);
      setCertTime(300);
    }
  };

  const handleSendPhoneCodeClick = async () => {
    const { result, error } = await requestChangePhoneToken({
      changePhoneNumber: phoneNumberValue.replace(/-/g, ''),
    });

    if (error) {
      alert(error);
      return;
    }

    if (result) {
      setIsPhoneCodeSent(true);
      setCertTime(300);
    }
  };

  const handleVerifyEmailCodeClick = async () => {
    const { result: token } = await requestVerifyEmailToken(emailValue, codeValue);

    if (token) {
      setUpdateEmailToken(token);
      setIsVerifiedCode(true);
      setIsErrorEmailVerify(false);
      setCertTime(0);
    } else {
      setIsErrorEmailVerify(true);
    }
  };

  const handleVerifyPhoneCodeClick = async () => {
    const { result: token } = await requestVerifyPhoneToken(
      phoneNumberValue.replace(/-/g, ''),
      phoneCodeValue
    );

    if (token) {
      setUpdatePhoneToken(token);
      setIsVerifiedPhoneCode(true);
      setIsErrorPhoneVerify(false);
      setCertTime(0);
    } else {
      setIsErrorPhoneVerify(true);
    }
  };

  const handleEmailSubmitClick = async () => {
    const res = await requestChangeEmail({ email: emailValue, token: updateEmailToken });

    if (!res?.error) {
      setIsChangeConfirmed(true);
    }
  };

  const handlePhoneSubmitClick = async () => {
    const res = await requestChangePhone({
      phoneNumber: phoneNumberValue.replace(/-/g, ''),
      token: updatePhoneToken,
    });

    if (!res?.error) {
      setIsChangeConfirmed(true);
    }
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    setPhoneNumber(formatPhoneNumber(event.target.value));
    setValue('phoneNumber', rawValue);
  };

  const handleLogoutClick = () => {
    sessionStore.logoutSession();
    setIsChangeConfirmed(false);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    if (certTime === 0) return;

    const timer = setInterval(() => {
      setCertTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [certTime, isCodeSent, isPhoneCodeSent]);

  return (
    <EditAccountContainer>
      <Title>기본정보 변경</Title>
      <AccountData>
        <Chip $isSelected={selectedData === '이메일'} onClick={() => handleChipClick('이메일')}>
          이메일
        </Chip>
        <Chip
          $isSelected={selectedData === '휴대폰 번호'}
          onClick={() => handleChipClick('휴대폰 번호')}
        >
          휴대폰번호
        </Chip>
      </AccountData>
      {selectedData === '이메일' && (
        <EditEmailWrapper>
          <Text>이메일</Text>
          <Description>
            변경된 이메일은 로그인 아이디로 적용되며, 재로그인이 필요합니다.
          </Description>
          <Description>
            지원한 이력이 있는 경우, 지원 정보에도 변경된 메일이 적용됩니다.
          </Description>
          <Form onSubmit={emailHandleSubmit(handleEmailSubmitClick)}>
            <Inputs>
              <ShortInputWrapper>
                <CurrentValue>{sessionStore.email}</CurrentValue>
                <Button
                  type="button"
                  variation="outlined"
                  btnClass="primary"
                  width={116}
                  fontSize={15}
                  lineHeight={150}
                  letterSpacing={0.57}
                  onClick={handleChangeMailClick}
                >
                  {isChangeMail ? '취소' : '메일 변경'}
                </Button>
              </ShortInputWrapper>
              {isChangeMail && (
                <ShortInputWrapper>
                  <ShortInput
                    {...emailRegister('email', { required: true })}
                    placeholder="변경할 이메일을 입력하세요."
                  />
                  {isCodeSent ? (
                    <Button
                      type="button"
                      variation="outlined"
                      btnClass="assistive"
                      width={116}
                      fontSize={15}
                      lineHeight={150}
                      letterSpacing={0.57}
                      fontWeight="var(--font-medium)"
                      onClick={handleSendEmailCodeClick}
                      disabled={!emailValue}
                    >
                      재전송
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variation="solid"
                      btnClass="primary"
                      width={116}
                      fontSize={15}
                      lineHeight={150}
                      letterSpacing={0.57}
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
                  <VerifyInputWrapper $isDirty={codeValue} $isError={!isVerifiedCode}>
                    <InputWrapper>
                      <VerifyInput {...emailRegister('code')} />
                      {isCodeSent && <Timer>{formatTime(certTime)}</Timer>}
                    </InputWrapper>

                    <Button
                      type="button"
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
                    {isErrorEmailVerify &&
                      !isVerifiedCode &&
                      '올바르지 않은 인증번호입니다. 인증번호를 확인해주세요.'}
                    {isVerifiedCode && '인증되었습니다.'}
                  </Message>
                </WithMessageWrapper>
              )}
            </Inputs>
            <Button
              type="submit"
              variation="solid"
              btnClass="primary"
              width={340}
              disabled={!isVerifiedCode}
            >
              변경완료
            </Button>
          </Form>
        </EditEmailWrapper>
      )}
      {selectedData === '휴대폰 번호' && (
        <EditPhonNumberWrapper>
          <Text>휴대폰 번호</Text>
          <Description>인증번호는 SMS로 전송됩니다.</Description>
          <Form onSubmit={phoneHandleSubmit(handlePhoneSubmitClick)}>
            <Inputs>
              <ShortInputWrapper>
                <CurrentValue>{sessionStore.phoneNumber}</CurrentValue>
                <Button
                  type="button"
                  variation="outlined"
                  btnClass="primary"
                  width={140}
                  onClick={handleChangePhoneClick}
                >
                  {isChangeNumber ? '취소' : '번호 변경'}
                </Button>
              </ShortInputWrapper>
              {isChangeNumber && (
                <ShortInputWrapper>
                  <ShortInput
                    {...phoneRegister('phoneNumber', {
                      required: true,
                      pattern: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                    })}
                    placeholder="변경할 번호를 입력하세요."
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                  />
                  {isPhoneCodeSent ? (
                    <Button
                      type="button"
                      variation="outlined"
                      btnClass="assistive"
                      width={140}
                      fontSize={14}
                      lineHeight={150}
                      letterSpacing={0.57}
                      fontWeight="var(--font-medium)"
                      padding="13px 22px"
                      onClick={handleSendPhoneCodeClick}
                      disabled={false}
                    >
                      재전송
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variation="solid"
                      btnClass="primary"
                      width={140}
                      fontSize={14}
                      lineHeight={150}
                      letterSpacing={0.57}
                      fontWeight="var(--font-medium)"
                      padding="12px 26px"
                      onClick={handleSendPhoneCodeClick}
                      disabled={false}
                    >
                      인증번호 받기
                    </Button>
                  )}
                </ShortInputWrapper>
              )}
              {isPhoneCodeSent && (
                <WithMessageWrapper>
                  <VerifyInputWrapper $isDirty={phoneCodeValue} $isError={isErrorPhoneVerify}>
                    <InputWrapper>
                      <VerifyInput {...phoneRegister('code')} />
                      {isPhoneCodeSent && <Timer>{formatTime(certTime)}</Timer>}
                    </InputWrapper>
                    <Button
                      type="button"
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
                    {isErrorPhoneVerify &&
                      !isVerifiedPhoneCode &&
                      '올바르지 않은 인증번호입니다. 인증번호를 확인해주세요.'}
                    {isVerifiedPhoneCode && '인증되었습니다.'}
                  </Message>
                </WithMessageWrapper>
              )}
            </Inputs>
            <Button type="submit" variation="solid" btnClass="primary" width={340}>
              변경완료
            </Button>
          </Form>
        </EditPhonNumberWrapper>
      )}
      {isChangeConfirmed && (
        <ModalPortal>
          <Overlay>
            <ChangeConfirmedModal>
              <ModalContent>
                <ModalTitle>
                  {selectedData === '이메일' ? '이메일 변경 완료' : ' 휴대폰번호 변경 완료'}
                </ModalTitle>
                <ModalSubTitle>
                  <div>
                    {selectedData === '이메일'
                      ? '이메일 변경이 완료되었습니다.'
                      : '휴대폰번호 변경이 완료되었습니다.'}{' '}
                  </div>
                  <div>재로그인후 이용해주세요.</div>
                </ModalSubTitle>
              </ModalContent>
              <Button
                type="button"
                variation="solid"
                btnClass="primary"
                width={300}
                height={48}
                onClick={handleLogoutClick}
              >
                로그인 화면으로 이동
              </Button>
            </ChangeConfirmedModal>
          </Overlay>
        </ModalPortal>
      )}
    </EditAccountContainer>
  );
};

export default EditAccount;

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
  background-color: ${({ $isSelected }) => ($isSelected ? 'black' : 'white')};
  color: ${({ $isSelected }) => ($isSelected ? 'white' : 'black')};
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

const Form = styled.form`
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
  display: grid;
  grid-template-columns: calc(100% - 56px - 12px) 56px;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
  gap: 12px;
  border-radius: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  color: ${({ $isSuccess }) => ($isSuccess ? '#00bf40;' : '#FF4242')};
`;

const ChangeConfirmedModal = styled.div`
  width: 340px;
  height: fit-content;
  min-height: 200px;
  padding: 24px 20px;

  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;

  background: var(--Background-Normal-Normal, #ffffffff);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
`;

const ModalTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  text-align: center;
  vertical-align: middle;
  color: #171719ff;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalSubTitle = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
  text-align: center;
  vertical-align: middle;
  color: #2e2f33e0;
`;
