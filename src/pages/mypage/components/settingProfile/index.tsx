import Button from '@/components/buttons/button';
import styled from 'styled-components';
import NoScrappedSVG from '@assets/images/noscrappedd.svg?react';
import { useCallback, useEffect, useState } from 'react';
import Profile from './components/profile';
import { requestDeleteProfile, requestProfileList } from '@api/users';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: number | string;
  title: string;
  duration: string;
  height: number;
  weight: number;
  thumbnail: string;
  birthday: string;
  isDefault: boolean;
  dateCreated: string;
}

const SettingProfile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const getProfiles = async () => {
    const { result: profiles } = await requestProfileList();

    console.log(profiles);

    setProfiles(profiles);
  };

  const handleProfileClick = (id: string | number) => {
    navigate(`profiles/${id}`);
  };

  const handleCreateProfileClick = () => {
    navigate('/mypage/profiles/form');
  };

  const handleRemoveProfile = useCallback(
    async (id: string | number) => {
      try {
        const res = await requestDeleteProfile(id);

        if (res?.error) {
          console.error(res?.error);
          return;
        }

        const newProfiles = profiles?.filter(profile => profile.id !== id);
        setProfiles(newProfiles);
      } catch (error) {
        console.error(error);
      }
    },
    [profiles]
  );

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <SettingProfileContainer>
      <CreateBtnWrapper>
        <Button
          variation="solid"
          btnClass="primary"
          width={180}
          height={48}
          onClick={handleCreateProfileClick}
          disabled={profiles?.length >= 3}
        >
          새 프로필 생성하기
        </Button>
      </CreateBtnWrapper>
      <ProfileList>
        {profiles?.map(
          ({
            id,
            title,
            duration,
            birthday,
            dateCreated,
            height,
            weight,
            thumbnail,
            isDefault,
          }) => (
            <Profile
              key={id}
              id={id}
              title={title}
              duration={duration}
              birthday={birthday}
              dateCreated={dateCreated}
              height={height}
              weight={weight}
              thumbnail={thumbnail}
              isDefault={isDefault}
              handleRemoveProfile={handleRemoveProfile}
              handleProfileClick={() => handleProfileClick(id)}
            />
          )
        )}
      </ProfileList>
      {profiles?.length === 0 && (
        <NoProfile>
          <NoScrappedSVG />
          <Text>아직 작성된 프로필이 없어요.</Text>
          <SubText>나의 프로필과 경력을 매력적으로 작성 후 공고에 지원해보세요!</SubText>
          <Description>정성스러운 프로필은 극단주들에게 더 어필이 될거에요</Description>
        </NoProfile>
      )}
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
