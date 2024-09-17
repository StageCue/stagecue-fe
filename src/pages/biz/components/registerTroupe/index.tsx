import Button from "@/components/buttons/button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CalendarSVG from "@assets/icons/calendar.svg?react";

interface RegisterTroupeInputs {
  name: string;
  date: string;
  description: string;
  address: string;
  bizNum: string;
  worker: string;
  phoneNumber: string;
  email: string;
  website: string;
}

const RegisterTroupe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegisterTroupeInputs>({ mode: "all" });

  return (
    <RegisterTroupeContainer>
      <TitleWrapper>
        <Title>
          <Text>극단 소개 등록</Text>
          <SubText>
            <RedDot /> 표시는 필수 입력 항목입니다.
          </SubText>
        </Title>
        <Button
          variation="solid"
          btnClass="primary"
          width={67}
          height={40}
          fontSize={15}
          padding="9px 20px"
        >
          저장
        </Button>
      </TitleWrapper>
      <Form>
        <FileInputWrapper />
        <TwoInputWrapper>
          <InputWrapper>
            <RequiredLabel>
              극단명
              <RequiedRedDot />
            </RequiredLabel>
            <HalfInput />
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              설립일자
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper>
              <WithIconHalfInput />
              <CalendarSVG />
            </WithIconInputWrapper>
          </InputWrapper>
        </TwoInputWrapper>
      </Form>
    </RegisterTroupeContainer>
  );
};

export default RegisterTroupe;

const RegisterTroupeContainer = styled.div`
  padding: 88px 244px 100px 244px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 64px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.div`
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const SubText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RedDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #b81716;
  border-radius: 50%;
`;

const Form = styled.div`
  display: flex;
  gap: 32px;
`;

const FileInputWrapper = styled.div``;

const TwoInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Label = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #171719;
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HalfInput = styled.input`
  width: 340px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
`;

const WithIconInputWrapper = styled.div`
  width: 340px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  gap: 12px;
  border: 1px solid #e0e0e2;
`;

const WithIconHalfInput = styled.input`
  width: 272px;
  height: 24px;
  border: none;
  outline: none;
`;
