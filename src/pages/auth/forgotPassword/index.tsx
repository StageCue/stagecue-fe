import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ForgotPasswordInput } from '../../../types/user';
import Button from '../../../components/buttons/button';
import { requestResetPasswordEmail, requestResetPasswordFromMail } from '@/api/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HideSVG from '@assets/icons/hide.svg?react';
import ShowSVG from '@assets/icons/show.svg?react';
import Lottie from 'react-lottie';
import AppliedGIF from '@assets/images/appliedLottie.json';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm<ForgotPasswordInput>();
  const [isSentEmail, setIsSentEmail] = useState(false);
  const [foundAccount, setFoundAccount] = useState<boolean>(true);
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [emailValue, tokenValue, newPasswordValue] = watch(['email', 'token', 'newPassowrd']);

  const onSubmitEmail = async (data: ForgotPasswordInput) => {
    setIsSentEmail(true);
    const { result, error } = await requestResetPasswordEmail(data.email);

    if (result) {
      return;
    }

    if (error) {
      setFoundAccount(false);
      return;
    }
  };

  const handleChangePassword = async () => {
    const { result, error } = await requestResetPasswordFromMail({
      email: emailValue,
      newPassword: newPasswordValue,
      token: tokenValue.split('token=')?.[1],
    });

    if (result) {
      setIsChangePassword(true);
    }

    if (error) {
      setIsChangePassword(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/auth/starting');
  };

  const handleRetryClick = () => {
    setValue('email', '');
    setIsSentEmail(false);
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue?.length > 0 && !emailRegex.test(emailValue)) {
      setError('email', {
        type: 'validate',
        message: '올바른 이메일을 입력해주세요.',
      });
    } else {
      clearErrors('email');
    }
  }, [emailValue]);

  const handleHidePasswordClick = () => {
    setIsPasswordHidden(prev => !prev);
  };

  return (
    <ResetPasswordContainer>
      <TitleWrapper>
        <Title>비밀번호 재설정</Title>
        {foundAccount && !isChangePassword && (
          <Description>
            {!isSentEmail
              ? '비밀번호 재설정을 진행할 계정의 이메일을 입력해주세요.'
              : `비밀번호 재설정을 위한 이메일을 아래의 메일로 전송했어요.\n이메일이 오지 않았다면, 스팸메일함 또는 메일주소를 확인해주세요.`}
          </Description>
        )}
      </TitleWrapper>

      {isChangePassword ? (
        <ChangePasswordCompleteContainer>
          <Lottie
            width={150}
            height={150}
            options={{
              loop: true,
              autoplay: true,
              animationData: AppliedGIF,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
          />
          <ChangePasswordMessage>비밀번호 변경 완료</ChangePasswordMessage>
          <Button
            variation="solid"
            btnClass="primary"
            width={340}
            height={48}
            padding="12px"
            lineHeight={150}
            fontSize={16}
            letterSpacing={0.57}
            fontWeight="var(--font-semibold)"
            onClick={() => navigate('/auth/login')}
          >
            로그인 하러가기
          </Button>
        </ChangePasswordCompleteContainer>
      ) : (
        <>
          {!isSentEmail ? (
            <Form onSubmit={handleSubmit(onSubmitEmail)}>
              <InputWrapper>
                <Label>이메일</Label>
                <Input
                  type="email"
                  $isError={!!errors?.email?.message}
                  {...register('email', {
                    required: true,
                  })}
                  placeholder="stagecue@example.com"
                />
                <Message $isSuccess={!errors?.email?.message}>{errors?.email?.message}</Message>
              </InputWrapper>
              <Button
                variation="solid"
                btnClass="primary"
                width={340}
                disabled={!emailValue || !!errors?.email?.message}
              >
                비밀번호 변경
              </Button>
            </Form>
          ) : (
            <>
              {!foundAccount ? (
                <>
                  <NotFoundBox>
                    <TextWrapper>
                      <MainText>가입되어 있는 계정이 없어요.</MainText>
                      <SubText>다른 전화번호로 시도해주시거나 새로 가입해주세요.</SubText>
                    </TextWrapper>
                  </NotFoundBox>
                  <Button
                    btnClass="primary"
                    variation="outlined"
                    width={340}
                    height={48}
                    padding="12px"
                    lineHeight={150}
                    fontSize={16}
                    letterSpacing={0.57}
                    fontWeight="var(--font-semibold)"
                    onClick={handleRetryClick}
                  >
                    다시찾기
                  </Button>
                  <BtnWrapper>
                    <Button
                      btnClass="primary"
                      variation="solid"
                      width={340}
                      height={48}
                      padding="12px"
                      lineHeight={150}
                      fontSize={16}
                      letterSpacing={0.57}
                      fontWeight="var(--font-semibold)"
                      onClick={handleSignupClick}
                    >
                      회원가입
                    </Button>
                  </BtnWrapper>
                </>
              ) : (
                <>
                  <AccountBox>{emailValue}</AccountBox>
                  <InputWrapper>
                    <Label>이메일 URL</Label>
                    <Input
                      type="token"
                      $isError={!!errors?.token?.message}
                      {...register('token', {
                        required: true,
                      })}
                      placeholder="https://stagecue.co.kr/auth/find-password?token=abcdefg"
                    />
                    <Message $isSuccess={!errors?.token?.message}>{errors?.email?.message}</Message>
                  </InputWrapper>
                  <InputWrapper>
                    <Label>새로운 비밀번호</Label>
                    <PasswordInputWrapper
                      $isDirty={Boolean(newPasswordValue)}
                      $isError={Boolean(errors.root)}
                    >
                      <PasswordInput
                        {...register('newPassowrd', {
                          required: true,
                        })}
                        placeholder="비밀번호를 입력해주세요"
                        type={isPasswordHidden ? 'password' : 'text'}
                      />
                      <PasswordIconWrapper onClick={handleHidePasswordClick}>
                        {isPasswordHidden ? <HideSVG /> : <ShowSVG />}
                      </PasswordIconWrapper>
                    </PasswordInputWrapper>
                    <InputError>{errors.root?.serverError?.message}</InputError>
                  </InputWrapper>

                  <Button
                    variation="solid"
                    btnClass="primary"
                    width={340}
                    disabled={!emailValue}
                    onClick={handleChangePassword}
                  >
                    비밀번호 변경
                  </Button>
                </>
              )}
            </>
          )}
        </>
      )}
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

const Input = styled.input<{ $isError: boolean }>`
  padding: 12px 16px;
  width: 340px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isError }) => ($isError ? '1px solid #FF4242' : '1px solid #70737c')};
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

const Message = styled.div<{ $isSuccess: boolean }>`
  font-weight: var(--font-regular);
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  color: ${({ $isSuccess }) => ($isSuccess ? '#00bf40;' : '#FF4242')};
`;

const NotFoundBox = styled.div`
  width: 520px;
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f7f8;
  padding: 24px;
  gap: 8px;
  border-radius: 10px;
  margin-bottom: 56px;
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

const BtnWrapper = styled.div`
  margin-top: 16px;
`;

const ChangePasswordCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 80px;
`;

const ChangePasswordMessage = styled.div`
  font-size: 20px;
  font-weight: var(--font-semibold);
  color: #171719;
  margin-bottom: 8px;
`;

const PasswordInputWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  border-radius: 10px;
  width: 340px;
  height: 48px;
  border: ${({ $isError, $isDirty }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0e2'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const PasswordInput = styled.input`
  border: none;
  outline: none;

  width: 272px;

  border-radius: 10px;
  outline: none;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #171719;
  font-weight: var(--font-regular);

  &::placeholder {
    color: #dadada;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const PasswordIconWrapper = styled.div`
  cursor: pointer;
`;

const InputError = styled.div`
  white-space: pre-wrap;
  color: #ff4242;
  font-size: 13px;
  font-weight: var(--font-regular);
  letter-spacing: 1.94%;
  line-height: 138.5%;
`;
