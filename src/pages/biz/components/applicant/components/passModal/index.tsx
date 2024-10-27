import Button from "@/components/buttons/button";
import Overlay from "@/components/modal/overlay";
import styled from "styled-components";

interface PassModalProps {
  type: "합격" | "반려";
  onClose: () => void;
  onConfirm: () => void;
  name: string;
}

const PassModal = ({ onClose, onConfirm, name, type }: PassModalProps) => {
  return (
    <PassModalContainer>
      <Overlay zIndex={2000}>
        <ModalBox>
          <TextWrapper>
            <MainText>{type === "합격" ? "합격처리" : "반려처리"}</MainText>
            <SubText>
              {type === "합격"
                ? `선택하신 ${name}님을 합격처리할까요?`
                : `선택하신 ${name}님을 반려처리할까요?`}
            </SubText>
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
              {type}
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </Overlay>
    </PassModalContainer>
  );
};

export default PassModal;

const PassModalContainer = styled.div``;

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
