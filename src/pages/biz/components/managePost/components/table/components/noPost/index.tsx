import Button from "@/components/buttons/button";
import styled from "styled-components";

interface NoPostProps {
  onClick: () => void;
}

const NoPost = ({ onClick }: NoPostProps) => {
  return (
    <NoPostContainer>
      <TextWrapper>
        <Text>작성된 공고가 없습니다.</Text>
        <Text>모집 공고를 등록해보세요!</Text>
      </TextWrapper>
      <Button
        variation="outlined"
        btnClass="primary"
        width={142}
        height={40}
        fontSize={15}
        lineHeight={146.7}
        letterSpacing={0.96}
        padding="9px 20px"
        onClick={onClick}
      >
        모집 공고 올리기
      </Button>
    </NoPostContainer>
  );
};

export default NoPost;

const NoPostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 162.5%;
  letter-spacing: 0.57%;
`;
