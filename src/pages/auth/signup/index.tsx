/* eslint-disable no-useless-escape */
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SignupInputs } from '../../../types/user';
import Button from '../../../components/buttons/button';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { requestCellPhoneCertCode, requestSignup, requestVerifySignup } from '@/api/auth';
import CheckboxSVG from '@assets/icons/checkbox.svg?react';
import CheckedSVG from '@assets/icons/checkbox_checked.svg?react';
import ChevronRight from '@assets/icons/chevron_right_gray_s.svg?react';
import useSessionStore from '@/store/session';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import Datepicker from '@/components/datepicker';
import DatePicker from 'react-datepicker';

const Signup = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();
  const [isSentCertCode, setIsSentCertCode] = useState<boolean>(false);
  const [certTime, setCertTime] = useState<number>(300);
  const [certCode, setCertCode] = useState<string>('');
  // const [isCertificated, setIsCertificagted] = useState<false>(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAllAgree, setIsAllAgree] = useState(false);
  const [registerToken, setRegisterToken] = useState('');

  const datepickerRef = useRef<DatePicker | null>(null);
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  oneDayAgo.setHours(0, 0, 0, 0);
  const [date, setDate] = useState<Date>(oneDayAgo);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleServicePolicyLinkClick = () => {
    window.open(
      'https://www.notion.so/023d21af0ea24dafb2bcff260e2fe4eb?pvs=4',
      '_blank',
      'rel=nooopener noreferrer'
    );
  };

  const handlePrivatePolicyLinkClick = () => {
    window.open(
      'https://www.notion.so/aeca057f02914c52bf9a0f627cf01e40?pvs=4',
      '_blank',
      'rel=nooopener noreferrer'
    );
  };

  const defaultValues = {
    email: '',
    name: '',
    phoneNumber: '',
    password: '',
    certificated: false,
    birthday: `${date
      ?.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '-')
      .replace(/\s/g, '')
      .replace(/-$/, '')}`,
    gender: '',
    confirmPassword: '',
    ageCheck: false,
    agreeServicePolicy: false,
    agreePrivatePolicy: false,
    userType: 'PERFORMER',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    trigger,
    control,
    clearErrors,
  } = useForm<SignupInputs>({ mode: 'all', defaultValues });

  const [
    emailValue,
    nameValue,
    phoneNumberValue,
    certificatedValue,
    genderValue,
    passwordValue,
    confirmPasswordValue,
    ageCheckValue,
    agreeServicePolicyValue,
    agreePrivatePolicyValue,
    birthdayValue,
  ] = watch([
    'email',
    'name',
    'phoneNumber',
    'certificated',
    'gender',
    'password',
    'confirmPassword',
    'ageCheck',
    'agreeServicePolicy',
    'agreePrivatePolicy',
    'birthday',
    'userType',
  ]);

  const isAllInputHasValue = useMemo(() => {
    return (
      emailValue &&
      nameValue &&
      phoneNumberValue &&
      certificatedValue &&
      genderValue &&
      passwordValue &&
      confirmPasswordValue &&
      ageCheckValue &&
      agreeServicePolicyValue &&
      agreePrivatePolicyValue &&
      birthdayValue
    );
  }, [
    emailValue,
    nameValue,
    phoneNumberValue,
    certificatedValue,
    genderValue,
    passwordValue,
    confirmPasswordValue,
    ageCheckValue,
    agreeServicePolicyValue,
    agreePrivatePolicyValue,
    birthdayValue,
  ]);

  const onSubmitSignup = async (data: SignupInputs) => {
    const { email, name, phoneNumber, password, birthday, gender } = data;

    const userData = {
      token: registerToken,
      userName: name,
      email,
      phoneNumber,
      password,
      birthDate:
        birthday ??
        `${oneDayAgo
          ?.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\./g, '-')
          .replace(/\s/g, '')
          .replace(/-$/, '')}`,
      gender,
    };

    const { result } = await requestSignup(userData);

    if (result) {
      sessionStore.loginSession({
        email: emailValue,
        username: name,
        phoneNumber: phoneNumber,
        userType: 'PERFORMER',
        birthday: birthday,
      });
      navigate('/');
    }
  };

  const handleGenderClick = (gender: string) => {
    setValue('gender', gender);
  };

  const handleSendCertClick = async () => {
    const { result } = await requestCellPhoneCertCode({
      phoneNumber: phoneNumberValue,
    });

    if (result) {
      setCertTime(300);
      setIsSentCertCode(true);
    }
  };

  const handleAllAgreeClick = () => {
    setIsAllAgree(prev => {
      if (prev) {
        setValue('ageCheck', false);
        setValue('agreePrivatePolicy', false);
        setValue('agreeServicePolicy', false);
      } else {
        setValue('ageCheck', true);
        setValue('agreePrivatePolicy', true);
        setValue('agreeServicePolicy', true);
      }
      return !prev;
    });
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    setPhoneNumber(formatPhoneNumber(event.target.value));
    setValue('phoneNumber', rawValue);
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleAgeCheckClick = () => {
    if (ageCheckValue) {
      setValue('ageCheck', false);
    } else {
      setValue('ageCheck', true);
    }
  };

  const handleServicePolicyClick = () => {
    if (agreeServicePolicyValue) {
      setValue('agreeServicePolicy', false);
    } else {
      setValue('agreeServicePolicy', true);
    }
  };

  const handlePrivatePolicyClick = () => {
    if (agreePrivatePolicyValue) {
      setValue('agreePrivatePolicy', false);
    } else {
      setValue('agreePrivatePolicy', true);
    }
  };

  const handleCertInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCertCode(event.target.value);
  };

  const handleVerifyCertCodeClick = async () => {
    const res = await requestVerifySignup({
      phoneNumber: phoneNumberValue,
      token: certCode,
    });

    if (!res?.error) {
      setValue('certificated', true);
      setRegisterToken(res.result);
      clearErrors(['certificated']);
    } else {
      console.error(res?.error);
      setValue('certificated', false);
      setError('certificated', {
        type: 'verify',
        message: '인증번호를 확인해주세요.',
      });
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword === passwordValue) {
      return true;
    } else {
      return '비밀번호가 일치하지 않습니다.';
    }
  };

  const handleCalendarClick = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(true);
    }
  };

  useEffect(() => {
    if (certTime === 0 || !isSentCertCode) return;

    const timer = setInterval(() => {
      setCertTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [certTime, isSentCertCode]);

  useEffect(() => {
    if (certTime === 0) {
      setIsSentCertCode(false);
    }
  }, [certTime]);

  useEffect(() => {
    if (ageCheckValue && agreePrivatePolicyValue && agreeServicePolicyValue) {
      setIsAllAgree(true);
    } else {
      setIsAllAgree(false);
    }
  }, [ageCheckValue, agreePrivatePolicyValue, agreeServicePolicyValue]);

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <SignupForm onSubmit={handleSubmit(onSubmitSignup)}>
        <Inputs>
          <InputWrapper>
            <RequiredLabel>
              이메일
              <RequiedRedDot />
            </RequiredLabel>
            <Input
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
              placeholder="stagecue@example.com"
              $isError={Boolean(errors.email?.message)}
              $isDirty={Boolean(emailValue)}
              onBlur={() => trigger('email')}
            />
            <InputError>{errors.email?.message}</InputError>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              이름
              <RequiedRedDot />
            </RequiredLabel>
            <Input
              {...register('name', {
                required: true,
              })}
              placeholder="홍길동"
              $isError={Boolean(errors.name?.message)}
              $isDirty={Boolean(nameValue)}
              onBlur={() => trigger('name')}
            />
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              휴대폰번호
              <RequiedRedDot />
            </RequiredLabel>
            <PhoneNumberInputWrapper>
              <ShortInput
                {...register('phoneNumber', {
                  required: true,
                  pattern: {
                    value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                    message: '올바른 휴대폰 번호 형식이 아닙니다',
                  },
                })}
                placeholder="010-1234-5678"
                onChange={handlePhoneNumberChange}
                value={phoneNumber}
                $isError={Boolean(errors.phoneNumber?.message)}
                $isDirty={Boolean(phoneNumberValue)}
                onBlur={() => trigger('phoneNumber')}
              />
              <Button
                variation={isSentCertCode ? 'outlined' : 'solid'}
                btnClass="primary"
                width={140}
                padding="12px 20px"
                fontSize={15}
                type="button"
                disabled={Boolean(!phoneNumberValue) || Boolean(errors.phoneNumber)}
                onClick={handleSendCertClick}
              >
                {isSentCertCode ? '인증번호 재전송' : '인증번호 받기'}
              </Button>
            </PhoneNumberInputWrapper>
            <ShortInputWrapper>
              <VerifyWrapper>
                <CertInputWrapper
                  $isError={false}
                  $isDirty={isSentCertCode}
                  $isDisabled={!isSentCertCode}
                >
                  <CertInput
                    name="certCode"
                    type="text"
                    onChange={event => handleCertInputChange(event)}
                    disabled={!isSentCertCode}
                    placeholder={isSentCertCode ? '' : '인증번호를 입력해주세요'}
                    $isSentCode={isSentCertCode}
                  />
                  {isSentCertCode && !certificatedValue ? (
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
                  onClick={handleVerifyCertCodeClick}
                  type="button"
                >
                  인증확인
                </Button>
              </VerifyWrapper>
              <InputError>{errors.certificated?.message}</InputError>
              {certificatedValue && <SuccessCert>인증되었습니다.</SuccessCert>}
            </ShortInputWrapper>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              생년월일
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper>
              <Controller
                name="birthday"
                control={control}
                rules={{ required: true }}
                defaultValue={date?.toLocaleDateString()}
                render={({ field }) => (
                  <Datepicker
                    ref={datepickerRef}
                    selectedDate={date!}
                    maxDate={oneDayAgo}
                    onChangeDate={(date: Date | null) => {
                      handleDateChange(date!);
                      field.onChange(
                        date
                          ?.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                          .replace(/\./g, '-')
                          .replace(/\s/g, '')
                          .replace(/-$/, '')
                      );
                    }}
                    pickerText="생년월일을 입력해주세요"
                  />
                )}
              />
              <IconWrapper onClick={handleCalendarClick}>
                <CalendarSVG />
              </IconWrapper>
            </WithIconInputWrapper>
          </InputWrapper>
          <InputWrapper>
            <Label>성별</Label>
            <GenderButtonWrapper>
              <GenderButton
                onClick={() => handleGenderClick('MALE')}
                $isSelected={genderValue === 'MALE'}
              >
                남성
              </GenderButton>
              <GenderButton
                onClick={() => handleGenderClick('FEMALE')}
                $isSelected={genderValue === 'FEMALE'}
              >
                여성
              </GenderButton>
            </GenderButtonWrapper>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              비밀번호
              <RequiedRedDot />
            </RequiredLabel>
            <Input
              {...register('password', {
                required: true,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{8,24}$/,
              })}
              placeholder="비밀번호를 입력해주세요"
              $isError={Boolean(errors.password)}
              $isDirty={Boolean(passwordValue)}
              onBlur={() => trigger('password')}
              type="password"
            />
            <ValidationGuide $isError={Boolean(errors.password)}>
              영문 대소문자, 숫자, 특수문자를 포함해 8~24자로 입력해주세요.
            </ValidationGuide>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              비밀번호 확인
              <RequiedRedDot />
            </RequiredLabel>
            <Input
              {...register('confirmPassword', {
                required: true,
                validate: value => validateConfirmPassword(value),
              })}
              placeholder="비밀번호를 다시 한번 입력해주세요"
              $isError={Boolean(errors.confirmPassword)}
              $isDirty={Boolean(confirmPasswordValue)}
              onBlur={() => trigger('confirmPassword')}
              type="password"
            />
            <InputError>{errors.confirmPassword?.message}</InputError>
          </InputWrapper>
          <AgreeWrapper>
            <CheckboxInputWrapper onClick={handleAllAgreeClick}>
              <CheckboxWrapper>
                {isAllAgree ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>전체 동의</CheckboxLabel>
              </CheckboxWrapper>
            </CheckboxInputWrapper>
            <Divder />
            <CheckboxInputWrapper onClick={handleAgeCheckClick}>
              <CheckboxWrapper>
                {ageCheckValue ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>
                  만 14세 이상입니다 <RequiredText>(필수)</RequiredText>
                </CheckboxLabel>
              </CheckboxWrapper>
              <CheckboxInput type="checkbox" {...register('ageCheck', { required: true })} />
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxWrapper onClick={handleServicePolicyClick}>
                {agreeServicePolicyValue ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>
                  스테이지큐 이용약관 동의 <RequiredText>(필수)</RequiredText>
                </CheckboxLabel>
              </CheckboxWrapper>
              <IconWrapper onClick={handleServicePolicyLinkClick}>
                <ChevronRight />
              </IconWrapper>
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxWrapper onClick={handlePrivatePolicyClick}>
                {agreePrivatePolicyValue ? <CheckedSVG /> : <CheckboxSVG />}
                <CheckboxLabel>
                  스테이지큐 개인정보 수집 및 이용 동의
                  <RequiredText>(필수)</RequiredText>
                </CheckboxLabel>
              </CheckboxWrapper>
              <IconWrapper onClick={handlePrivatePolicyLinkClick}>
                <ChevronRight />
              </IconWrapper>
            </CheckboxInputWrapper>
          </AgreeWrapper>
        </Inputs>
        <Button
          type="submit"
          variation="solid"
          btnClass="primary"
          width={340}
          disabled={!isAllInputHasValue}
        >
          회원가입
        </Button>
        <CheckboxInput
          type="checkbox"
          {...register('certificated', { required: true, value: false })}
        />
        <CheckboxInput type="checkbox" {...register('agreeServicePolicy', { required: true })} />
        <CheckboxInput type="checkbox" {...register('agreePrivatePolicy', { required: true })} />
      </SignupForm>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 138px;
`;

const Title = styled.div`
  margin-top: 95px;
  margin-bottom: 85px;
  font-size: 28px;
  font-weight: var(--font-bold);
  line-height: 135.8%;
  letter-spacing: -2.36%;
  color: black;
`;

const SignupForm = styled.form`
  margin-bottom: 32px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PhoneNumberInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ShortInputWrapper = styled.div`
  gap: 8px;
`;

const Input = styled.input<{ $isError: boolean; $isDirty: boolean }>`
  padding: 12px 16px;
  width: 340px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isError, $isDirty }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0e2'};
  outline: none;

  &::placeholder {
    color: #dadada;
    line-height: 150%;
    letter-spacing: 0.57%;
    font-size: 16px;
  }
`;

const ShortInput = styled.input<{ $isError: boolean; $isDirty: boolean }>`
  padding: 12px 16px;
  width: 192px;
  height: 48px;
  border-radius: 10px;
  border: ${({ $isError, $isDirty }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0e2'};
  outline: none;

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
  display: flex;
  gap: 4px;
`;

const RequiredLabel = styled.div`
  position: relative;
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #171719;
`;

const RequiedRedDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #b81716;
  border-radius: 50%;
  position: absolute;
  left: -2px;
  top: -2px;
`;

const ValidationGuide = styled.div<{ $isError: boolean }>`
  width: 340px;
  height: 36px;
  margin-top: 8px;
  color: ${({ $isError }) => ($isError ? '#FF4242' : '#c7c7c8')};
  font-size: 13px;
  line-height: 138%.5;
  letter-spacing: 1.94%;
`;

const Divder = styled.div`
  width: 338px;
  height: 1px;
  background-color: #e1e2e4;
`;

const CheckboxInput = styled.input`
  visibility: hidden;
  height: 0px;
  width: 0px;
`;

const CheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  gap: 4px;
`;

const AgreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputError = styled.div`
  color: #ff4242;
  font-size: 13px;
  font-weight: var(--font-regular);
  letter-spacing: 1.94%;
`;

const CertInputWrapper = styled.div<{
  $isDisabled: boolean;
  $isError: boolean;
  $isDirty: boolean;
}>`
  padding: 12px 16px;
  width: 220px;
  height: 48px;
  background-color: ${({ $isDisabled }) => ($isDisabled ? '#f4f4f5;' : 'white')};
  border: ${({ $isError, $isDirty }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0e2'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CertInput = styled.input<{
  // $isError: boolean;
  // $isDirty: boolean;
  $isSentCode: boolean;
}>`
  width: ${({ $isSentCode }) => ($isSentCode ? '133px' : '188px')};
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

const WithIconInputWrapper = styled.div`
  width: 340px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  gap: 12px;
  border: 1px solid #e0e0e2;
  justify-content: space-between;
`;

const GenderButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const GenderButton = styled.div<{ $isSelected: boolean }>`
  width: 164px;
  height: 48px;
  background-color: ${({ $isSelected }) => ($isSelected ? '#b81716' : 'white')};
  color: ${({ $isSelected }) => ($isSelected ? 'white' : '#dfdfe0')};
  border: ${({ $isSelected }) => ($isSelected ? 'none' : '1px solid #dfdfe0')};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: var(--font-semibold);
  cursor: pointer;
`;

const RequiredText = styled.div`
  color: #b81716;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  gap: 4px;
  cursor: pointer;
`;

const CheckboxLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 340px;
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
  color: #171719;
  font-weight: var(--font-regualr);
  width: fit-content;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const SuccessCert = styled.div`
  color: #00bf40;
  font-size: 13px;
  font-weight: var(--font-regular);
  letter-spacing: 1.94%;
`;

const VerifyWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;
