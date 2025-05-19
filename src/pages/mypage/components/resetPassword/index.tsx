import { requestChangePassword, requestConfirmCurrentPassword } from '@/api/users';
import Button from '@/components/buttons/button';
import Overlay from '@/components/modal/overlay';
import ModalPortal from '@/components/modal/portal';
import useSessionStore from '@/store/session';
import { ResetPasswordInputs } from '@/types/user';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface CurrentPasswordInput {
  password: string;
}

const ResetPassword = () => {
  const sessionStore = useSessionStore();

  const {
    register,
    handleSubmit,
    watch: changedWatch,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm<ResetPasswordInputs>({ mode: 'onBlur' });

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    watch,
    formState: { errors: currentPasswordErrors, isDirty: isDirtyCurrentPassword },
    setError: setCurrentPasswordError,
  } = useForm<CurrentPasswordInput>();

  const [isVerifiedCurrentPassword, setIsVerifiedCurrentPassword] = useState(false);
  const [updateToken, setUpdateToken] = useState('');
  const [isUpdatedModal, setIsUpdatedModal] = useState(false);

  const [password] = watch(['password']);
  const [newPassword, confirmPassword] = changedWatch(['newPassword', 'confirmPassword']);

  const onSubmitNewPassword = async (data: ResetPasswordInputs) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setCurrentPasswordError('password', {
        type: 'match',
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    const { result } = await requestChangePassword(newPassword, updateToken);

    if (!result) {
      return;
    }

    setIsUpdatedModal(true);
  };

  const onSubmitCurrentPassword = async (data: CurrentPasswordInput) => {
    const { password } = data;
    const { result: token } = await requestConfirmCurrentPassword(password);

    if (token) {
      setUpdateToken(token);
      setIsVerifiedCurrentPassword(true);
    } else {
      setCurrentPasswordError('password', {
        type: 'match',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
  };

  const validatePassword = (confirmPassword: string) => {
    if (confirmPassword === getValues('newPassword')) {
      return true;
    } else {
      return '비밀번호가 일치하지 않습니다.';
    }
  };

  const handleMoveToLoginPage = () => {
    sessionStore.logoutSession();
  };

  return (
    <ResetPasswordContainer>
      <Title>비밀번호 재설정</Title>
      <Form
        onSubmit={
          isVerifiedCurrentPassword
            ? handleSubmit(onSubmitNewPassword)
            : passwordHandleSubmit(onSubmitCurrentPassword)
        }
      >
        {!isVerifiedCurrentPassword && (
          <WithMessageWrapper>
            <InputWrapper>
              <Label>현재 비밀번호 확인</Label>
              <Input
                {...passwordRegister('password', {
                  required: true,
                })}
                type="password"
                placeholder="비밀번호를 입력해주십시오"
                $isDirty={isDirtyCurrentPassword}
                $isError={Boolean(currentPasswordErrors.password)}
              />
            </InputWrapper>
            <Message $isError={Boolean(currentPasswordErrors.password)}>
              {currentPasswordErrors.password?.message}
            </Message>
          </WithMessageWrapper>
        )}
        {isVerifiedCurrentPassword && (
          <Inputs>
            <WithMessageWrapper>
              <InputWrapper>
                <Label>비밀번호</Label>
                <Input
                  {...register('newPassword', {
                    required: true,
                    validate: value => {
                      const isValid =
                        /[A-Z]/.test(value) &&
                        /[a-z]/.test(value) &&
                        /\d/.test(value) &&
                        /[!@#$%^&*]/.test(value) &&
                        value.length >= 8 &&
                        value.length <= 32;

                      return (
                        isValid || '영문 대소문자, 숫자, 특수문자를 포함해 8~32자로 입력해주세요.'
                      );
                    },
                  })}
                  $isDirty={Boolean(dirtyFields.newPassword)}
                  $isError={Boolean(errors.newPassword)}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                />
              </InputWrapper>
              <Message $isError={Boolean(errors.newPassword)}>
                {errors.newPassword?.message}
              </Message>
            </WithMessageWrapper>
            <WithMessageWrapper>
              <InputWrapper>
                <Label>비밀번호 확인</Label>
                <Input
                  {...register('confirmPassword', {
                    required: true,
                    validate: value => validatePassword(value),
                  })}
                  placeholder="비밀번호 확인"
                  $isDirty={Boolean(dirtyFields.confirmPassword)}
                  $isError={Boolean(errors.confirmPassword)}
                  type="password"
                />
              </InputWrapper>
              <Message $isError={Boolean(errors.confirmPassword)}>
                {errors.confirmPassword?.message}
              </Message>
            </WithMessageWrapper>
          </Inputs>
        )}
        <Button
          variation="solid"
          btnClass="primary"
          type="submit"
          width={340}
          disabled={
            isVerifiedCurrentPassword
              ? newPassword !== confirmPassword ||
                !newPassword?.length ||
                !confirmPassword?.length ||
                !!errors.newPassword ||
                !!errors.confirmPassword
              : !password?.length
          }
        >
          {isVerifiedCurrentPassword ? '변경완료' : '다음단계'}
        </Button>
      </Form>
      {isUpdatedModal && (
        <ModalPortal>
          <Overlay>
            <UpdatedModal>
              <ModalContent>
                <ModalContentTitle>비밀번호 변경이 완료되었습니다.</ModalContentTitle>
                <ModalContentSubTitle>
                  <div>변경이 완료되었습니다.</div>
                  <div>재로그인후 이용해주세요.</div>
                </ModalContentSubTitle>
              </ModalContent>
              <Button
                variation="solid"
                btnClass="primary"
                type="button"
                width={300}
                height={48}
                onClick={handleMoveToLoginPage}
              >
                로그인 화면으로 이동
              </Button>
            </UpdatedModal>
          </Overlay>
        </ModalPortal>
      )}
    </ResetPasswordContainer>
  );
};

export default ResetPassword;

const UpdatedModal = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  width: 340px;
  min-height: 200px;
  max-height: fit-content;
  background-color: #ffffffff;
  padding: 20px;
  border-radius: 16px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const ModalContentTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -1.2%;
`;

const ModalContentSubTitle = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.96%;
`;

const ResetPasswordContainer = styled.div`
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
  margin-bottom: 48px;
`;

const Form = styled.form`
  height: 338px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Inputs = styled.div`
  margin-bottom: 136px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`;

const Input = styled.input<{ $isDirty: boolean; $isError: boolean }>`
  padding: 12px 16px;
  width: 340px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
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

const Message = styled.div<{ $isError: boolean }>`
  font-weight: var(--font-regular);
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  color: ${({ $isError }) => ($isError ? '#FF4242' : '#00bf40;')};
`;
