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
  castId: string;
}

const Application = ({ castId }: ApplicationProps) => {
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
  };

  const handleApplyClick = async ({
    castId,
    profileId,
  }: {
    castId: string;
    profileId: string;
  }) => {
    await requestApplyCast({ castId, profileId });
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
      <ProfilesWrapper>
        <ProfilesTitle>지원 프로필</ProfilesTitle>
        <Profiles>
          {profiles?.map(({ id, title, dateCreated, isDefault }) => (
            <Profile key={id} $isDefault={isDefault}>
              <CheckboxColumn>
                <CheckboxWrapper onClick={() => handleCheckboxClick(id)}>
                  {checkedProfileId === id ? <RadioCheckedSVG /> : <RadioSVG />}
                </CheckboxWrapper>
              </CheckboxColumn>
              <TextColumn>
                {isDefault && <DefaultProfileTag>기본프로필</DefaultProfileTag>}
                <ProfileTitle>{title}</ProfileTitle>
                <UpdateDate>{dateCreated}</UpdateDate>
              </TextColumn>
              <ButtonColumn>
                <DetailButton onClick={handleDetailClick}>상세</DetailButton>
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
        <Button
          width={308}
          height={48}
          variation="solid"
          btnClass="primary"
          fontSize={16}
          letterSpacing={0.57}
          lineHeight={150}
          disabled={!checkedProfileId}
          onClick={() =>
            handleApplyClick({ castId, profileId: `${checkedProfileId}` })
          }
        >
          지원하기
        </Button>
      </ProfilesWrapper>
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
