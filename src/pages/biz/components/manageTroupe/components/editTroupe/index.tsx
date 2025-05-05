/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@/components/buttons/button';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import CalendarSVG from '@assets/icons/calendar.svg?react';
import TipSVG from '@assets/icons/tip.svg?react';
import CompanySVG from '@assets/icons/company.svg?react';

import Datepicker from '@/components/datepicker';
import InvalidFileModal from '../invalidFileModal';
import { useEditTroupe } from './hooks/useEditTroupe';

interface EditTroupeProps {
  isInitial: boolean;
}

export default function EditTroupe({ isInitial }: EditTroupeProps) {
  const {
    register,
    handleSubmit,
    errors,
    dirtyFields,
    isValid,
    control,
    inputLogoFileRef,
    inputCoverFileRef,
    inputRegistrationFileRef,
    datepickerRef,
    logoPreview,
    coverFileName,
    registrationFileName,
    isInvalidaModalShowing,
    date,
    descriptionValue,
    addressValue,
    isLoading,
    handleCalendarClick,
    handleDateChange,
    handleLogoInputClick,
    handleCoverInputClick,
    handleRegistrationInputClick,
    handleInvalidConfirm,
    handleLogoFileChange,
    handleCoverFileChange,
    handleRegistrationFileChange,
    handleAddressInputClick,
    onSubmitEdit,
  } = useEditTroupe(isInitial);

  if (isLoading) return <>loading</>;

  return (
    <EditTroupeContainer>
      {isInvalidaModalShowing && <InvalidFileModal onConfirm={handleInvalidConfirm} />}
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
            disabled={!isValid}
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
              {...register('logoImg', { required: true })}
              accept="image/*"
              ref={inputLogoFileRef}
              onChange={handleLogoFileChange}
            />
            <Button
              variation="outlined"
              btnClass="assistive"
              padding="7px 19px"
              width={88}
              height={32}
              fontSize={13}
              fontWeight={'var(--font-medium)'}
              onClick={handleLogoInputClick}
              type="button"
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
            <CoverFileName>{coverFileName}</CoverFileName>
            <FileInput
              type="file"
              {...register('coverImg')}
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
              fontWeight={'var(--font-medium)'}
              onClick={handleCoverInputClick}
              type="button"
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
              {...register('name', { required: true })}
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
              <Controller
                name="publishDate"
                control={control}
                defaultValue={date?.toLocaleDateString()}
                render={({ field }) => (
                  <Datepicker
                    ref={datepickerRef}
                    selectedDate={date!}
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
                    pickerText="설립일자를 입력해주세요"
                  />
                )}
              />
              <IconWrapper onClick={handleCalendarClick}>
                <CalendarSVG />
              </IconWrapper>
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
              {...register('description', { required: true, maxLength: 3000 })}
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
          <FakeInput onClick={handleAddressInputClick} $isDirty={Boolean(addressValue)}>
            {addressValue || '클릭해서 주소를 검색해주세요.'}
          </FakeInput>
          <Input
            {...register('addressDetail')}
            type="text"
            $isDirty={Boolean(dirtyFields.addressDetail)}
            $isError={Boolean(errors.addressDetail)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>사업자 등록 번호</Label>
          <Input
            {...register('registrationNumber')}
            type="text"
            $isDirty={Boolean(dirtyFields.registrationNumber)}
            $isError={Boolean(errors.registrationNumber)}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>사업자 등록증</Label>
          <WithBtnInputWrapper>
            <FakeWithBtnInput $isFileUploaded={Boolean(registrationFileName)}>
              {registrationFileName}
            </FakeWithBtnInput>
            <FileInput
              type="file"
              {...register('registrationFile')}
              ref={inputRegistrationFileRef}
              accept=".jpg,.png,.pdf"
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
              type="button"
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
              {...register('picName', { required: true })}
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
              {...register('picCell', { required: true })}
              $isDirty={Boolean(dirtyFields.picCell)}
              $isError={Boolean(errors.picCell)}
            />
          </InputWrapper>
        </TwoInputWrapper>
        <InputWrapper>
          <Label>극단 이메일</Label>
          <Input
            {...register('email')}
            $isDirty={Boolean(dirtyFields.email)}
            $isError={Boolean(errors.email)}
          />
          <FileGuide>유저 문의, 답변 등에 사용할 극단 공식 이메일 정보를 입력해주세요</FileGuide>
        </InputWrapper>
        <InputWrapper>
          <Label>극단 웹사이트</Label>
          <Input
            {...register('website')}
            $isDirty={Boolean(dirtyFields.website)}
            $isError={Boolean(errors.website)}
          />
          <FileGuide>
            홈페이지, SNS 페이지, Youtube등 극단정보가 담긴 홍보 웹사이트 정보를 입력해주세요.
          </FileGuide>
        </InputWrapper>
      </Form>
    </EditTroupeContainer>
  );
}

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

const Form = styled.form`
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
  border: ${({ $isDirty }) => ($isDirty ? '1px solid #000000' : '1px solid #e0e0E2')};
  color: ${({ $isDirty }) => ($isDirty ? '#171719;' : '#dadada;')};
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
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
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
  color: ${({ $isFileUploaded }) => ($isFileUploaded ? '#171719;' : '#dadada;')};
  border: ${({ $isFileUploaded }) =>
    $isFileUploaded ? '1px solid #000000;' : '1px solid #e0e0e2;'};
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
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
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
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  border: ${({ $isDirty, $isError }) =>
    $isError ? '1px solid #FF4242' : $isDirty ? '1px solid #000000' : '1px solid #e0e0E2'};
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
  margin-bottom: 8px;
`;

const PreviewImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const CoverFileName = styled.div`
  width: fit-content;
  min-width: 100px;
  height: 32px;
  padding: 6px 12px;
  border-radius: 6px;
  background-color: #f8f8f8;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  color: #171719;
  font-weight: var(--font-medium);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;
