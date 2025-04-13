import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { LoginInputs } from '../../../types/user';
import Button from '../../../components/buttons/button';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '@/api/auth';
import useSessionStore from '@/store/session';
import HideSVG from '@assets/icons/hide.svg?react';
import ShowSVG from '@assets/icons/show.svg?react';
import { useState } from 'react';
import Checkbox from '@/components/checkbox';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>();
  const sessionStore = useSessionStore();

  const [emailValue, passwordValue] = watch(['email', 'password']);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const onSubmitLogin = async (data: LoginInputs) => {
    const { result: res } = await requestLogin(data);

    if (res?.error) {
      setError('root.serverError', {
        type: '400',
        message: `이메일 또는 비밀번호가 올바르지 않습니다.\n입력한 내용을 다시 확인해주세요.`,
      });
      return;
    }
    sessionStore.loginSession({
      email: emailValue,
      username: res?.userName,
      phoneNumber: res?.phoneNumber,
      userType: res?.userType,
      birthday: res?.birthDate,
    });
    navigate('/');
  };

  const handleSignupClick = () => {
    navigate('/auth/signup');
  };

  const handleForgotPasswordClick = () => {
    navigate('/auth/forgotpassword');
  };

  const handleHidePasswordClick = () => {
    setIsPasswordHidden(prev => !prev);
  };

  const handleAutoLoginClick = () => {
    setIsAutoLogin(prev => !prev);
  };

  return (
    <LoginContainer>
      <Title>이메일로 로그인</Title>
      <LoginForm onSubmit={handleSubmit(onSubmitLogin)}>
        <Inputs>
          <InputWrapper>
            <Label>이메일</Label>
            <Input
              {...register('email', {
                required: true,
              })}
              placeholder="이메일을 입력해주세요"
              $isDirty={Boolean(emailValue)}
              $isError={Boolean(errors.root)}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <PasswordInputWrapper $isDirty={Boolean(passwordValue)} $isError={Boolean(errors.root)}>
              <PasswordInput
                {...register('password', {
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
            <Checkbox
              checked={isAutoLogin}
              onChange={handleAutoLoginClick}
              label="로그인 유지하기"
            />
          </InputWrapper>
        </Inputs>
        <Button
          variation="solid"
          btnClass="primary"
          type="submit"
          width={340}
          disabled={!emailValue || !passwordValue}
        >
          로그인
        </Button>
      </LoginForm>
      <Divider>
        <Line />
        <Text>또는</Text>
      </Divider>
      <BottomBtnsWrapper>
        <Button
          variation="outlined"
          btnClass="secondary"
          width={340}
          fontSize={15}
          onClick={handleSignupClick}
        >
          이메일로 회원가입
        </Button>
        <Button
          variation="text"
          btnClass="assistive"
          width={134}
          height={28}
          fontSize={14}
          onClick={handleForgotPasswordClick}
          padding="0px"
        >
          비밀번호를 잊으셨나요?
        </Button>
      </BottomBtnsWrapper>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 159px;
`;

const Title = styled.div`
  margin-top: 95px;
  margin-bottom: 85px;
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
  color: #000000;
`;

const LoginForm = styled.form`
  margin-bottom: 24px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 48px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input<{ $isDirty: boolean; $isError: boolean }>`
  padding: 12px 16px;
  width: 340px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isError, $isDirty }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0e2'};
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

const Label = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;

const Divider = styled.div`
  width: 338px;
  height: 20px;
  position: relative;
  margin: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Line = styled.div`
  width: 338px;
  height: 1px;
  background-color: #dcdcdc;
`;

const Text = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 41px;
  height: 20px;
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: var(--color-gray19);
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomBtnsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
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
