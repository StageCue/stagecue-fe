import Button from '@/components/buttons/button';
import styled from 'styled-components';
import { applyPhaseType } from '../..';
import { formatDateWithDots } from '@/utils/format';
import ModalPortal from '@/components/modal/portal';
import CancelModal from '../cancelModal';
import { useState } from 'react';
import { requestCancelApply } from '@/api/users';

interface ApplyCastProps {
  applyId: number;
  applyStatus: applyPhaseType;
  recruitTitle: string;
  troupeName: string;
  applyStatusLogs: { applyStatus: applyPhaseType; changeDate: string }[];
  getCasts: () => void;
}

const ApplyCast = ({
  applyId,
  applyStatus,
  recruitTitle,
  applyStatusLogs,
  troupeName,
  getCasts,
}: ApplyCastProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClick = async (applyId: number) => {
    setIsModalOpen(false);
    await requestCancelApply(applyId);
    getCasts();
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  const parsePhase = (status: applyPhaseType) => {
    console.log(status);
    switch (status) {
      case 'APPLY':
        return '지원 완료';
      case 'PASS':
        return '서류 통과';
      case 'WIN':
        return '최종 합격';
      case 'LOSE':
        return '불합격';
      case 'CANCELED':
        return '지원취소';
    }
  };

  const parseLogname = (status: applyPhaseType) => {
    switch (status) {
      case 'APPLY':
        return '지원일자';
      case 'OPEN':
        return '열람일자';
      case 'WIN':
        return '최종 합격';
      case 'LOSE':
        return '열람일자';
      case 'CANCELED':
        return '취소일자';
    }
  };

  return (
    <ApplyCastContainer>
      {isModalOpen && (
        <ModalPortal>
          <CancelModal onConfirm={() => handleConfirmClick(applyId)} onClose={handleCloseClick} />
        </ModalPortal>
      )}
      <ApplyInfoWrapper>
        <TagsWrapper>
          <TroupeTag>{troupeName}</TroupeTag>
          <StatusTag $status={applyStatus}>{parsePhase(applyStatus)}</StatusTag>
        </TagsWrapper>
        <Title>{recruitTitle}</Title>
        <LogWrapper>
          {applyStatusLogs.map(({ applyStatus, changeDate }, index) => (
            <LogContainer key={index}>
              <Log>
                <LogName>{parseLogname(applyStatus)}</LogName>
                <LogDate>{formatDateWithDots(changeDate)}</LogDate>
              </Log>
              {index !== applyStatusLogs.length - 1 && <Divider />}
            </LogContainer>
          ))}
        </LogWrapper>
      </ApplyInfoWrapper>
      <Button
        variation="outlined"
        btnClass="assistive"
        width={75}
        height={32}
        fontWeight="--var(font-medium)"
        fontSize={13}
        lineHeight={138.5}
        letterSpacing={1.94}
        padding="7px 14px"
        onClick={() => handleCancelClick()}
        disabled={applyStatus === 'CANCELED'}
      >
        {applyStatus === 'LOSE' ? '서류회수' : '지원취소'}
      </Button>
    </ApplyCastContainer>
  );
};

export default ApplyCast;

const ApplyCastContainer = styled.div`
  width: 685px;
  height: 128px;
  border: 1px solid #f4f4f5;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
`;

const Title = styled.div`
  color: #000000;
  font-size: 18px;
  font-weight: var(--font-semibold);
  line-height: 144.5%;
  letter-spacing: -0.02%;
  margin-bottom: 12px;
`;

const ApplyInfoWrapper = styled.div`
  width: 567px;
  height: 96px;
  display: flex;
  flex-direction: column;
`;

const TagsWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
`;

const TroupeTag = styled.div`
  width: fit-content;
  height: 24px;
  padding: 4px 9px;
  border-radius: 4px;
  border: 1px solid #e0e0e2;
  font-size: 12px;
  font-weight: var(--font-medium);
  line-height: 133.4%;
  letter-spacing: 2.52%;
  color: #171719;
`;

const StatusTag = styled.div<{ $status: applyPhaseType }>`
  font-size: 12px;
  font-weight: var(--font-semibold);
  width: 62px;
  height: 24px;
  border-radius: 4px;
  color: ${({ $status }) => ($status === 'PASS' || $status === 'WIN' ? '#00BF40' : '#989ba2')};
  background-color: ${({ $status }) =>
    $status === 'PASS' || $status === 'WIN' ? '#D9FFE6' : '#f7f7f8'};
  line-height: 133.4%;
  letter-spacing: 2.52%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const LogContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Log = styled.div`
  width: 128px;
  height: 24px;
  color: #989ba2;
  font-size: 14px;
  font-weight: var(--font-medium);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  display: flex;
  gap: 4px;
`;

const LogName = styled.div``;

const LogDate = styled.div``;

const Divider = styled.div`
  height: 20px;
  width: 1px;
  background-color: #f4f4f5;
`;
