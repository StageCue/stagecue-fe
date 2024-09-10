import { useForm } from "react-hook-form";
import styled from "styled-components";
import { SignupInputs } from "../../types/user";

const Signup = () => {
  const { register, handleSubmit } = useForm<SignupInputs>();

  const onSubmitSignup = (data: SignupInputs) => {
    console.log(data);
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
            />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              {...register("password", {
                required: true,
              })}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>휴대폰번호</Label>
            <Input
              {...register("phoneNumber", {
                required: true,
              })}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호</Label>
            <Input
              {...register("password", {
                required: true,
              })}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>비밀번호 확인</Label>
            <Input
              {...register("confirmPassword", {
                required: true,
              })}
            />
          </InputWrapper>
        </Inputs>
        <SignupBtn type="submit">회원가입</SignupBtn>
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
  margin-bottom: 85px;
`;

const SignupForm = styled.form`
  margin-bottom: 32px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  width: 340px;
  padding: 12px 16px;
  border-radius: 10px;
`;

const Label = styled.div``;

const SignupBtn = styled.button`
  width: 340px;
  height: 48px;
`;
