import { useForm } from "react-hook-form";
import styled from "styled-components";
import { LoginInputs } from "../../../types/user";
import Button from "../../../components/buttons/button";
import { useNavigate } from "react-router-dom";
import { requestLogin } from "@/api/auth";
import useSessionStore from "@/store";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInputs>();
  const sessionStore = useSessionStore();

  const onSubmitLogin = async (data: LoginInputs) => {
    const res = await requestLogin(data);

    if (res.code === "SUCCESS") {
      sessionStore.loginSession();
      navigate("/");
    }
  };

  const handleSignupClick = () => {
    navigate("/auth/signup");
  };

  const handleForgotPasswordClick = () => {
    navigate("/auth/forgotpassword");
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
              placeholder="이메일을 입력해주세요"
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
            <CheckboxInputWrapper>
              <CheckboxInput />
              <CheckboxLabel>로그인 유지</CheckboxLabel>
            </CheckboxInputWrapper>
          </InputWrapper>
        </Inputs>
        <Button variation="solid" btnClass="primary" type="submit" width={340}>
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
          width={150}
          height={28}
          fontSize={14}
          onClick={handleForgotPasswordClick}
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

const CheckboxInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 8px;
`;

const CheckboxInput = styled.div`
  width: 18px;
  height: 18px;
  border: 1.5px solid #70737c;
  border-radius: 3px;
`;

const CheckboxLabel = styled.label`
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #37383c;
  height: 18px;
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
