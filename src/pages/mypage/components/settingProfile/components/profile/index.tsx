import styled from "styled-components";
import ChevronRightSVG from "@assets/icons/chevron_right.svg?react";

interface ProfileProps {
  id: number;
  title: string;
  duration: string;
  birthday: string;
  dateCreated: string;
  height: number;
  weight: number;
  thumbnail: string;
  isDefault: boolean;
}

const Profile = ({
  id,
  title,
  duration,
  birthday,
  dateCreated,
  height,
  weight,
  thumbnail,
  isDefault,
}: ProfileProps) => {
  return (
    <ProfileContainer>
      <ProfileImage src={`https://s3.stagecue.co.kr/stagecue/${thumbnail}`} />
      <ProfileSummary>
        <TitleWrapper>
          <Title>{title}</Title>
          <UpdatedDate>{dateCreated} 작성완료</UpdatedDate>
        </TitleWrapper>
        <SummaryWrapper>
          <ItemWrapper>
            <Property>경력</Property>
            <Value>{duration}</Value>
          </ItemWrapper>
          <ItemWrapper>
            <Property>생년월일</Property>
            <Value>{birthday} (30세)</Value>
          </ItemWrapper>
          <ItemWrapper>
            <Property>신체정보</Property>
            <Value>
              {height}cm/{weight}kg
            </Value>
          </ItemWrapper>
        </SummaryWrapper>
      </ProfileSummary>
      <ShowDetailBtn>
        <ChevronRightSVG />
      </ShowDetailBtn>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  width: 685px;
  height: 210px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 128px;
  height: 170px;
  margin-right: 20px;
  border-radius: 4px;
`;

const ProfileSummary = styled.div`
  width: 457px;
`;

const UpdatedDate = styled.div`
  color: #37383c;
  font-size: 13px;
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding-bottom: 11px;
  border-bottom: 1px solid #f4f4f5;
  margin-bottom: 15px;
`;

const Title = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0px;
`;

const ItemWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Property = styled.div`
  width: 54px;
  color: #989ba2;
  font-weight: var(--font-medium);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
`;

const Value = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
  color: #171719;
`;

const ShowDetailBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
`;
