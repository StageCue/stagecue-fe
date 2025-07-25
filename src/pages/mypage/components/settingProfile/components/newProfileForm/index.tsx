import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Button from '@/components/buttons/button';
import { useCallback, useEffect, useState } from 'react';
import SlashSVG from '@assets/icons/slash.svg?react';
import EditSVG from '@assets/icons/edit.svg?react';
import RequiredSVG from '@assets/icons/required_orange.svg?react';
import TrashSVG from '@assets/icons/trash_lg.svg?react';
import { useNavigate } from 'react-router-dom';
import {
  requestCreateProfile,
  requestProfileDefault,
  requestUploadImage,
  requestUploadThumbnail,
} from '@/api/users';
import useSessionStore from '@/store/session';
import ModalPortal from '@/components/modal/portal';
import SubmitModal from '../modals/submitModal';
import { useDropzone } from 'react-dropzone';
import { convertFileToURL } from '@/utils/file';
import CloseSVG from '@assets/icons/close_black.svg?react';
import ImageSVG from '@assets/icons/image.svg?react';
import { generateId } from '@/utils/dev';
import LoadingModal from '@/components/modal/\bLoading/Loading';
import { calculateAge } from '@/utils/calculateAge';

export interface ProfileInput {
  birthday: string;
  experiences: ExpInput[];
  height: number;
  weight: number;
  introduce: string;
  title: string;
  images: string[];
  thumbnail: string;
  isDefault: boolean;
}

interface ExpInput {
  id: string;
  artworkName: string;
  artworkPart: string;
  troupe: string;
  startDate: string;
  endDate: string;
}

