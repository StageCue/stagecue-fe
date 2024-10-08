import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "@/components/buttons/button";
import { useEffect, useState } from "react";
import SlashSVG from "@assets/icons/slash.svg?react";
import EditSVG from "@assets/icons/edit.svg?react";
import RequiredSVG from "@assets/icons/required_orange.svg?react";
import TrashSVG from "@assets/icons/trash_lg.svg?react";
import { useParams } from "react-router-dom";
import { requestProfileDetail } from "@/api/users";
import { ProfileDetailData } from "../profileDetail";
import useSessionStore from "@/store";

const ProfileForm = () => {
  const sessionStore = useSessionStore();
  const { id } = useParams();
  const [detail, setDetail] = useState<ProfileDetailData>();
  const [isEditPersonalInfo, setIsEditPersonalInfo] = useState<boolean>(false);
  const [isEditIntroduce, setIsEditIntroduce] = useState<boolean>(false);
  const [selectedExpId, setSelectedExpId] = useState();

  const { register, handleSubmit } = useForm();

  const getProfileDetail = async () => {
    const res = await requestProfileDetail(id!);
    setDetail(res);
  };

  const handleInfoEditClick = (section: string) => {
    if (section === "personalInfo") {
      setIsEditPersonalInfo(true);
    } else if (section === "introduce") {
      setIsEditIntroduce(true);
    }
  };

  useEffect(() => {
    getProfileDetail();
  }, [id]);

  return (
    <ProfileFormContainer>
      <Form>
        <ProfileHeaderWrapper>
          <TitleWrapper>
            <TitleInput />
            <Button
              variation="solid"
              btnClass="primary"
              width={180}
              height={48}
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
                      <Value>{detail?.birthday}</Value>
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
                            <Value>{detail?.height}</Value>
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
                            <Value>{detail?.weight}</Value>
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
              <IntroduceInput />
            ) : (
              <IntroduceBox>{detail?.introduce}</IntroduceBox>
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
              >
                경력추가
              </Button>
            </WithButtonTitleWrapper>
            <ExpGrid>
              {detail?.experiences.map((exp) => (
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
            </ExpGrid>
          </InformationWrapper>
          <InformationWrapper>
            <InfoTitleWrapper>
              <InfoTitle>이미지</InfoTitle>
            </InfoTitleWrapper>
            <ImagesBox>
              {detail?.images.map(({ url }) => (
                <Image src={`https://s3.stagecue.co.kr/stagecue/${url}`} />
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
  display: grid;
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
  width: 40px;
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
    color: #171719;
  }
`;
