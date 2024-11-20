import Button from "@/components/buttons/button";
import Overlay from "@/components/modal/overlay";
import styled from "styled-components";

interface InvalidFileModalProps {
  onConfirm: () => void;
}

const InvalidFileModal = ({ onConfirm }: InvalidFileModalProps) => {
  return (
    <InvalidFileModalContainer>
      <Overlay>
        <ModalBox>
          <TextWrapper>
            <MainText>이미지 업로드 오류</MainText>
            <SubText>{`파일 형식 또는 크기가 맞지 않아요\n 1MB 이하의 JPG, JPEG, PNG 파일로\n 다시 업로드 해주세요.`}</SubText>
          </TextWrapper>
          <Button
            variation="solid"
            btnClass="primary"
            width={300}
            height={48}
            onClick={onConfirm}
          >
            확인
          </Button>
        </ModalBox>
      </Overlay>
    </InvalidFileModalContainer>
  );
};

export default InvalidFileModal;

const InvalidFileModalContainer = styled.div``;

const ModalBox = styled.div`
  width: 340px;
  height: 224px;
  padding: 20px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
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
  white-space: pre-wrap;
`;