const NewProfileForm = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState<boolean>(false);
  const [isEditIntroduce, setIsEditIntroduce] = useState<boolean>(false);
  const [editingExpId, setEditingExpId] = useState<string>('');
  const [isAddExp, setIsAddExp] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>();
  const [imageUrlArray, setImageUrlArray] = useState<{ url: string; id: string }[]>([]);
  const [imageFileArray, setImageFileArray] = useState<{ file: File; id: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, setValue, watch } = useForm<ProfileInput>();
  const {
    register: expRegister,
    watch: expWatch,
    reset: expReset,
    setValue: expSetValue,
  } = useForm<ExpInput>();

  const onDropThumbnail = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = convertFileToURL(file);
      setThumbnailFile(file);
      setThumbnailPreview(url);
    }
  }, []);
  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps } =
    useDropzone({
      onDrop: onDropThumbnail,
    });

  const onDropImages = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const url = convertFileToURL(file);
      const id = generateId();
      setImageFileArray(prev => [...prev, { file, id }]);
      setImageUrlArray(prev => [...prev, { url, id }]);
    }
  }, []);
  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onDropImages,
  });

  const requestUploadImageFiles = async () => {
    if (imageFileArray.length !== 0) {
      try {
        const urls = await Promise.all(
          imageFileArray.map(async item => {
            const formData = new FormData();

            if (!item.file) {
              throw new Error('파일이 없습니다.');
            }
            formData.append('file', item.file);

            const { result } = await requestUploadImage(formData);

            if (!result) {
              throw new Error('이미지 URL을 받지 못했습니다.');
            }

            return result;
          })
        );
        setValue('images', urls);
        return urls;
      } catch (error) {
        console.error('Error uploading images:', error);
        return [];
      }
    }
  };

  const requestUploadThumbnailFile = async () => {
    if (thumbnailFile) {
      try {
        const formData = new FormData();
        formData.append('file', thumbnailFile);

        const { result } = await requestUploadThumbnail(formData);

        if (!result) {
          throw new Error('썸네일 URL을 받지 못했습니다.');
        }

        setValue('thumbnail', result);
        return result;
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
        return '';
      }
    }
  };

  const [titleValue, weightValue, heightValue, introduceValue, experiencesValue, thumbnailValue] =
    watch(['title', 'weight', 'height', 'introduce', 'experiences', 'thumbnail', 'images']);

  const [artworkNameValue, artworkPartValue, troupeValue, startDateValue, endDateValue] = expWatch([
    'artworkName',
    'artworkPart',
    'troupe',
    'startDate',
    'endDate',
  ]);

  const handleInfoEditClick = (section: string) => {
    if (section === 'personalInfo') {
      setIsEditPersonalInfo(true);
    } else if (section === 'introduce') {
      setIsEditIntroduce(true);
    }
  };

  const handleSaveExpClick = () => {
    const newExp = {
      id: generateId(),
      artworkName: artworkNameValue,
      artworkPart: artworkPartValue,
      troupe: troupeValue,
      startDate: startDateValue,
      endDate: endDateValue,
    };
    if (experiencesValue) {
      setValue('experiences', [...experiencesValue, newExp]);
    } else {
      setValue('experiences', [newExp]);
    }

    setIsAddExp(false);
  };

  const handleSaveClick = (section: 'personalInfo' | 'introduce') => {
    if (section === 'personalInfo') {
      setIsEditPersonalInfo(false);
    } else if (section === 'introduce') {
      setIsEditIntroduce(false);
    }
  };

  const handleEditExpClick = (id: string) => {
    setEditingExpId(id);
    setIsAddExp(false);
  };

  const handleDeleteExpClick = (id: string) => {
    const filteredExpArr = experiencesValue.filter(exp => exp.id !== id);
    setValue('experiences', filteredExpArr);
  };

  const handleAddExpClick = () => {
    setIsAddExp(true);
    setEditingExpId('');
    expReset();
  };

  const handleSubmitClick = async () => {
    setIsSubmitModalOpen(true);
  };

  const createProfile = async (data: ProfileInput, isDefault: boolean) => {
    const { experiences, height, weight, introduce, title } = data;
    const sanitizedExperiences = experiences?.map(
      ({ artworkName, artworkPart, troupe, startDate, endDate }) => ({
        artworkName,
        artworkPart,
        troupeName: troupe,
        startDate: `${startDate}-01`,
        endDate: `${endDate}-01`,
      })
    );
    const imageUrls = (await requestUploadImageFiles()) ?? [];
    const thumbnailUrl = await requestUploadThumbnailFile();

    return {
      id: 0,
      birthDay: sessionStore?.birthday as string,
      age: calculateAge(sessionStore?.birthday as string),
      name: sessionStore?.username as string,
      height: Number(height),
      weight: Number(weight),
      phoneNumber: sessionStore?.phoneNumber as string,
      email: sessionStore?.email as string,
      title,
      introduce,
      thumbnail: (thumbnailUrl ? thumbnailUrl : thumbnailValue) ?? '',
      images: imageUrls as string[],
      experiences: sanitizedExperiences,
      isDefault,
    };
  };

  const handleConfirmClick = async (data: ProfileInput) => {
    try {
      setIsLoading(true);
      const params = await createProfile(data, true);
      const { result } = await requestCreateProfile(params);

      await requestProfileDefault(result);
      setIsLoading(false);

      if (result) {
        navigate(`/mypage/profiles/${result}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseClick = async (data: ProfileInput) => {
    try {
      setIsLoading(true);
      const params = await createProfile(data, false);
      const { result } = await requestCreateProfile(params);

      setIsLoading(false);
      if (result) {
        navigate(`/mypage/profiles/${result}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return value;
  };

  const handleDeleteThumbanailClick = () => {
    setThumbnailFile(null);
    setThumbnailPreview('');
  };

  const handleDeleteImageClick = (id: string) => {
    setImageUrlArray(prevArray => prevArray.filter(item => item.id !== id));
    setImageFileArray(prevArray => prevArray.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (editingExpId && experiencesValue.length !== 0) {
      const exp = experiencesValue.find(exp => exp.id === editingExpId);

      expSetValue('artworkName', exp!.artworkName);
      expSetValue('artworkPart', exp!.artworkPart);
      expSetValue('startDate', exp!.startDate);
      expSetValue('endDate', exp!.endDate);
      expSetValue('troupe', exp!.troupe);
      expSetValue('id', exp!.id);
    }
  }, [editingExpId, expSetValue, experiencesValue]);

  const isDisabled =
    !titleValue || !weightValue || !heightValue || !introduceValue || !experiencesValue?.length;

  const isSaveDisabled =
    !artworkNameValue || !artworkPartValue || !troupeValue || !startDateValue || !endDateValue;

  return (
    <NewProfileFormContainer>
      {isLoading && <LoadingModal />}
      {isSubmitModalOpen && (
        <ModalPortal>
          <SubmitModal
            onClose={handleCloseClick}
            onConfirm={handleConfirmClick}
            handleSubmit={handleSubmit}
          />
        </ModalPortal>
      )}
      <Form>
        <ProfileHeaderWrapper>
          <TitleWrapper>
            <TitleInput {...register('title', { required: true, value: titleValue })} />
            <Button
              type="button"
              variation="solid"
              btnClass="primary"
              width={180}
              height={48}
              onClick={handleSubmitClick}
              disabled={isDisabled}
            >
              프로필 저장
            </Button>
          </TitleWrapper>
        </ProfileHeaderWrapper>
        <Body>
          <InformationWrapper>
            <InfoTitleWrapper>
              <InfoTitle>기본 정보</InfoTitle>
            </InfoTitleWrapper>
            <InfoBox>
              <BasicInfoWrapper>
                {thumbnailPreview ? (
                  <ThumbnailWrapper>
                    <CloseIconWrapper onClick={handleDeleteThumbanailClick}>
                      <CloseSVG />
                    </CloseIconWrapper>
                    <ThumbnailImage src={thumbnailPreview}></ThumbnailImage>
                  </ThumbnailWrapper>
                ) : (
                  <ThumbnailDropzone {...getThumbnailRootProps()}>
                    <ImageSVG />
                    <DropzoneText>{`파일을 선택하거나 \n 여기로 끌어다 놓으세요`}</DropzoneText>
                    <ThumbnailInput {...getThumbnailInputProps()} />
                  </ThumbnailDropzone>
                )}
                <PersonalInfoBox>
                  <EditIconAbsWrapper onClick={() => handleInfoEditClick('personalInfo')}>
                    {!isEditPersonalInfo && <EditSVG />}
                  </EditIconAbsWrapper>
                  <DataRows>
                    <DataRow>
                      <Property>생년월일</Property>
                      <Value>
                        {sessionStore.birthday} ({calculateAge(sessionStore.birthday!)}세)
                      </Value>
                    </DataRow>
                    <DataRow>
                      <Property>이름</Property>
                      <Value>{sessionStore.username}</Value>
                    </DataRow>
                    <DataRow>
                      <Property>신체정보</Property>
                      <HeightAndWeight>
                        <ValueWrapper>
                          {!isEditPersonalInfo ? (
                            <Value>{heightValue}</Value>
                          ) : (
                            <BodyInfoInput
                              {...register('height', { required: true })}
                              placeholder="키"
                            />
                          )}
                          <Unit>cm</Unit>
                        </ValueWrapper>
                      </HeightAndWeight>
                      <SlashSVG />
                      <HeightAndWeight>
                        <ValueWrapper>
                          {!isEditPersonalInfo ? (
                            <Value>{weightValue}</Value>
                          ) : (
                            <BodyInfoInput
                              {...register('weight', {
                                required: true,
                              })}
                              placeholder="몸무게"
                            />
                          )}
                          <Unit>kg</Unit>
                        </ValueWrapper>
                      </HeightAndWeight>
                    </DataRow>
                  </DataRows>
                  {isEditPersonalInfo && (
                    <Button
                      variation="outlined"
                      btnClass="primary"
                      width={53}
                      height={32}
                      padding="7px 14px"
                      fontSize={13}
                      lineHeight={138.5}
                      letterSpacing={1.94}
                      onClick={() => handleSaveClick('personalInfo')}
                      type="button"
                    >
                      저장
                    </Button>
                  )}
                </PersonalInfoBox>
                <PersonalInfoBox>
                  <DataRows>
                    <ContactDataRow>
                      <ContactValueWrapper>
                        <Property>연락처</Property>
                        <Value>{formatPhoneNumber(sessionStore.phoneNumber!)}</Value>
                      </ContactValueWrapper>
                      <Button
                        type="button"
                        variation="outlined"
                        btnClass="assistive"
                        width={90}
                        height={42}
                        padding="7px 14px"
                        fontSize={13}
                        lineHeight={138.5}
                        letterSpacing={1.94}
                        onClick={() =>
                          navigate('/mypage', {
                            state: { menu: '기본정보 변경', type: '휴대폰 번호' },
                          })
                        }
                      >
                        연락처 변경
                      </Button>
                    </ContactDataRow>
                    <ContactDataRow>
                      <ContactValueWrapper>
                        <Property>이메일</Property>
                        <Value>{sessionStore.email}</Value>
                      </ContactValueWrapper>
                      <Button
                        type="button"
                        variation="outlined"
                        btnClass="assistive"
                        width={90}
                        height={42}
                        padding="7px 14px"
                        fontSize={13}
                        lineHeight={138.5}
                        letterSpacing={1.94}
                        onClick={() =>
                          navigate('/mypage', { state: { menu: '기본정보 변경', type: '이메일' } })
                        }
                      >
                        이메일 변경
                      </Button>
                    </ContactDataRow>
                  </DataRows>
                </PersonalInfoBox>
              </BasicInfoWrapper>
            </InfoBox>
          </InformationWrapper>
          <InformationWrapper>
            <WithButtonTitleWrapper>
              <WithButtonTextWrapper>
                <InfoTitle>자기 소개</InfoTitle>
                <GuideText>(최대 3000자)</GuideText>
              </WithButtonTextWrapper>
              {!isEditIntroduce ? (
                <EditIconWrapper onClick={() => handleInfoEditClick('introduce')}>
                  <EditSVG />
                </EditIconWrapper>
              ) : (
                <Button
                  variation="outlined"
                  btnClass="primary"
                  width={53}
                  height={32}
                  padding="7px 14px"
                  fontSize={13}
                  lineHeight={138.5}
                  letterSpacing={1.94}
                  onClick={() => handleSaveClick('introduce')}
                >
                  저장
                </Button>
              )}
            </WithButtonTitleWrapper>
            {isEditIntroduce ? (
              <IntroduceInput
                {...register('introduce', {
                  required: true,
                })}
                placeholder="자기소개서 내용을 작성해주세요 (최대 3000자)"
              />
            ) : (
              <IntroduceBox>{introduceValue}</IntroduceBox>
            )}
          </InformationWrapper>
          <InformationWrapper>
            <WithButtonTitleWrapper>
              <WithButtonTextWrapper>
                <InfoTitle>경력</InfoTitle>
                <GuideText>
                  표시된 항목은 필수작성 내용입니다.
                  <RequiredWrapper>
                    <RequiredSVG />
                  </RequiredWrapper>
                </GuideText>
              </WithButtonTextWrapper>
              <Button
                variation="solid"
                btnClass="primary"
                width={93}
                height={40}
                padding="9px 20px"
                fontSize={15}
                letterSpacing={0.96}
                lineHeight={146.7}
                disabled={isAddExp || experiencesValue?.length >= 2}
                onClick={handleAddExpClick}
              >
                경력추가
              </Button>
            </WithButtonTitleWrapper>
            <ExpGrid>
              {experiencesValue?.map((exp, index) => (
                <ExpBox key={index}>
                  <ExpDataWrapper>
                    <DataRow>
                      <Property>작품제목</Property>
                      <Value>{exp.artworkName}</Value>
                    </DataRow>
                    <DataRow>
                      <Property>배역</Property>
                      <Value>{exp.artworkPart}</Value>
                    </DataRow>
                    <DataRow>
                      <Property>극단</Property>
                      <Value>{exp.troupe}</Value>
                    </DataRow>
                    <DataRow>
                      <Property>기간</Property>
                      <Value>
                        {exp.startDate} ~ {exp.endDate}
                      </Value>
                    </DataRow>
                  </ExpDataWrapper>
                  <ExpIconsWrapper>
                    <TrashIconWrapper onClick={() => handleDeleteExpClick(exp.id)}>
                      <TrashSVG />
                    </TrashIconWrapper>
                    <EditIconWrapper onClick={() => handleEditExpClick(exp.id)}>
                      <EditSVG />
                    </EditIconWrapper>
                  </ExpIconsWrapper>
                </ExpBox>
              ))}
              {isAddExp && (
                <ExpFormBox>
                  <FormLabel>
                    <DataRows>
                      <DataRow>
                        <FormLabel>
                          작품제목
                          <RequiredWrapper>
                            <RequiredSVG />
                          </RequiredWrapper>
                        </FormLabel>
                        <ExpTextInput
                          {...expRegister('artworkName', { required: true })}
                          placeholder="작품제목을 입력해주세요."
                        />
                      </DataRow>
                      <DataRow>
                        <FormLabel>
                          배역
                          <RequiredWrapper>
                            <RequiredSVG />
                          </RequiredWrapper>
                        </FormLabel>
                        <ExpTextInput
                          {...expRegister('artworkPart', { required: true })}
                          placeholder="맡은 배역을 입력해주세요. 예) 주연"
                        />
                      </DataRow>
                      <DataRow>
                        <FormLabel>
                          극단
                          <RequiredWrapper>
                            <RequiredSVG />
                          </RequiredWrapper>
                        </FormLabel>
                        <ExpTextInput
                          {...expRegister('troupe', { required: true })}
                          placeholder="활동한 극단 이름을 입력해주세요."
                        />
                      </DataRow>
                      <DataRow>
                        <FormLabel>
                          기간
                          <RequiredWrapper>
                            <RequiredSVG />
                          </RequiredWrapper>
                        </FormLabel>
                        <ExpDateInput
                          {...expRegister('startDate', { required: true })}
                          placeholder="YYYY.MM"
                          type="month"
                          max={new Date().toISOString().slice(0, 7)}
                        />
                        ~
                        <ExpDateInput
                          {...expRegister('endDate', { required: true })}
                          placeholder="YYYY.MM"
                          type="month"
                          max={new Date().toISOString().slice(0, 7)}
                        />
                      </DataRow>
                    </DataRows>
                  </FormLabel>
                  <ExpBtnsWrapper>
                    <Button
                      type="button"
                      variation="solid"
                      btnClass="primary"
                      width={53}
                      height={32}
                      padding="7px 14px"
                      fontSize={13}
                      fontWeight="var(--font-medium)"
                      lineHeight={138.5}
                      letterSpacing={1.94}
                      onClick={handleSaveExpClick}
                      disabled={isSaveDisabled}
                    >
                      저장
                    </Button>
                  </ExpBtnsWrapper>
                </ExpFormBox>
              )}
            </ExpGrid>
          </InformationWrapper>
          <InformationWrapper>
            <InfoTitleWrapper>
              <InfoTitle>이미지</InfoTitle>
            </InfoTitleWrapper>
            <ImagesBox {...getImageRootProps()}>
              {!imageUrlArray?.length && (
                <ImagesBoxDefault>
                  <ImageSVG />
                  <DropzoneText>{`파일을 선택하거나 \n 여기로 끌어다 놓으세요`}</DropzoneText>
                </ImagesBoxDefault>
              )}
              {imageUrlArray?.length < 2 && <ImageInput {...getImageInputProps()} />}
              {imageUrlArray?.map(({ url, id }) => (
                <ImageWrapper key={id}>
                  <CloseIconWrapper
                    onClick={e => {
                      e?.stopPropagation();
                      handleDeleteImageClick(id);
                    }}
                  >
                    <CloseSVG />
                  </CloseIconWrapper>
                  <Image key={url + id} src={url} />
                </ImageWrapper>
              ))}
            </ImagesBox>
          </InformationWrapper>
        </Body>
      </Form>
    </NewProfileFormContainer>
  );
};

export default NewProfileForm;

const NewProfileFormContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
`;

const ProfileHeaderWrapper = styled.div`
  width: 100vw;
  height: 88px;
  border-bottom: 1px solid #eaebec;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 60px;
`;

const TitleWrapper = styled.div`
  min-width: 920px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Form = styled.form``;

const TitleInput = styled.input`
  width: 728px;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid #e0e0e2;
  border-radius: 10px;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #000000;
  outline: none;

  &::placeholder {
    font-weight: var(--font-semibold);
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.57%;
    color: #dfdfe0;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const InformationWrapper = styled.div`
  min-width: 920px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoTitle = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #171719;
`;

const InfoBox = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  padding: 20px;
`;

const BasicInfoWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 216px;
  height: 286px;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin-right: 8px;
  object-fit: cover;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  right: 12px;
  top: 12px;
  background-color: #c7c7c8;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PersonalInfoBox = styled.div`
  width: 308px;
  height: 286px;
  border: 1px solid #f4f4f5;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  border-radius: 8px;
  position: relative;
`;

const DataRows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 17px;
`;

const EditIconAbsWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;

const EditIconWrapper = styled.div`
  cursor: pointer;
`;

const DataRow = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;

const Property = styled.div`
  color: #858688;
  font-size: 15px;
  font-weight: var(--font-medium);
  letter-spacing: 0.96%;
  line-height: 146.7%;
  min-width: 54px;
`;

const Value = styled.div`
  font-weight: var(--font-semibold);
  letter-spacing: 0.96%;
  line-height: 146.7%;
  font-size: 15px;
  color: #171719;
`;

const HeightAndWeight = styled.div`
  display: flex;
  gap: 8px;
`;

const Unit = styled.div`
  font-weight: var(--font-medium);
  font-size: 15px;
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #171719;
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const ContactDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ContactValueWrapper = styled.div`
  /* display: flex;
  gap: 12px; */
`;

const GuideText = styled.div`
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
  font-weight: var(--font-regular);
  color: #989ba2;
  position: relative;
`;

const IntroduceBox = styled.div`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  padding: 20px;
  min-height: 112px;
  font-size: 14px;
  line-height: 157.1%;
  letter-spacing: 1.45%;
  color: #000000;
  font-weight: var(--font-medium);
`;

const RequiredWrapper = styled.div`
  position: absolute;
  top: -7px;
  left: -10px;
`;

const ExpGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const ExpBox = styled.div`
  width: 452px;
  height: 168px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  display: flex;
  justify-content: space-between;
`;

const ExpDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ExpIconsWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const TrashIconWrapper = styled.div`
  cursor: pointer;
`;

const WithButtonTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WithButtonTextWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ImagesBox = styled.div`
  width: 100%;
  height: 310px;
  padding: 12px 10px;
  background-color: #b817160f;
  border-radius: 12px;
  display: flex;
  gap: 12px;

  cursor: pointer;
`;

const ImagesBoxDefault = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BodyInfoInput = styled.input`
  width: 50px;
  height: 22px;
  border: none;
  outline: none;
  font-weight: var(--font-medium);
  letter-spacing: 0.96%;
  line-height: 146.7%;
  font-size: 15px;
  color: #171719;

  &::placeholder {
    font-weight: var(--font-medium);
    letter-spacing: 0.96%;
    line-height: 146.7%;
    font-size: 15px;
    color: #dadada;
  }
`;

const IntroduceInput = styled.textarea`
  width: 920px;
  height: 112px;
  resize: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 157.1%;
  letter-spacing: 1.45%;
  color: #000000;
  border: 1px solid #f4f4f5;
  font-weight: var(--font-medium);
  outline: none;

  &::placeholder {
    font-weight: var(--font-regular);
    font-size: 16px;
    color: #dadada;
    letter-spacing: 0.57%;
    line-height: 150%;
    color: #dadada;
  }
`;

const ExpFormBox = styled.div`
  width: 452px;
  height: 168px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const FormLabel = styled.div`
  position: relative;
  color: #858688;
  font-size: 15px;
  font-weight: var(--font-medium);
  letter-spacing: 0.96%;
  line-height: 146.7%;
  min-width: 54px;
`;

const ExpTextInput = styled.input`
  width: 232px;
  height: 22px;
  outline: none;
  border: none;
  font-weight: var(--font-medium);
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
  color: #171719;

  &::placeholder {
    font-weight: var(--font-medium);
    font-size: 15px;
    letter-spacing: 0.96%;
    line-height: 146.7%;
    color: #e3e3e4;
  }
`;

const ExpDateInput = styled.input`
  width: 105px;
  height: 22px;
  outline: none;
  border: none;
  font-weight: var(--font-medium);
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
  color: #171719;

  &::placeholder {
    font-weight: var(--font-medium);
    font-size: 15px;
    letter-spacing: 0.96%;
    line-height: 146.7%;
    color: #e3e3e4;
  }
`;

const ExpBtnsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const ThumbnailDropzone = styled.div`
  width: 216px;
  height: 286px;
  border-radius: 8px;
  background-color: #f4f4f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 28px;
`;

const DropzoneText = styled.div`
  font-size: 15px;
  font-weight: var(--font-medium);
  letter-spacing: 0.96%;
  line-height: 146.7%;
  color: #46474a;
  white-space: pre-wrap;
  text-align: center;
`;

const ThumbnailInput = styled.input``;

const ImageInput = styled.input``;

const ImageWrapper = styled.div`
  position: relative;
  width: 216px;
  height: 286px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin-right: 8px;
`;
