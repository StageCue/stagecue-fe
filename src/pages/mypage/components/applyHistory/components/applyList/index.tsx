import styled from "styled-components";
import { applyPhaseType } from "../..";
import { useEffect, useState } from "react";
import { requestAppliedCasts, requestCancelApply } from "@/api/users";
import Button from "@/components/buttons/button";
import DotdotdotSVG from "@/assets/images/dotdotdot.svg?react";
import ApplyCast from "../applyCast";

interface ApplyListProps {
  status: applyPhaseType;
}

const ApplyList = ({ status }: ApplyListProps) => {
  const [casts, setCasts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAppliedCasts = async () => {
    const res = await requestAppliedCasts({
      limit: 10,
      offset: 0,
      status: status === "APPLIED" ? "" : status,
    });
    const { applies } = res;

    setCasts(applies);
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClick = async (applyId: number) => {
    setIsModalOpen(false);
    const res = await requestCancelApply(applyId);

    if (res) {
      getAppliedCasts();
    }
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAppliedCasts();
  }, [status]);

  return (
    <ApplyListContainer>
      {casts.length === 0 ? (
        <NoApplyHistory>
          <DotdotdotSVG />
          <TextWrapper>
            <Text>아직 지원한 공고가 없어요.</Text>
            <SubText>다양한 공고들을 둘러볼까요?</SubText>
          </TextWrapper>
          <Button variation="solid" btnClass="primary" width={296}>
            공고 찾아보기
          </Button>
        </NoApplyHistory>
      ) : (
        casts.map(
          ({
            applyId,
            troupeName,
            applyStatus,
            recruitTitle,
            applyStatusLogs,
          }) => (
            <ApplyCast
              key={applyId}
              applyId={applyId}
              applyStatus={applyStatus}
              applyStatusLogs={applyStatusLogs}
              recruitTitle={recruitTitle}
              onClickCancel={handleCancelClick}
              troupeName={troupeName}
              onConfirm={() => handleConfirmClick(applyId)}
              onClose={handleCloseClick}
              isModalOpen={isModalOpen}
            />
          )
        )
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
