import styled from "styled-components";
import RadioCheckedSVG from "@assets/icons/radio_checked.svg?react";
import RadioSVG from "@assets/icons/radio.svg?react";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/button";
import { requestApplyCast } from "@api/cast";
import { useNavigate } from "react-router-dom";
import { requestProfileList } from "@/api/users";
import ModalPortal from "@/components/modal/portal";
import ProfileModal from "../profileModal";

interface ApplicationProps {
  recruitId: string;
  isApplied: boolean;
}

interface Profile {
  id: 0;
  title: string;
  duration: string;
  height: 0;
  weight: 0;
  thumbnail: string;
  birthday: string;
  isDefault: boolean;
  dateCreated: string;
}

const Application = ({ recruitId, isApplied }: ApplicationProps) => {
  const navigate = useNavigate();
  const [checkedProfileId, setCheckedProfileId] = useState<number>();
  const [profiles, setProfiles] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleCheckboxClick = (id: number) => {
    if (checkedProfileId === id) {
      setCheckedProfileId(0);
    } else {
      setCheckedProfileId(id);
    }
  };

  const getProfileList = async () => {
    const res = await requestProfileList();
    setProfiles(res.profiles);
    const defaultProfile = res?.profiles.find(
      (profile: Profile) => profile.isDefault === true
    );

    if (!isApplied) {
      setCheckedProfileId(defaultProfile.id);
    }
  };

  const handleApplyClick = async ({
    recruitId,
    profileId,
  }: {
    recruitId: string;
    profileId: string;
  }) => {
    await requestApplyCast({ recruitId, profileId });
    navigate("/casts/applied");
  };

  const handleDetailClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseClick = () => {
    setIsProfileModalOpen(false);
  };

  useEffect(() => {
    getProfileList();
  }, []);

  return (
    <ApplicationContainer>
      {!isApplied && (
        <ApplyWrapper>
          {profiles.length !== 0 ? (
            <ProfilesWrapper>
              <ProfilesTitle>지원 프로필</ProfilesTitle>
              <Profiles>
                {profiles?.map(({ id, title, dateCreated, isDefault }) => (
                  <Profile key={id} $isDefault={isDefault}>
                    <CheckboxColumn>
                      <CheckboxWrapper onClick={() => handleCheckboxClick(id)}>
                        {checkedProfileId === id ? (
                          <RadioCheckedSVG />
                        ) : (
                          <RadioSVG />
                        )}
                      </CheckboxWrapper>
                    </CheckboxColumn>
                    <TextColumn>
                      {isDefault && (
                        <DefaultProfileTag>기본프로필</DefaultProfileTag>
                      )}
                      <ProfileTitle>{title}</ProfileTitle>
                      <UpdateDate>{dateCreated}</UpdateDate>
                    </TextColumn>
                    <ButtonColumn>
                      <DetailButton onClick={handleDetailClick}>
                        상세
                      </DetailButton>
                      {isProfileModalOpen && (
                        <ModalPortal>
                          <ProfileModal
                            id={id}
                            isDefault={isDefault}
                            onClose={handleCloseClick}
                          />
                        </ModalPortal>
                      )}
                    </ButtonColumn>
                  </Profile>
                ))}
              </Profiles>
            </ProfilesWrapper>
          ) : (
            <NoProfileWrapper>
              <TextWrapper>
                <MainText>저장된 프로필이 없어요.</MainText>
                <SubText>프로필을 작성하고 공고를 지원해주세요.</SubText>
                <Button
                  variation="solid"
                  btnClass="primary"
                  padding="12px 84px"
                  lineHeight={150}
                  letterSpacing={0.57}
                  fontSize={16}
                  width={300}
                  height={48}
                >
                  프로필 생성하기
                </Button>
              </TextWrapper>
            </NoProfileWrapper>
          )}
        </ApplyWrapper>
      )}
      <Button
        width={308}
        height={48}
        variation="solid"
        btnClass="primary"
        fontSize={16}
        letterSpacing={0.57}
        lineHeight={150}
        disabled={!checkedProfileId || isApplied}
        onClick={() =>
          handleApplyClick({ recruitId, profileId: `${checkedProfileId}` })
        }
      >
        {isApplied ? "지원완료" : "지원하기"}
      </Button>
    </ApplicationContainer>
  );
};

export default Application;

const ApplicationContainer = styled.div`
  position: sticky;
  width: 340px;
  height: 248px;
  margin-left: 31px;
  top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Profile = styled.div<{ $isDefault: boolean }>`
  width: 308px;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding: 12px;
  border-radius: 8px;
  border: ${({ $isDefault }) => ($isDefault ? "1px solid #B81716" : "none")};
`;

const CheckboxColumn = styled.div``;

const CheckboxWrapper = styled.div`
  cursor: pointer;
`;

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
  cursor: pointer;
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

const NoProfileWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.div`
  font-size: 16px;
  font-weight: var(--font-semibold);
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #000000;
`;

const SubText = styled.div`
  font-size: 14px;
  font-weight: var(--font-regular);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #989ba2;
`;

const ApplyWrapper = styled.div``;
