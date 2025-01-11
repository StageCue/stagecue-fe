import { requestProfileDetail } from "@/api/users";
import Button from "@/components/buttons/button";
import Overlay from "@/components/modal/overlay";
import { ProfileDetailData } from "@/pages/mypage/components/settingProfile/components/profileDetail";
import useSessionStore from "@/store/session";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SlashSVG from "@assets/icons/slash.svg?react";
import MailSVG from "@assets/icons/mail_lg.svg?react";
import MobileSVG from "@assets/icons/mobile.svg?react";
import CloseSVG from "@assets/icons/close_black.svg?react";
import { useNavigate } from "react-router-dom";

interface ProfileModalProps {
  id: string;
  isDefault: boolean;
  onClose: () => void;
}

const ProfileModal = ({ id, isDefault, onClose }: ProfileModalProps) => {
  const sessionStore = useSessionStore();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<ProfileDetailData>();

  const getProfileDetail = async (id: string) => {
    const res = await requestProfileDetail(id);
    setDetail(res);
  };

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

  const handleEditClick = () => {
    navigate(`/mypage/profiles/${id}/form`);
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
            {isDefault && <DefaultProfileTag>기본프로필</DefaultProfileTag>}
            <Title>{detail?.title}</Title>
          </TitleWrapper>
          <EditWrapper>
            <Button
              variation="outlined"
              btnClass="assistive"
              padding="7px 14px"
              width={90}
              height={32}
              lineHeight={138.5}
              letterSpacing={1.94}
              fontWeight={"var(--font-medium)"}
              fontSize={13}
              onClick={handleEditClick}
            >
              프로필 수정
            </Button>
          </EditWrapper>
          <Body>
            <NameWrapper>
              <Name>{sessionStore.username}</Name>
              <SlashSVG />
              <Age>{detail && calculateKoreanAge(detail.birthday)}</Age>
            </NameWrapper>
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

const DefaultProfileTag = styled.div`
  width: 75px;
  height: 24px;
  background-color: #fbf2f2;
  color: #b82925;
  font-weight: var(--font-medium);
  font-size: 12px;
  line-height: 133.4%;
  letter-spacing: 2.52%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: 12px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const NameWrapper = styled.div`
  width: 100%;
  height: 68px;
  border: 1px solid #f4f4f5;
  display: flex;
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
