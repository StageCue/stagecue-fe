import { requestProfileDetail } from "@/api/users";
import Button from "@/components/buttons/button";
import useSessionStore from "@/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SlashSVG from "@assets/icons/slash.svg?react";
import MailSVG from "@assets/icons/mail_lg.svg?react";
import MobileSVG from "@assets/icons/mobile.svg?react";

interface ProfileDetailData {
  birthday: string;
  dateCreated: string;
  duration: string;
  experience: {
    artworkName: string;
    artworkPart: string;
    troupe: string;
    startDate: string;
  }[];
  height: number;
  weight: number;
  images: { url: string }[];
  introduce: string;
  isDefault: boolean;
  thumbnail: string;
  title: string;
}

const ProfileDetail = () => {
  const { id } = useParams();
  const sessionStore = useSessionStore();
  const [detail, setDetail] = useState<ProfileDetailData>();

  const getProfileDetail = async (id: string) => {
    const res = await requestProfileDetail(id);
    console.log(res);
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

  useEffect(() => {
    getProfileDetail(id!);
  }, [id]);

  return (
    <ProfileDetailContainer>
      <ProfileHeaderWrapper>
        <TitleWrapper>
          <Title>{detail?.title}</Title>
          <Button
            variation="outlined"
            btnClass="primary"
            width={97}
            height={48}
          >
            수정
          </Button>
        </TitleWrapper>
      </ProfileHeaderWrapper>
      <ProfileBodyWrapper>
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
          </Information>
        </Body>
      </ProfileBodyWrapper>
    </ProfileDetailContainer>
  );
};

export default ProfileDetail;

const ProfileDetailContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ProfileHeaderWrapper = styled.div`
  width: 100vw;
  height: 88px;
  border-bottom: 1px solid #eaebec;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  min-width: 920px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: var(--font-semibold);
  font-size: 22px;
  letter-spacing: -1.94%;
  line-height: 136.4%;
  color: #000000;
`;

const ProfileBodyWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

const Body = styled.div`
  min-width: 920px;
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
  font-weight: var(--fontmedium);
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
