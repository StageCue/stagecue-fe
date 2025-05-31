import Button from '@/components/buttons/button';
import Overlay from '@/components/modal/overlay';
import styled from 'styled-components';

interface PassModalProps {
  type: '합격' | '반려';
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  cnt: number;
}

const PassModal = ({ onClose, onConfirm, name, type, cnt }: PassModalProps) => {
  const nameText = cnt === 1 ? `${name}님을` : `${name}님 외 ${cnt - 1}명을<br />`;
  return (
    <PassModalContainer>
      <Overlay zIndex={2000}>
        <ModalBox>
          <TextWrapper>
            <MainText>{type === '합격' ? '합격처리' : '반려처리'}</MainText>
            <SubText>
              선택하신 <Strong dangerouslySetInnerHTML={{ __html: nameText }}></Strong> {type}
              처리할까요?
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
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
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
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
  font-weight: var(--font-regular);
  text-align: center;
  color: #47484b;
`;

const Strong = styled.span`
  font-weight: var(--font-semibold);
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
