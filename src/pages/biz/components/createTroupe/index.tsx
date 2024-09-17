import Button from "@/components/buttons/button";
import { useState } from "react";
import styled from "styled-components";
import RegisterTroupe from "../registerTroupe";

const CreateTroupe = () => {
  const [isStartingTroupe, setIsStartingTroupe] = useState(false);

  const handleRegisterTroupe = () => {
    setIsStartingTroupe(true);
  };
  return (
    <CreateTroupeContaienr>
      {!isStartingTroupe && (
        <NoTroupe>
          <Instruction>우리 극단을 소개하고, 단원을 모집해보세요.</Instruction>
          <Button
            variation="outlined"
            btnClass="primary"
            width={160}
            height={40}
            fontSize={15}
            padding="9px 20px"
            onClick={handleRegisterTroupe}
          >
            극단 소개 등록하기
          </Button>
        </NoTroupe>
      )}
      {isStartingTroupe && <RegisterTroupe />}
    </CreateTroupeContaienr>
  );
};

export default CreateTroupe;

const CreateTroupeContaienr = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
`;

const NoTroupe = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  justify-content: center;
  align-items: center;
  gap: 24px;
  display: flex;
  flex-direction: column;
`;

const Instruction = styled.div`
  font-weight: var(--font-regular);
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
`;
