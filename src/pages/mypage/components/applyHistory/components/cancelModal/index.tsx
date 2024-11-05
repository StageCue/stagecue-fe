import Button from "@/components/buttons/button";
import Overlay from "@/components/modal/overlay";
import styled from "styled-components";

interface CancelModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const CancelModal = ({ onClose, onConfirm }: CancelModalProps) => {
  return (
    <CancelModalContainer>
      <Overlay>
        <ModalBox>
          <TextWrapper>
            <MainText>지원취소 할까요?</MainText>
            <SubText>{`취소 후 다시 재지원이 가능하나,\n무분별한 지원 및 취소는 권장드리지 않아요.`}</SubText>
          </TextWrapper>
          <ButtonWrapper>
            <Button
              variation="outlined"
              btnClass="primary"
              width={146}
              height={48}
              onClick={onClose}
            >
              닫기
            </Button>
            <Button
              variation="solid"
              btnClass="primary"
              width={146}
              height={48}
              onClick={onConfirm}
            >
              지원취소
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </Overlay>
    </CancelModalContainer>
  );
};

export default CancelModal;

const CancelModalContainer = styled.div``;

const ModalBox = styled.div`
  width: 340px;
  height: 200px;
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
  height: 48px;
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
  font-weight: var(--font-regular);
  text-align: center;
  color: #47484b;
  white-space: pre-wrap;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
