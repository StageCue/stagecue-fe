import Button from "@/components/buttons/button";
import styled from "styled-components";
import CalendarSVG from "@assets/icons/calendar.svg?react";
import { useForm } from "react-hook-form";
import { useDaumPostcodePopup } from "react-daum-postcode";
import DeleteSVG from "@assets/icons/delete_circle.svg?react";
import { ChangeEvent, useState } from "react";
import { generateId } from "@/utils/dev";

interface EditRecruitInputs {
  title: string;
  introduce: string;
  recruitEnd: string;
  recruitingParts: string[];
  monthlyFee: number;
  artworkName: string;
  category: string;
  recruitStatus: string;
  recruitImages: string[];
  practice: {
    start: string;
    end: string;
    dayOfWeek: number;
    address: string;
    addressDetail: string;
  };
  stage: {
    start: string;
    end: string;
    address: string;
    addressDetail: string;
  };
}

const EditRecruit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
  } = useForm<EditRecruitInputs>();

  const open = useDaumPostcodePopup();
  const [part, setPart] = useState<string>("");
  const [partsArray, setPartsArray] = useState<{ value: string; id: string }[]>(
    []
  );

  const [introduceValue, addressValue, partsValue] = watch([
    "introduce",
    "practice.address",
    "recruitingParts",
  ]);

  const handlePartsKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Enter") {
      const id = generateId();

      if (partsArray) {
        setPartsArray([...partsArray, { value: part, id }]);
      } else {
        setPartsArray([{ value: part, id }]);
      }

      setPart("");
    }
  };

  const handlePartChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPart(event.target.value);
  };

  const handleDeleteChipClick = (id: string) => {
    setPartsArray((prevArray) => prevArray.filter((part) => part.id !== id));
  };

  const handleAddressComplete = (data: any, input: string) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    if (input === "practice") {
      setValue("practice.address", fullAddress);
    } else if (input === "stage") {
      setValue("stage.address", fullAddress);
    }
  };

  const handleAddressInputClick = (input: string) => {
    open({ onComplete: (data) => handleAddressComplete(data, input) });
  };

  console.log(addressValue);

  return (
    <EditRecruitContainer>
      <Form>
        <TitleWrapper>
          <Title>
            <Text>새 모집 공고 올리기</Text>
            <SubText>
              <RedDot /> 표시는 필수 입력 항목입니다.
            </SubText>
          </Title>
          <ButtonsWrapper>
            <Button
              variation="text"
              btnClass="assistive"
              width={58}
              height={32}
              fontSize={15}
              padding="0px 3px"
              lineHeight={146.7}
              letterSpacing={0.96}
            >
              미리보기
            </Button>
            <Button
              variation="outlined"
              btnClass="primary"
              width={94}
              height={40}
              fontSize={15}
              padding="9px 20px"
              lineHeight={146.7}
              letterSpacing={0.96}
            >
              임시저장
            </Button>
            <Button
              variation="solid"
              btnClass="primary"
              width={81}
              height={40}
              fontSize={15}
              padding="9px 20px"
              lineHeight={146.7}
              letterSpacing={0.96}
            >
              올리기
            </Button>
          </ButtonsWrapper>
        </TitleWrapper>
        <MiddleTitle>공고정보</MiddleTitle>
        <InputWrapper>
          <RequiredLabel>
            공고명
            <RequiedRedDot />
          </RequiredLabel>
          <Input
            $isDirty={Boolean(dirtyFields.title)}
            $isError={Boolean(errors.title)}
            placeholder="공고명을 입력해주세요"
          />
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            모집 배역
            <RequiedRedDot />
          </RequiredLabel>
          <ChipInputWrapper $isDirty={Boolean(partsArray)} $isError={false}>
            {partsArray?.map(({ value, id }) => (
              <Chip key={id}>
                {value}
                <DeleteIconWrapper onClick={() => handleDeleteChipClick(id)}>
                  <DeleteSVG />
                </DeleteIconWrapper>
              </Chip>
            ))}
            <ChipInput
              onChange={handlePartChange}
              onKeyDown={handlePartsKeyDown}
              placeholder="배역명을 입력 후 Enter를 눌러주세요."
              value={part}
            />
          </ChipInputWrapper>
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            공고 상세 내용
            <RequiedRedDot />
          </RequiredLabel>
          <TextAreaWrapper
            $isDirty={Boolean(dirtyFields.introduce)}
            $isError={Boolean(errors.introduce)}
          >
            <TextAreaInput placeholder="공고 내용을 작성해주세요" />
            <Counter>0/ 3000</Counter>
          </TextAreaWrapper>
        </InputWrapper>
        <InputWrapper>
          <Label>공고 관련 이미지</Label>
        </InputWrapper>
        <PairInputWrapper>
          <InputWrapper>
            <RequiredLabel>
              연습기간
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper
              $isDirty={Boolean(dirtyFields.practice?.start)}
              $isError={false}
            >
              <WithIconHalfInput type="date" />
              <CalendarSVG />
            </WithIconInputWrapper>
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              연습요일
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper $isDirty={false} $isError={false}>
              <WithIconHalfInput />
              <CalendarSVG />
            </WithIconInputWrapper>
          </InputWrapper>
        </PairInputWrapper>
        <InputWrapper>
          <RequiredLabel>
            연습위치
            <RequiedRedDot />
          </RequiredLabel>
          <FakeInput
            onClick={() => handleAddressInputClick("practice")}
            $isDirty={false}
          >
            {addressValue || "클릭해서 주소를 검색해주세요."}
          </FakeInput>
          <Input
            type="text"
            $isDirty={Boolean(dirtyFields.practice?.addressDetail)}
            $isError={Boolean(errors.practice?.addressDetail)}
          />
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            월회비
            <RequiedRedDot />
          </RequiredLabel>
        </InputWrapper>
        <Divider />
        <MiddleTitle>작품정보</MiddleTitle>
        <PairInputWrapper>
          <InputWrapper>
            <RequiredLabel>
              카테고리
              <RequiedRedDot />
            </RequiredLabel>
            <ShortInput $isDirty={false} $isError={false} />
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              작품명
              <RequiedRedDot />
            </RequiredLabel>
            <MiddleInput
              $isDirty={false}
              $isError={false}
              type="text"
              placeholder="작품명을 입력해주세요"
            />
          </InputWrapper>
        </PairInputWrapper>
        <InputWrapper>
          <RequiredLabel>
            공연기간
            <RequiedRedDot />
          </RequiredLabel>
          <WithIconInputWrapper
            $isDirty={Boolean(dirtyFields.stage?.start)}
            $isError={false}
          >
            <WithIconHalfInput type="date" />
            <CalendarSVG />
          </WithIconInputWrapper>
        </InputWrapper>
        <InputWrapper>
          <RequiredLabel>
            공연위치
            <RequiedRedDot />
          </RequiredLabel>
          <FakeInput
            onClick={() => handleAddressInputClick("stage")}
            $isDirty={false}
          >
            {addressValue || "클릭해서 주소를 검색해주세요."}
          </FakeInput>
          <Input
            type="text"
            $isDirty={Boolean(dirtyFields.practice?.addressDetail)}
            $isError={Boolean(errors.practice?.addressDetail)}
          />
        </InputWrapper>
      </Form>
    </EditRecruitContainer>
  );
};

