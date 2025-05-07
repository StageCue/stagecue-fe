import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { PasswordInputs } from '../../../types/user';
import Button from '../../../components/buttons/button';
import { requestResetPasswordFromMail } from '@/api/auth';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordInputs>({ mode: 'onBlur' });

  const [isResetPassword, setIsResetPassword] = useState<boolean>();
  const [passwordValue, confirmPasswordValue] = watch(['password', 'confirmPassword']);

  const onSubmitNewPassword = async (data: PasswordInputs) => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email') as string;
    const token = params.get('token') as string;

    if (token) {
      const { result, error } = await requestResetPasswordFromMail({
        email,
        newPassword: data?.password,
        token,
      });

      if (result) {
        setIsResetPassword(true);
        return;
      }

      if (error) {
        alert(error?.element?.message?.resolved);
        return;
      }
    }
  };

  const handleGoToLoginClick = () => {
    navigate('/auth/login');
  };
  return (
    <FindPasswordContainer>
      <TitleWrapper>
        <Title>비밀번호 재설정</Title>
      </TitleWrapper>
      {!isResetPassword && (
        <Form onSubmit={handleSubmit(onSubmitNewPassword)}>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register('password', {
                required: true,
                validate: value => {
                  const isValid =
                    /[A-Z]/.test(value) &&
                    /[a-z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*]/.test(value) &&
                    value.length >= 8 &&
                    value.length <= 32;
                  return isValid || '영문 대소문자, 숫자, 특수문자를 포함해 8~32자로 입력해주세요.';
                },
              })}
              $isDirty={Boolean(passwordValue)}
              $isError={Boolean(errors.password)}
            />
            <InputError>{errors.password?.message}</InputError>
          </InputWrapper>

          <InputWrapper>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              placeholder="비밀번호 확인"
              {...register('confirmPassword', {
                required: true,
                validate: value => value === passwordValue || '비밀번호가 일치하지 않습니다.',
              })}
              $isDirty={Boolean(confirmPasswordValue)}
              $isError={Boolean(errors.confirmPassword)}
            />
            <InputError>{errors.confirmPassword?.message}</InputError>
          </InputWrapper>

          <Button
            type="submit"
            variation="solid"
            btnClass="primary"
            width={340}
            disabled={
              !passwordValue ||
              !confirmPasswordValue ||
              !!errors.password ||
              !!errors.confirmPassword
            }
          >
            제출
          </Button>
        </Form>
      )}
      {isResetPassword && (
        <>
          <ResetPasswordBox>
            <TextWrapper>
              <MainText>비밀번호를 정상적으로 변경했어요</MainText>
              <SubText>아래버튼을 눌러 로그인을 진행해주세요</SubText>
            </TextWrapper>
          </ResetPasswordBox>
          <Button
            variation="solid"
            btnClass="primary"
            padding="12px"
            fontSize={16}
            letterSpacing={0.57}
            lineHeight={150}
            fontWeight="var(--font-semibold)"
            width={340}
            height={48}
            onClick={handleGoToLoginClick}
          >
            로그인 하러가기
          </Button>
        </>
      )}
    </FindPasswordContainer>
  );
};

export default FindPassword;

const FindPasswordContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-top: 211px;
  display: flex;
  flex-direction: column;
  gap: 13px;

  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const Form = styled.form`
  margin-top: 80px;
`;

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

const Input = styled.input<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  padding: 12px 16px;
  width: 340px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isError, $isDirty }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0e2'};
  outline: none;

  ::placeholder {
    color: #171719;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const ResetPasswordBox = styled.div`
  width: 520px;
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f7f7f8;
  padding: 24px;
  gap: 16px;
  border-radius: 10px;
  margin-bottom: 56px;
  margin-top: 80px;
  display: flex;
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

const InputError = styled.div`
  color: #ff4242;
  font-size: 13px;
  font-weight: var(--font-regular);
  letter-spacing: 1.94%;
  letter-spacing: 138.5%;
`;
