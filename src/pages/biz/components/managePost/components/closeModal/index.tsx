import Button from "@/components/buttons/button";
import Overlay from "@/components/modal/overlay";
import styled from "styled-components";

interface CloseModalProps {
  onClose: () => void;
  onConfirm: () => void;
  targetLength: number;
}

const CloseModal = ({ onClose, onConfirm, targetLength }: CloseModalProps) => {
  return (
    <CloseModalContainer>
      <Overlay>
        <ModalBox>
          <TextWrapper>
            <MainText>공고 마감</MainText>
            <SubText>선택한 {targetLength}개의 공고를 마감할까요?</SubText>
          </TextWrapper>
          <ButtonWrapper>
            <Button
              variation="outlined"
              btnClass="primary"
              width={146}
              height={48}
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              variation="solid"
              btnClass="primary"
              width={146}
              height={48}
              onClick={onConfirm}
            >
              마감
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </Overlay>
    </CloseModalContainer>
  );
};

export default CloseModal;

const CloseModalContainer = styled.div``;

const ModalBox = styled.div`
  width: 340px;
  height: 176px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 24px 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainText = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  text-align: center;
`;

const SubText = styled.div`
  width: 300px;
  height: 36px;
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
  font-weight: var(--font-regular);
  text-align: center;
  color: #47484b;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
