import Button from '@/components/buttons/button';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NoApplicant = () => {
  const navigate = useNavigate();

  const handleUploadPostClick = () => {
    navigate('/biz/cast/form');
  };
  return (
    <NoApplicantContainer>
      <TextWrapper>
        <Text>지원한 지원자가 없습니다.</Text>
        <Text>채용 공고를 등록해보세요!</Text>
      </TextWrapper>
      <Button
        variation="outlined"
        btnClass="primary"
        width={142}
        height={40}
        fontSize={15}
        lineHeight={146.7}
        letterSpacing={0.96}
        padding="9px 20px"
        onClick={handleUploadPostClick}
      >
        모집 공고 올리기
      </Button>
    </NoApplicantContainer>
  );
};

export default NoApplicant;

const NoApplicantContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const TextWrapper = styled.div``;

const Text = styled.div`
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
`;
