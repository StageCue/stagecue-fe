import Button from '@/components/buttons/button';
import Overlay from '@/components/modal/overlay';
import { UseFormHandleSubmit } from 'react-hook-form';
import styled from 'styled-components';
import { ProfileInput } from '../../profileForm';

interface SubmitModalProps {
  onClose: () => void;
  onConfirm: (data: ProfileInput) => void;
  handleSubmit: UseFormHandleSubmit<ProfileInput, undefined>;
}

const SubmitModal = ({ onClose, onConfirm, handleSubmit }: SubmitModalProps) => {
  return (
    <SubmitModalContainer>
      <Overlay>
        <ModalBox>
          <TextWrapper>
            <MainText>기본 프로필로 설정할까요?</MainText>
            <SubText>공고지원시 해당 프로필이 기본으로 설정됩니다.</SubText>
          </TextWrapper>
          <ButtonWrapper>
            <Button
              type="submit"
              variation="outlined"
              btnClass="primary"
              onClick={() => onClose()}
              width={146}
              height={48}
            >
              취소
            </Button>
            <Button
              type="submit"
              variation="solid"
              btnClass="primary"
              onClick={handleSubmit(onConfirm)}
              width={146}
              height={48}
            >
              설정
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </Overlay>
    </SubmitModalContainer>
  );
};

export default SubmitModal;

const SubmitModalContainer = styled.div``;

const ModalBox = styled.div`
  width: 340px;
  height: 176px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 24px 20px;
`;

const TextWrapper = styled.div``;

const MainText = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  text-align: center;
`;

const SubText = styled.div`
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
