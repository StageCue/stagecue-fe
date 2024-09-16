import Button from "@/components/buttons/button";
import styled from "styled-components";
import ChevronRightSVG from "@assets/icons/chevron_right.svg?react";
import NoScrappedSVG from "@assets/images/noscrappedd.svg?react";

const SettingProfile = () => {
  return (
    <SettingProfileContainer>
      <CreateBtnWrapper>
        <Button variation="solid" btnClass="primary" width={180} height={48}>
          새 프로필 생성하기
        </Button>
      </CreateBtnWrapper>
      <ProfileList>
        <ProfileCard>
          <ProfileImage />
          <ProfileSummary>
            <TitleWrapper>
              <Title>
                안녕하세요 어떤 역이든 자신있는 배우 지망생 서예지입니다.
              </Title>
              <UpdatedDate>2023.07.18 작성완료</UpdatedDate>
            </TitleWrapper>
            <SummaryWrapper>
              <ItemWrapper>
                <Property>경력</Property>
                <Value>2년 2개월</Value>
              </ItemWrapper>
              <ItemWrapper>
                <Property>생년월일</Property>
                <Value>1995년생 (30세)</Value>
              </ItemWrapper>
              <ItemWrapper>
                <Property>신체정보</Property>
                <Value>167cm/56kg</Value>
              </ItemWrapper>
            </SummaryWrapper>
          </ProfileSummary>
          <ShowDetailBtn>
            <ChevronRightSVG />
          </ShowDetailBtn>
        </ProfileCard>
      </ProfileList>
      <NoProfile>
        <NoScrappedSVG />
        <Text>아직 작성된 프로필이 없어요.</Text>
        <SubText>
          나의 프로필과 경력을 매력적으로 작성 후 공고에 지원해보세요!
        </SubText>
        <Description>
          정성스러운 프로필은 극단주들에게 더 어필이 될거에요:)
        </Description>
      </NoProfile>
    </SettingProfileContainer>
  );
};

export default SettingProfile;

const SettingProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CreateBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProfileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileCard = styled.div`
  width: 685px;
  height: 210px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  padding: 20px;
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 128px;
  height: 170px;
  margin-right: 20px;
  background-color: #f4f4f5;
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

const NoProfile = styled.div`
  width: 685px;
  height: 350px;
  background-color: #f7f7f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin-top: 20px;
  margin-bottom: 4px;
  font-weight: var(--font-semibold);
  font-size: 22px;
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;

const SubText = styled.div`
  margin-bottom: 8px;
  font-weight: var(--font-semibold);
  font-size: 18px;
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;

const Description = styled.div`
  font-weight: var(--font-regular);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
`;
