import styled from "styled-components";
import ChevronRightSVG from "@/assets/icons/chevron_right_red_s.svg?react";
import Button from "@/components/buttons/button";
const NewPost = () => {
  return (
    <NewPostContainer>
      <TitleWrapper>
        <Title>
          <Strong>새로 등록된 공고</Strong>를 확인해보세요!
          <Higliting />
        </Title>
        <Button variation="text" btnClass="primary" width={110} height={32}>
          공고 더보기
          <ChevronRightSVG />
        </Button>
      </TitleWrapper>
    </NewPostContainer>
  );
};

export default NewPost;

const NewPostContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 32px;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  position: relative;
  font-size: 28px;
  font-weight: var(--font-regualr);
  line-height: 135.8%;
  letter-spacing: -2.36%;
  color: black;
  z-index: 20;
`;

const Strong = styled.div`
  font-weight: var(--font-bold);
`;

const Higliting = styled.div`
  position: absolute;
  left: 2px;
  bottom: 7px;
  width: 180px;
  height: 4px;
  background-color: #ff9303;
  z-index: -10;
`;
