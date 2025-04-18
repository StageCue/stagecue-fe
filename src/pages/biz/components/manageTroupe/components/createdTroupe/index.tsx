import Button from '@/components/buttons/button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function CreatedTroupe() {
  const navigate = useNavigate();

  const handleNewRedruitClick = () => {
    navigate('/biz/cast/form');
  };

  const handleEditTroupeClick = () => {
    navigate('/biz/troupe/form');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <CreatedTroupeContainer>
      <TextWrapper>
        <MainText>극단 소개 등록 완료</MainText>
        <SubText>공고를 올려 단원을 모집해보세요!</SubText>
      </TextWrapper>
      <Buttons>
        <Button
          btnClass="primary"
          variation="outlined"
          width={178}
          height={48}
          padding="12px 35px"
          onClick={handleNewRedruitClick}
        >
          신규 공고 올리기
        </Button>
        <Button
          btnClass="secondary"
          variation="outlined"
          width={178}
          height={48}
          padding="12px 28px"
          onClick={handleEditTroupeClick}
        >
          극단 소개 수정하기
        </Button>
        <Button
          btnClass="assistive"
          variation="text"
          width={160}
          height={32}
          padding="0px 7px"
          onClick={handleHomeClick}
        >
          메인으로
        </Button>
      </Buttons>
    </CreatedTroupeContainer>
  );
}

const CreatedTroupeContainer = styled.div`
  width: 692px;
  margin: 88px 244px 100px 244px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.div`
  color: #000000;
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
  font-weight: var(--font-bold);
`;

const SubText = styled.div``;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
