import Button from "@/components/buttons/button";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import CalendarSVG from "@assets/icons/calendar.svg?react";
import TipSVG from "@assets/icons/tip.svg?react";
import CompanySVG from "@assets/icons/company.svg?react";
import { ChangeEvent, useRef, useState } from "react";
import {
  requestEditTroupe,
  requestUploadCover,
  requestUploadLogo,
  requestUploadRegistration,
} from "@/api/biz";
import {
  convertFileToBinaryData,
  convertFileToURL,
  seperateFileNameFromPath,
} from "@/utils/file";
import { useDaumPostcodePopup } from "react-daum-postcode";

interface EditTroupeInputs {
  name: string;
  publishDate: string;
  description: string;
  address: string;
  addressDetail: string;
  registrationNumber: string;
  registrationFile: string;
  picName: string;
  picCell: string;
  email: string;
  website: string;
  logoImg: string;
  coverImg: string;
}

const EditTroupe = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    watch,
    setValue,
    // trigger,
    getValues,
  } = useForm<EditTroupeInputs>({ mode: "all" });

  const open = useDaumPostcodePopup();

  const inputLogoFileRef = useRef<HTMLInputElement | null>(null);
  const inputCoverFileRef = useRef<HTMLInputElement | null>(null);
  const inputRegistrationFileRef = useRef<HTMLInputElement | null>(null);

  const [logoFile, setLogoFile] = useState<string>();
  const [logoPreview, setLogoPreview] = useState<string>();
  const [coverFile, setCoverFile] = useState<string>();
  const [registrationFile, setRegistrationFile] = useState<string>();
  const [regstratironFileName, setRegistrationFileName] = useState<string>();

  const [descriptionValue, addressValue] = watch(["description", "address"]);

  const handleLogoInputClick = () => {
    if (inputLogoFileRef.current) {
      inputLogoFileRef.current.click();
    }
  };

  const handleCoverInputClick = () => {
    if (inputCoverFileRef.current) {
      inputCoverFileRef.current.click();
    }
  };

  const handleRegistrationInputClick = () => {
    if (inputRegistrationFileRef.current) {
      inputRegistrationFileRef.current.click();
    }
  };

  const onSubmitEdit = async (data: EditTroupeInputs) => {
    await requestUploadFiles();

    const res = await requestEditTroupe(data);

    console.log(res);
  };

  const requestUploadFiles = async () => {
    if (logoFile) {
      const url = await requestUploadLogo({ file: logoFile });
      setValue("logoImg", url);
    }

    if (coverFile) {
      const url = await requestUploadCover({ file: coverFile });
      setValue("coverImg", url);
    }

    if (registrationFile) {
      requestUploadRegistration({ file: registrationFile });
    }
  };

  const handleLogoFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const binaryFile = await convertFileToBinaryData(file);
      const url = convertFileToURL(file);
      setLogoFile(binaryFile);
      setLogoPreview(url);
    }
  };

  const handleCoverFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const binaryFile = await convertFileToBinaryData(file);

      setCoverFile(binaryFile);
    }
  };

  const handleRegistrationFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    const path = event.target.value;

    if (file) {
      const binaryFile = await convertFileToBinaryData(file);
      const fileName = seperateFileNameFromPath(path);
      console.log(fileName);
      setRegistrationFile(binaryFile);
      setRegistrationFileName(fileName);
    }
  };

  const handleAddressComplete = (data: any) => {
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

    setValue("address", fullAddress);
  };

  const handleAddressInputClick = () => {
    open({ onComplete: handleAddressComplete });
  };

  return (
    <EditTroupeContainer>
      <Form onSubmit={handleSubmit(onSubmitEdit)}>
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
            type="submit"
          >
            저장
          </Button>
        </TitleWrapper>
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
            {logoPreview ? (
              <PreviewImage src={logoPreview} />
            ) : (
              <PreviewEmptyWrapper>
                <CompanySVG />
              </PreviewEmptyWrapper>
            )}
            <FileInput
              type="file"
              {...register("logoImg", { required: true })}
              ref={inputLogoFileRef}
              accept="image/*"
              onChange={handleLogoFileChange}
            />
            <Button
              variation="outlined"
              btnClass="assistive"
              padding="7px 19px"
              width={88}
              height={32}
              fontSize={13}
              fontWeight={"var(--font-medium)"}
              onClick={handleLogoInputClick}
            >
              파일선택
            </Button>
          </ImageFileInputWrapper>
          <ImageFileInputWrapper>
            <LabelWrapper>
              <Label>커버 이미지</Label>
              <TipSVG />
            </LabelWrapper>
            <FileGuide>극단을 표현하는 이미지를 설정해보세요.</FileGuide>
            <FileInput
              type="file"
              {...register("coverImg")}
              ref={inputCoverFileRef}
              accept="image/*"
              onChange={handleCoverFileChange}
            />
            <Button
              variation="outlined"
              btnClass="assistive"
              padding="7px 19px"
              width={88}
              height={32}
              fontSize={13}
              fontWeight={"var(--font-medium)"}
              onClick={handleCoverInputClick}
            >
              파일선택
            </Button>
          </ImageFileInputWrapper>
        </ImageFileInputs>
        <TwoInputWrapper>
          <InputWrapper>
            <RequiredLabel>
              극단명
              <RequiedRedDot />
            </RequiredLabel>
            <HalfInput
              {...register("name", { required: true })}
              type="text"
              $isDirty={Boolean(dirtyFields.email)}
              $isError={Boolean(errors.name)}
            />
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              설립일자
              <RequiedRedDot />
            </RequiredLabel>
            <WithIconInputWrapper
              $isDirty={Boolean(dirtyFields.publishDate)}
              $isError={Boolean(errors.publishDate)}
            >
              <WithIconHalfInput
                {...register("publishDate", { required: true })}
                type="date"
              />
              <CalendarSVG />
            </WithIconInputWrapper>
          </InputWrapper>
        </TwoInputWrapper>
        <InputWrapper>
          <RequiredLabel>
            극단소개
            <RequiedRedDot />
          </RequiredLabel>
          <TextAreaWrapper
            $isDirty={Boolean(dirtyFields.description)}
            $isError={Boolean(errors.description)}
          >
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
          <FakeInput
            onClick={handleAddressInputClick}
            $isDirty={Boolean(addressValue)}
          >
            {addressValue || "클릭해서 주소를 검색해주세요."}
          </FakeInput>
          <Input
            {...register("addressDetail")}
            type="text"
            $isDirty={Boolean(dirtyFields.addressDetail)}
            $isError={Boolean(errors.addressDetail)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>사업자 등록 번호</Label>
          <Input
            {...register("registrationNumber")}
            type="text"
            $isDirty={Boolean(dirtyFields.registrationNumber)}
            $isError={Boolean(errors.registrationNumber)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>사업자 등록증</Label>
          <WithBtnInputWrapper>
            <FakeWithBtnInput $isFileUploaded={Boolean(registrationFile)}>
              {regstratironFileName}
            </FakeWithBtnInput>
            <FileInput
              type="file"
              {...register("registrationFile")}
              ref={inputRegistrationFileRef}
              accept="image/*, .pdf"
              onChange={handleRegistrationFileChange}
            />
            <Button
              variation="outlined"
              btnClass="primary"
              width={160}
              height={48}
              fontSize={16}
              padding="12px 0px"
              letterSpacing={0.57}
              lineHeight={150}
              onClick={handleRegistrationInputClick}
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
            <HalfInput
              {...register("picName", { required: true })}
              $isDirty={Boolean(dirtyFields.picName)}
              $isError={Boolean(errors.picName)}
            />
          </InputWrapper>
          <InputWrapper>
            <RequiredLabel>
              담당자 연락처
              <RequiedRedDot />
            </RequiredLabel>
            <HalfInput
              {...register("picCell", { required: true })}
              $isDirty={Boolean(dirtyFields.picCell)}
              $isError={Boolean(errors.picCell)}
            />
          </InputWrapper>
        </TwoInputWrapper>
        <InputWrapper>
          <Label>극단 이메일</Label>
          <Input
            {...register("email")}
            $isDirty={Boolean(dirtyFields.email)}
            $isError={Boolean(errors.email)}
          />
          <FileGuide>
            유저 문의, 답변 등에 사용할 극단 공식 이메일 정보를 입력해주세요
          </FileGuide>
        </InputWrapper>
        <InputWrapper>
          <Label>극단 웹사이트</Label>
          <Input
            {...register("website")}
            $isDirty={Boolean(dirtyFields.website)}
            $isError={Boolean(errors.website)}
          />
          <FileGuide>
            홈페이지, SNS 페이지, Youtube등 극단정보가 담긴 홍보 웹사이트 정보를
            입력해주세요.
          </FileGuide>
        </InputWrapper>
      </Form>
    </EditTroupeContainer>
  );
};

export default EditTroupe;

const EditTroupeContainer = styled.div`
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

const WithBtnInputWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const FakeWithBtnInput = styled.div<{ $isFileUploaded: boolean }>`
  width: 520px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
  color: ${({ $isFileUploaded }) =>
    $isFileUploaded ? "#171719;" : "#dadada;"};
  border: ${({ $isFileUploaded }) =>
    $isFileUploaded ? "1px solid #000000;" : "1px solid #e0e0e2;"};
`;

const HalfInput = styled.input<{ $isDirty: boolean; $isError: boolean }>`
  width: 340px;
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

const TextAreaWrapper = styled.div<{
  $isDirty: boolean;
  $isError: boolean;
}>`
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

const PreviewEmptyWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`;

const PreviewImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`;

const FileInput = styled.input`
  display: none;
`;
