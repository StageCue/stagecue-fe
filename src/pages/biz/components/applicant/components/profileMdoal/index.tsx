import Button from "@/components/buttons/button";
import styled from "styled-components";
import CloseSVG from "@assets/icons/close_black.svg?react";
import Overlay from "@/components/modal/overlay";
import SlashSVG from "@assets/icons/slash.svg?react";
import { ProfileDetailData } from "@/pages/mypage/components/settingProfile/components/profileDetail";
import { useEffect, useState } from "react";
import { requestProfileDetail } from "@/api/users";
import MailSVG from "@assets/icons/mail_lg.svg?react";
import MobileSVG from "@assets/icons/mobile.svg?react";
import StatusTag from "../statusTag";

interface ProfileModalProps {
  id: string;
  onClose: () => void;
  onClickPass: () => void;
  onClickFail: () => void;
  name: string;
  applyStatus: string;
}

const ProfileModal = ({
  id,
  onClose,
  onClickPass,
  onClickFail,
  name,
  applyStatus,
}: ProfileModalProps) => {
  const [detail, setDetail] = useState<ProfileDetailData>();

  const calculateKoreanAge = (birthDateString: string) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    const [birthYear, birthMonth, birthDay] = birthDateString
      .split("-")
      .map(Number);

    let koreanAge = currentYear - birthYear + 1;

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      koreanAge--;
    }

    return `${birthYear}년생 (${koreanAge}세)`;
  };

  const getProfileDetail = async (id: string) => {
    const res = await requestProfileDetail(id);
    setDetail(res);
  };

  useEffect(() => {
    getProfileDetail(id!);
  }, [id]);

  return (
    <ProfileModalContainer>
      <Overlay>
        <ModalBox>
          <CloseIconWrapper onClick={onClose}>
            <CloseSVG />
          </CloseIconWrapper>
          <TitleWrapper>
            <Title>지원자 상세정보</Title>
          </TitleWrapper>
          <Body>
            <NameAgeBox>
              <NameWrapper>
                <Name>{name}</Name>
                <SlashSVG />
                <Age>{detail && calculateKoreanAge(detail.birthday)}</Age>
                <StatusTag status={applyStatus} />
              </NameWrapper>
              <ButtonsWrapper>
                <Button
                  variation="outlined"
                  btnClass="secondary"
                  width={71}
                  height={32}
                  padding="8px 14px"
                  lineHeight={138.5}
                  letterSpacing={1.94}
                  fontWeight="var(--font-semibold)"
                  onClick={onClickPass}
                >
                  합격
                </Button>
                <Button
                  variation="outlined"
                  btnClass="secondary"
                  width={83}
                  height={32}
                  padding="8px 14px"
                  lineHeight={138.5}
                  letterSpacing={1.94}
                  fontWeight="var(--font-semibold)"
                  onClick={onClickFail}
                >
                  불합격
                </Button>
              </ButtonsWrapper>
            </NameAgeBox>
            <ImagesWrapper>
              <Thumbnail
                src={`https://s3.stagecue.co.kr/stagecue/${detail?.thumbnail}`}
              />
              <Images>
                {detail?.images.map(({ url }) => (
                  <Image src={`https://s3.stagecue.co.kr/stagecue/${url}`} />
                ))}
              </Images>
            </ImagesWrapper>
            <Information>
              <InformationTitle>기본 정보</InformationTitle>
              <DataWrapper>
                <DataRow>
                  <Physical>신체정보</Physical>
                  <HeightAndWeight>
                    <ValueWrapper>
                      <Value>{detail?.height}</Value>
                      <Unit>cm</Unit>
                    </ValueWrapper>
                    <SlashSVG />
                    <ValueWrapper>
                      <Value>{detail?.weight}</Value>
                      <Unit>kg</Unit>
                    </ValueWrapper>
                  </HeightAndWeight>
                </DataRow>
                <DataRow>
                  <ValueWrapper>
                    <MailSVG />
                  </ValueWrapper>
                  <ValueWrapper>
                    <MobileSVG />
                  </ValueWrapper>
                </DataRow>
              </DataWrapper>
            </Information>
            <Information>
              <InformationTitle>경력 (총 개월)</InformationTitle>
              <DataWrapper>
                {detail?.experiences.map((exp) => (
                  <ExpRow>
                    <RoleAndPeriod>
                      <Role>{exp.artworkPart}</Role>
                      <Period>
                        {exp.startDate} - {exp.endDate}
                      </Period>
                    </RoleAndPeriod>
                    <ArtWork>{exp.artworkName}</ArtWork>
                  </ExpRow>
                ))}
              </DataWrapper>
            </Information>
            <Information>
              <InformationTitle>자기 소개</InformationTitle>
              <DataWrapper>
                <Introduce>{detail?.introduce}</Introduce>
              </DataWrapper>
            </Information>
          </Body>
        </ModalBox>
      </Overlay>
    </ProfileModalContainer>
  );
};

