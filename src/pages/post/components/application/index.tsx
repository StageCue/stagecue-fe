import styled from "styled-components";
import RadioSVG from "@assets/icons/radio.svg?react";
import RadioCheckedSVG from "@assets/icons/radio_checked.svg?react";
import { useState } from "react";
import Button from "@/components/buttons/button";

const Application = () => {
  const [checkedProfile, setCheckedProfile] = useState("");
  return (
    <ApplicationContainer $top={top}>
      <ProfilesWrapper>
        <ProfilesTitle>지원 프로필</ProfilesTitle>
        <Profiles>
          <Profile>
            <CheckboxColumn>
              <RadioCheckedSVG />
            </CheckboxColumn>
            <TextColumn>
              <ProfileTitle>프로필 제목</ProfileTitle>
              <UpdateDate>2023.07.18 작성</UpdateDate>
            </TextColumn>
            <ButtonColumn>
              <DetailButton>상세</DetailButton>
            </ButtonColumn>
          </Profile>
        </Profiles>
      </ProfilesWrapper>
      <Button
        width={308}
        height={48}
        variation="solid"
        btnClass="primary"
        fontSize={16}
        letterSpacing={0.57}
        lineHeight={150}
      >
        지원하기
      </Button>
    </ApplicationContainer>
  );
};

export default Application;

const ApplicationContainer = styled.div<{ $top: number }>`
  position: sticky;
  width: 340px;
  height: 248px;
  margin-left: 31px;
  top: 70px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ProfilesWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
`;

const Profiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfilesTitle = styled.div`
  font-weight: var(--font-semibold);
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #000000;
`;

const Profile = styled.div`
  width: 308px;
  display: flex;
  gap: 8px;
`;

const CheckboxColumn = styled.div``;

const TextColumn = styled.div`
  width: 204px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileTitle = styled.div`
  width: 204px;
  height: 22px;
  font-weight: var(--font-semibold);
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
`;

const UpdateDate = styled.div`
  font-weight: var(--font-medium);
  font-size: 14px;
  line-height: 157.1%;
  letter-spacing: 1.45%;
  color: #989ba2;
`;

const ButtonColumn = styled.div``;

const DetailButton = styled.div`
  width: 41px;
  height: 24px;
  padding: 4px 9px;
  border-radius: 4px;
  border: 1px solid #e0e0e2;
  font-size: 12px;
  letter-spacing: 2.52%;
  line-height: 133.4%;
  color: #171719;
`;
