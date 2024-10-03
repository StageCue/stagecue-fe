import Button from "@/components/buttons/button";
import styled from "styled-components";

interface ApplyCastProps {
  applyId: number;
  recruitTitle: string;
  onClickCancle: (applyId: number) => void;
}

const ApplyCast = ({
  applyId,
  recruitTitle,
  onClickCancle,
}: ApplyCastProps) => {
  return (
    <ApplyCastContainer>
      <Title>{recruitTitle}</Title>
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
        onClick={() => onClickCancle(applyId)}
      >
        지원취소
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
  align-items: center;
  padding: 16px;
`;

const Title = styled.div``;
