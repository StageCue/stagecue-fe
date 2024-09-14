import { useForm } from "react-hook-form";
import styled from "styled-components";
import { SignupInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SignupInputs>();

  const onSubmitSignup = (data: SignupInputs) => {
    console.log("up");
    console.log(data);
    navigate("/welcome");
  };

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <SignupForm onSubmit={handleSubmit(onSubmitSignup)}>
        <Inputs>
          <InputWrapper>
            <Label>이메일</Label>
            <Input
              {...register("email", {
                required: true,
              })}
              placeholder="stagecue@example.com"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              {...register("password", {
                required: true,
              })}
              placeholder="홍길동"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>휴대폰번호</Label>
            <ShortInputWrapper>
              <ShortInput
                {...register("phoneNumber", {
                  required: true,
                })}
                placeholder="010-1234-5678"
              />
              <Button variation="solid" btnClass="primary" width={140}>
                인증번호 받기
              </Button>
            </ShortInputWrapper>
            <Input
              {...register("certCode", { required: true })}
              placeholder="인증번호를 입력해주세요"
            />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              {...register("password", {
                required: true,
              })}
              placeholder="비밀번호를 입력해주세요"
            />
            <ValidationGuide>
              영문 대소문자, 숫자, 특수문자를 3가지 이상으로 조합하여 8~24자로
              입력해주세요.
            </ValidationGuide>
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호 확인</Label>
            <Input
              {...register("confirmPassword", {
                required: true,
              })}
              placeholder="비밀번호를 다시 한번 입력해주세요"
            />
          </InputWrapper>
          <AgreeWrapper>
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("allAgreed", { required: true })}
              />
              <Label>전체 동의</Label>
            </CheckboxInputWrapper>
            <Divder />
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("ageCheck", { required: true })}
              />
              <Label>만 14세 이상입니다 (필수)</Label>
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("agreeServicePolicy", { required: true })}
              />
              <Label>스테이지큐 이용약관 동의 (필수)</Label>
            </CheckboxInputWrapper>
            <CheckboxInputWrapper>
              <CheckboxInput
                type="checkbox"
                {...register("agreePrivatePolicy", { required: true })}
              />
              <Label>스에이지큐 개인정보 수집 및 이용 동의 (필수)</Label>
            </CheckboxInputWrapper>
          </AgreeWrapper>
        </Inputs>
        <Button type="submit" variation="solid" btnClass="primary" width={340}>
          회원가입
        </Button>
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

const ShortInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  width: 340px;
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

const ShortInput = styled.input`
  padding: 12px 16px;
  width: 192px;
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

const Label = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;

const ValidationGuide = styled.div`
  width: 340px;
  height: 36px;
  margin-top: 8px;
`;

const Divder = styled.div`
  width: 338px;
  height: 1px;
  background-color: var(--color-gray);
`;

const CheckboxInput = styled.input``;

const CheckboxInputWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const AgreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
