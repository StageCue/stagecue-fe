import styled from "styled-components";
import Button from "../../components/buttons/button";
import { useState } from "react";
import { UserType } from "../../types/user";

const Welcome = () => {
  const [selectedUserType, setSelectedUserType] = useState<UserType>();

  const handleUserTypeClick = (type: UserType) => {
    setSelectedUserType(type);
  };

  return (
    <WelcomeContainer>
      <TitleWrapper>
        <Title>StageCue에 오신 것을 환영합니다!</Title>
        <Subtitle>어떤 여정을 시작할까요?</Subtitle>
      </TitleWrapper>
      <SelectWrapper>
        <UserTypeBox
          onClick={() => handleUserTypeClick("member")}
          $isSelected={selectedUserType === "member"}
        >
          <Image />
          <TextWrapper>
            <Type>단원</Type>
            <Description>나의 연기를 보여주고 싶어요</Description>
          </TextWrapper>
        </UserTypeBox>
        <UserTypeBox
          onClick={() => handleUserTypeClick("owner")}
          $isSelected={selectedUserType === "owner"}
        >
          <Image />
          <TextWrapper>
            <Type>극단주</Type>
            <Description>극단을 운영하고 있어요</Description>
          </TextWrapper>
        </UserTypeBox>
      </SelectWrapper>
      <Button variation="solid" type="primary" width={340} height={48}>
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
  margin-bottom: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Title = styled.div`
  color: var(--color-black);
  font-weight: var(--font-bold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;

const Subtitle = styled.div`
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
  border: ${({ $isSelected }) =>
    $isSelected ? `1px solid var(--color-blue)` : `var(--color-gray)`};
  cursor: pointer;
  background-color: ${({ $isSelected }) =>
    $isSelected ? `var(--color-blue9)` : `var(--color-white)`};
`;

const Image = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--color-gray);
`;
