import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { ForgotPasswordInput } from '../../../types/user';
import Button from '../../../components/buttons/button';
import { requestResetPasswordEmail } from '@/api/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [emailValue] = watch(['email']);

  const onSubmitEmail = async (data: ForgotPasswordInput) => {
    const { result, error } = await requestResetPasswordEmail(data.email);

    if (result) {
      setIsSentEmail(true);
      return;
    }

    if (error) {
      setFoundAccount(false);
      return;
    }
  };

  const handleLoginClick = () => {
    navigate('/auth/login');
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

  return (
    <ResetPasswordContainer>
      <TitleWrapper>
        <Title>비밀번호 재설정</Title>
        {foundAccount && (
          <Description>
            {!isSentEmail
              ? '비밀번호 재설정을 진행할 계정의 이메일을 입력해주세요.'
              : `비밀번호 재설정을 위한 이메일을 아래의 메일로 전송했어요.\n이메일이 오지 않았다면, 스팸메일함 또는 메일주소를 확인해주세요.`}
          </Description>
        )}
      </TitleWrapper>
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
              <Button
                variation="solid"
                btnClass="primary"
                width={340}
                disabled={!emailValue}
                onClick={handleLoginClick}
              >
                로그인으로 이동
              </Button>
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