export default EditRecruit;

const EditRecruitContainer = styled.div`
  width: 692px;
  margin: 88px 244px 100px 244px;
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

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 17px;
  align-items: center;
`;

const MiddleTitle = styled.div`
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  color: #000000;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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

const Input = styled.input<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: ${({ $isDirty, $isError }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0E2"};
  outline: none;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const TextAreaWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 692px;
  height: 302px;
  border: 1px solid #e0e0e2;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const TextAreaInput = styled.textarea`
  width: 660px;
  height: 248px;
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

const Label = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #171719;
`;

const PairInputWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const WithIconInputWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 340px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  display: flex;
  gap: 12px;
  border: ${({ $isDirty, $isError }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0E2"};
`;

const WithIconHalfInput = styled.input`
  width: 272px;
  height: 24px;
  border: none;
  outline: none;
`;

const FakeInput = styled.div<{ $isDirty: boolean }>`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  border: ${({ $isDirty }) =>
    $isDirty ? "1px solid #000000" : "1px solid #e0e0E2"};
  color: ${({ $isDirty }) => ($isDirty ? "#171719;" : "#dadada;")};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e2;
`;

const ShortInput = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 220px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: ${({ $isDirty, $isError }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0E2"};
  outline: none;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const MiddleInput = styled.input<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 460px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: ${({ $isDirty, $isError }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0E2"};
  outline: none;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const ChipInputWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
  width: 692px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  display: flex;
  align-items: center;
  color: #171719;
  border: ${({ $isDirty, $isError }) =>
    $isError
      ? "1px solid #FF4242"
      : $isDirty
      ? "1px solid #000000"
      : "1px solid #e0e0E2"};
  outline: none;
  display: flex;
  gap: 12px;
  overflow: scroll;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const Chip = styled.div`
  width: fit-content;
  height: 32px;
  display: flex;
  gap: 3px;
  padding: 6px 12px;
  background-color: #f8f8f8;
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
  letter-spacing: 1.45%;
  color: #171719;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ChipInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: #171719;
  border: none;
  outline: none;

  ::placeholder {
    color: #dadada;
    font-size: 16px;
    line-height: 162.5%;
    letter-spacing: 0.57%;
  }
`;

const DeleteIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
