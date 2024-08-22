import { useForm } from "react-hook-form";
import styled from "styled-components";
import { LoginInputs } from "../../types/user";

const Login = () => {
  const { register, handleSubmit } = useForm<LoginInputs>();

  const onSubmitLogin = (data: LoginInputs) => {
    console.log(data);
  };

  return (
    <LoginContainer>
      <Title>이메일로 로그인</Title>
      <LoginForm onSubmit={handleSubmit(onSubmitLogin)}>
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
        </Inputs>
        <LoginBtn type="submit">로그인</LoginBtn>
      </LoginForm>
      <Divider />
      <JoinWithEmailBtn>이메일로 회원가입</JoinWithEmailBtn>
      <ForgotPasswordBtn>비밀번호를 잊으셨나요?</ForgotPasswordBtn>
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
`;

const Title = styled.div`
  padding: 85px 0;
`;

const LoginForm = styled.form``;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
`;

const Label = styled.div``;

const LoginBtn = styled.button`
  width: 340px;
  height: 48px;
`;

const Divider = styled.div``;

const JoinWithEmailBtn = styled.div``;

const ForgotPasswordBtn = styled.div``;