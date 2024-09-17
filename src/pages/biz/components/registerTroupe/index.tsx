import Button from "@/components/buttons/button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CalendarSVG from "@assets/icons/calendar.svg?react";
import TipSVG from "@assets/icons/tip.svg?react";

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

  const [descriptionValue] = watch(["description"]);

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
        <ImageFileInputs>
          <ImageFileInputWrapper>
            <LabelWrapper>
              <RequiredLabel>
                프로필 이미지
                <RequiedRedDot />
              </RequiredLabel>
              <TipSVG />
            </LabelWrapper>
            <FileGuide>극단 프로필을 설정해보세요.</FileGuide>
          </ImageFileInputWrapper>
          <ImageFileInputWrapper>
            <LabelWrapper>
              <Label>커버 이미지</Label>
              <TipSVG />
            </LabelWrapper>
            <FileGuide>극단 프로필을 설정해보세요.</FileGuide>
          </ImageFileInputWrapper>
        </ImageFileInputs>
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
        <InputWrapper>
          <RequiredLabel>
            극단소개
            <RequiedRedDot />
          </RequiredLabel>
          <TextAreaWrapper>
            <TextAreaInput
              {...register("description", { required: true, maxLength: 3000 })}
              placeholder="극단 소개글을 입력해주세요"
            />
            <Counter>{descriptionValue?.length} / 3000</Counter>
          </TextAreaWrapper>
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            극단 위치
            <RequiedRedDot />
          </RequiredLabel>
          <FakeInput>클릭해서 주소를 검색해주세요.</FakeInput>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>사업자 등록 번호</Label>
          <Input />
        </InputWrapper>
        <InputWrapper>
          <Label>사업자 등록증</Label>
          <WithBtnInputWrapper>
            <WithBtnInput />
            <Button
              variation="outlined"
              btnClass="primary"
              width={160}
              height={48}
              fontSize={16}
              padding="12px 0px"
              letterSpacing={0.57}
              lineHeight={150}
            >
              파일 선택
            </Button>
          </WithBtnInputWrapper>
          <FileGuide>jpg, png, pdf 파일로 업로드해주세요.</FileGuide>
        </InputWrapper>
        <Divider />
        <TwoInputWrapper>
          <InputWrapper>
            <RequiredLabel>
              담당자 이름
              <RequiedRedDot />
            </RequiredLabel>
            <HalfInput />
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              담당자 연락처
              <RequiedRedDot />
            </RequiredLabel>
            <HalfInput />
          </InputWrapper>
        </TwoInputWrapper>
        <InputWrapper>
          <Label>극단 이메일</Label>
          <Input />
          <FileGuide>
            유저 문의, 답변 등에 사용할 극단 공식 이메일 정보를 입력해주세요
          </FileGuide>
        </InputWrapper>
        <InputWrapper>
          <Label>극단 웹사이트</Label>
          <Input />
          <FileGuide>
            홈페이지, SNS 페이지, Youtube등 극단정보가 담긴 홍보 웹사이트 정보를
            입력해주세요.
          </FileGuide>
        </InputWrapper>
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
  flex-direction: column;
  gap: 32px;
`;

const ImageFileInputs = styled.div`
  display: flex;
  gap: 20px;
`;

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

const FakeInput = styled.div`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  border: 1px solid #e0e0e2;
  color: #dadada;
`;

const Input = styled.input`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: 1px solid #e0e0e2;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const WithBtnInputWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const WithBtnInput = styled.input`
  width: 520px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: 1px solid #e0e0e2;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const HalfInput = styled.input`
  width: 340px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: 1px solid #e0e0e2;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
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

const TextAreaWrapper = styled.div`
  width: 692px;
  height: 200px;
  border: 1px solid #e0e0e2;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const TextAreaInput = styled.textarea`
  width: 660px;
  height: 146px;
  border: none;
  outline: none;
  resize: none;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const Counter = styled.div`
  color: #dfdfe0;
  font-size: 13px;
  font-weight: var(--font-regular);
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const FileGuide = styled.div`
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  color: #c7c7c8;
`;

const Divider = styled.div`
  width: 692px;
  height: 1px;
  background-color: #e0e0e2;
`;

const ImageFileInputWrapper = styled.div`
  height: 150px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 160px;
`;