export default ProfileModal;

const ProfileModalContainer = styled.div``;

const ModalBox = styled.div`
  width: 780px;
  height: fit-content;
  max-height: 90vh;
  padding: 40px;
  background-color: white;
  border-radius: 16px;
  overflow: scroll;
  position: relative;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 28px;
`;

const Title = styled.div`
  font-weight: var(--font-semibold);
  font-size: 22px;
  line-height: 136.4%;
  letter-spacing: -1.94%;
  color: #000000;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const NameAgeBox = styled.div`
  width: 100%;
  height: 68px;
  border: 1px solid #f4f4f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 12px;
  padding: 20px;
  gap: 8px;
`;

const Name = styled.div`
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  color: #171719;
`;

const Age = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 18px;
`;

const Thumbnail = styled.img`
  width: 340px;
  height: 450px;
  border-radius: 8px;
`;

const Images = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 342px;
  height: 450px;
  gap: 10px;
`;

const Image = styled.img`
  width: 166px;
  height: 220px;
  border-radius: 12px;
`;

const Information = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InformationTitle = styled.div`
  border-bottom: 1px solid #f4f4f5;
  padding-bottom: 10px;
  font-weight: var(--font-semibold);
  font-size: 18px;
  line-height: 144.5%;
  letter-spacing: -0.02%;
  color: #171719;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 12px;
`;

const DataRow = styled.div`
  display: flex;
  gap: 12px;
`;

const Physical = styled.div`
  font-weight: var(--font-medium);
  font-size: 15px;
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #858688;
`;

const HeightAndWeight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Unit = styled.div`
  font-weight: var(--font-medium);
  letter-spacing: 0.96%;
  line-height: 146.7%;
  color: #171719;
`;

const Value = styled.div`
  font-weight: var(--font-semibold);
  font-size: 15px;
  letter-spacing: 0.96%;
  color: #171719;
`;

const ExpRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const RoleAndPeriod = styled.div`
  display: flex;
  align-items: center;
`;

const Role = styled.div`
  padding-right: 12px;
  font-weight: var(--font-medium);
  font-size: 15px;
  line-height: 146.7%;
  letter-spacing: 0.96%;
  border-right: 1px solid #f4f4f5;
`;

const Period = styled.div`
  margin-left: 12px;
  font-size: 15px;
  font-weight: var(--font-medium);
  letter-spacing: 0.96%;
  letter-spacing: 146.7%;
  color: #858688;
`;

const ArtWork = styled.div`
  font-weight: var(--font-semibold);
  font-size: 17px;
  letter-spacing: 0%;
  line-height: 141.2%;
  color: #171719;
`;

const Introduce = styled.div``;

const CloseIconWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  right: 12px;
  top: 12px;
`;

const ButtonsWrapper = styled.div`
  width: 162px;
  height: 32px;
  display: flex;
  gap: 8px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
