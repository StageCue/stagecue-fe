import styled from 'styled-components';
import { applyPhaseType, filterType } from '../..';
import Button from '@/components/buttons/button';
import DotdotdotSVG from '@/assets/images/dotdotdot.svg?react';
import ApplyCast from '../applyCast';
import { useNavigate } from 'react-router-dom';
import { useApplyData } from '@/pages/mypage/hooks/useApplyData';

interface ApplyListProps {
  status: applyPhaseType;
  filter?: filterType;
}

const ApplyList = ({ status }: ApplyListProps) => {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useApplyData(status);

  if (isLoading) return <p></p>;
  if (error) return <p>에러 : {error.message}</p>;

  const casts = data!.applies;

  return (
    <ApplyListContainer>
      {casts.length === 0 ? (
        <NoApplyHistory>
          <DotdotdotSVG />
          <TextWrapper>
            <Text>아직 지원한 공고가 없어요.</Text>
            <SubText>다양한 공고들을 둘러볼까요?</SubText>
          </TextWrapper>
          <Button
            variation="solid"
            btnClass="primary"
            width={296}
            onClick={() => navigate('/casts')}
          >
            공고 찾아보기
          </Button>
        </NoApplyHistory>
      ) : (
        casts.map(({ applyId, troupeName, applyStatus, recruitTitle, applyStatusLogs }) => (
          <ApplyCast
            key={applyId}
            applyId={applyId}
            applyStatus={applyStatus}
            applyStatusLogs={applyStatusLogs}
            recruitTitle={recruitTitle}
            troupeName={troupeName}
            getCasts={refetch}
          />
        ))
      )}
    </ApplyListContainer>
  );
};

export default ApplyList;

const ApplyListContainer = styled.div`
  width: 685px;
`;

const NoApplyHistory = styled.div`
  width: 685px;
  height: 248px;
  padding: 28px 0;
  background-color: #f7f7f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const Text = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
`;

const SubText = styled.div`
  font-weight: var(--font-regular);
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
`;
