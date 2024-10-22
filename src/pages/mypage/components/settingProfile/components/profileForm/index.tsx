import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons/button";
import { useEffect, useState } from "react";
import SlashSVG from "@assets/icons/slash.svg?react";
import EditSVG from "@assets/icons/edit.svg?react";
import RequiredSVG from "@assets/icons/required_orange.svg?react";
import TrashSVG from "@assets/icons/trash_lg.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import { requestProfileDetail, requestSaveProfile } from "@/api/users";
import { ProfileDetailData } from "../profileDetail";
import useSessionStore from "@/store";
import ModalPortal from "@/components/modal/portal";
import SubmitModal from "../modals/submitModal";

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
  artworkName: string;
  artworkPart: string;
  troupe: string;
  startDate: string;
  endDate: string;
}

const ProfileForm = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();
  const { id } = useParams();
  const [detail, setDetail] = useState<ProfileDetailData>();
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState<boolean>(false);
  const [isEditIntroduce, setIsEditIntroduce] = useState<boolean>(false);
  const [selectedExpId, setSelectedExpId] = useState();
  const [isAddExp, setIsAddExp] = useState<boolean>(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<ProfileInput>();
  const {
    register: expRegister,
    handleSubmit: handleExpSubmit,
    watch: expWatch,
  } = useForm<ExpInput>();

  const [
    titleValue,
    birthdayValue,
    weightValue,
    heightValue,
    introduceValue,
    experiencesValue,
    thumbnailValue,
    imagesValue,
  ] = watch([
    "title",
    "birthday",
    "weight",
    "height",
    "introduce",
    "experiences",
    "thumbnail",
    "images",
  ]);

  const [
    artworkNameValue,
    artworkPartValue,
    troupeValue,
    startDateValue,
    endDateValue,
  ] = expWatch([
    "artworkName",
    "artworkPart",
    "troupe",
    "startDate",
    "endDate",
  ]);

  const parseImagesUrl = (images: { url: string }[]) => {
    return images.map(({ url }) => url);
  };

  const getProfileDetail = async (id: string) => {
    const res = await requestProfileDetail(id);
    console.log(res);
    setDetail(res);
    setValue("title", res.title);
    setValue("birthday", res.birthday);
    setValue("weight", res.weight);
    setValue("height", res.height);
    setValue("introduce", res.introduce);
    setValue("experiences", res.experiences);
    setValue("thumbnail", res.thumbnail);
    setValue("images", parseImagesUrl(res.images));
  };

  const handleInfoEditClick = (section: string) => {
    if (section === "personalInfo") {
      setIsEditPersonalInfo(true);
    } else if (section === "introduce") {
      setIsEditIntroduce(true);
    }
  };

  const handleSaveExpClick = () => {
    setValue("experiences", [
      ...experiencesValue,
      {
        artworkName: artworkNameValue,
        artworkPart: artworkPartValue,
        troupe: troupeValue,
        startDate: startDateValue,
        endDate: endDateValue,
      },
    ]);
    setIsAddExp(false);
  };

  const handleSaveClick = (section: "personalInfo" | "introduce") => {
    if (section === "personalInfo") {
      setIsEditPersonalInfo(false);
    } else if (section === "introduce") {
      setIsEditIntroduce(false);
    }
  };

  const handleEditExpClick = (id: number) => {};

  const handleDeleteExpClick = (id: number) => {};

  const handleAddExpClick = () => {
    setIsAddExp(true);
  };

  const handleCancleAddExpClick = () => {
    setIsAddExp(false);
  };

  const handleSubmitClick = async () => {
    setIsSubmitModalOpen(true);
  };

  const handleConfirmClick = async (data: ProfileInput) => {
    setIsSubmitModalOpen(false);
    const res = await requestSaveProfile({ ...data, isDefault: true }, id!);
    console.log(res);
    navigate(`/mypage/profiles/${id}`);
  };

  const handleCloseClick = async (data: ProfileInput) => {
    setIsSubmitModalOpen(false);
    const res = await requestSaveProfile({ ...data, isDefault: false }, id!);
    console.log(res);
    navigate(`/mypage/profiles/${id}`);
  };

  useEffect(() => {
    getProfileDetail(id!);
  }, [id]);

  return (
    <ProfileFormContainer>
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
            <TitleInput
              {...register("title", { required: true, value: titleValue })}
            />
            <Button
              variation="solid"
              btnClass="primary"
              width={180}
              height={48}
              type="button"
              onClick={handleSubmitClick}
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
                <ThumbnailWrapper
                  src={`https://s3.stagecue.co.kr/stagecue/${detail?.thumbnail}`}
                />
                <PersonalInfoBox>
                  <EditIconAbsWrapper
                    onClick={() => handleInfoEditClick("personalInfo")}
                  >
                    {!isEditPersonalInfo && <EditSVG />}
                  </EditIconAbsWrapper>
                  <DataRows>
                    <DataRow>
                      <Property>생년월일</Property>
                      <Value>{birthdayValue}</Value>
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
                              {...register("height", { required: true })}
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
                              {...register("weight", {
                                required: true,
                                value: detail?.weight,
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
                      onClick={() => handleSaveClick("personalInfo")}
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
                        <Property>이메일</Property>
                        <Value></Value>
                      </ContactValueWrapper>
                      <Button
                        variation="outlined"
                        btnClass="assistive"
                        width={90}
                        height={32}
                        padding="7px 14px"
                        fontSize={13}
                        lineHeight={138.5}
                        letterSpacing={1.94}
                      >
                        이메일 변경
                      </Button>
                    </ContactDataRow>
                    <ContactDataRow>
                      <ContactValueWrapper>
                        <Property>연락처</Property>
                        <Value></Value>
                      </ContactValueWrapper>
                      <Button
                        variation="outlined"
                        btnClass="assistive"
                        width={90}
                        height={32}
                        padding="7px 14px"
                        fontSize={13}
                        lineHeight={138.5}
                        letterSpacing={1.94}
                      >
                        연락처 변경
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
                <EditIconWrapper
                  onClick={() => handleInfoEditClick("introduce")}
                >
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
                >
                  저장
                </Button>
              )}
            </WithButtonTitleWrapper>
            {isEditIntroduce ? (
              <IntroduceInput
                {...register("introduce", {
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
                disabled={isAddExp}
                onClick={handleAddExpClick}
              >
                경력추가
              </Button>
            </WithButtonTitleWrapper>
            <ExpGrid>
              {experiencesValue?.map((exp) => (
                <ExpBox>
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
                    <TrashIconWrapper>
                      <TrashSVG />
                    </TrashIconWrapper>
                    <EditIconWrapper>
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
                          {...expRegister("artworkName", { required: true })}
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
                          {...expRegister("artworkPart", { required: true })}
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
                          {...expRegister("troupe", { required: true })}
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
                          {...expRegister("startDate", { required: true })}
                          placeholder="YYYY.MM"
                          type="month"
                        />
                        ~
                        <ExpDateInput
                          {...expRegister("endDate", { required: true })}
                          placeholder="YYYY.MM"
                          type="month"
                        />
                      </DataRow>
                    </DataRows>
                  </FormLabel>
                  <ExpBtnsWrapper>
                    <Button
                      variation="outlined"
                      btnClass="assistive"
                      width={53}
                      height={32}
                      padding="7px 14px"
                      fontSize={13}
                      fontWeight="var(--font-medium)"
                      lineHeight={138.5}
                      letterSpacing={1.94}
                      onClick={handleCancleAddExpClick}
                    >
                      취소
                    </Button>
                    <Button
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
                      type="button"
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
            <ImagesBox>
              {imagesValue?.map((imgUrl) => (
                <Image src={`https://s3.stagecue.co.kr/stagecue/${imgUrl}`} />
              ))}
            </ImagesBox>
          </InformationWrapper>
        </Body>
      </Form>
    </ProfileFormContainer>
  );
};

export default ProfileForm;

const ProfileFormContainer = styled.div`
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

const ThumbnailWrapper = styled.img`
  width: 216px;
  height: 286px;
  border-radius: 8px;
  margin-right: 8px;
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
  font-weight: var(--font-medium);
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
  width: 100%;
`;

const ContactValueWrapper = styled.div`
  display: flex;
  gap: 12px;
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
  background-color: #f0f6ff;
  border-radius: 12px;
  display: flex;
  gap: 12px;
`;

const Image = styled.img`
  border-radius: 8px;
  width: 216px;
  height: 286px;
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
