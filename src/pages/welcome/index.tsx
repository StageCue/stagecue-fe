import styled from 'styled-components';
import Button from '../../components/buttons/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestChangeUserType } from '@/api/users';
import useSessionStore from '@/store/session';

const Welcome = () => {
  const navigate = useNavigate();
  const sessionStore = useSessionStore();

  const [selectedUserType, setSelectedUserType] = useState<'PERFORMER' | 'TROUPE' | null>(null);

  const handleUserTypeClick = (type: 'PERFORMER' | 'TROUPE' | null) => {
    setSelectedUserType(type);
  };

  const handleNextClick = async () => {
    if (selectedUserType) {
      await requestChangeUserType({ userType: selectedUserType });
      sessionStore.setUserType(selectedUserType);
      navigate('/');
    }
  };

  return (
    <WelcomeContainer>
      <TitleWrapper>
        <Title>StageCue에 오신 것을 환영합니다!</Title>
        <Subtitle>어떤 여정을 시작할까요?</Subtitle>
      </TitleWrapper>
      <SelectWrapper>
        <UserTypeBox
          onClick={() => handleUserTypeClick('PERFORMER')}
          $isSelected={selectedUserType === 'PERFORMER'}
        >
          <Image $isSelected={selectedUserType === 'PERFORMER'} />
          <TextWrapper>
            <Type>단원</Type>
            <Description>나의 연기를 보여주고 싶어요</Description>
          </TextWrapper>
        </UserTypeBox>
        <UserTypeBox
          onClick={() => handleUserTypeClick('TROUPE')}
          $isSelected={selectedUserType === 'TROUPE'}
        >
          <Image $isSelected={selectedUserType === 'TROUPE'} />
          <TextWrapper>
            <Type>극단주</Type>
            <Description>극단을 운영하고 있어요</Description>
          </TextWrapper>
        </UserTypeBox>
      </SelectWrapper>
      <Button
        variation="solid"
        btnClass="primary"
        width={340}
        height={48}
        disabled={!selectedUserType}
        onClick={handleNextClick}
      >
        다음
      </Button>
    </WelcomeContainer>
  );
};

export default Welcome;

const WelcomeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-top: 162px;
  margin-bottom: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Title = styled.div`
  color: #000000;
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const Subtitle = styled.div`
  color: #000000;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
`;

const SelectWrapper = styled.div`
  display: flex;
  gap: 90px;
  margin-bottom: 80px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const Type = styled.div`
  font-size: 16px;
  color: var(--color-black);
  line-height: 150%;
  letter-spacing: 0.57%;
  font-weight: var(--font-semibold);
`;

const Description = styled.div``;

const UserTypeBox = styled.div<{ $isSelected: boolean }>`
  width: 250px;
  height: 276px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  border: ${({ $isSelected }) => ($isSelected ? `1px solid #B81716` : '1px solid #c7c7c8')};
  cursor: pointer;
  background-color: ${({ $isSelected }) =>
    $isSelected ? `var(--color-blue9)` : `var(--color-white)`};
`;

const Image = styled.div<{ $isSelected: boolean }>`
  width: 80px;
  height: 80px;
  background-color: ${({ $isSelected }) => ($isSelected ? `#b81716ff` : `#d9d9d9`)};
`;
