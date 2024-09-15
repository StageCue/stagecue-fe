import styled from "styled-components";
import ChevronLeftSVG from "@/assets/icons/chevron_left.svg?react";
import ChevronRightSVG from "@/assets/icons/chevron_right.svg?react";

const ThemePost = () => {
  return (
    <ThemePostContainer>
      <TitleWrapper>
        <Title>
          <Strong>테마별 공고</Strong>를 살펴볼까요?
          <Higliting />
        </Title>
        <PaginatorWrapper>
          <PrevBtn>
            <ChevronLeftSVG />
          </PrevBtn>
          <NextBtn>
            <ChevronRightSVG />
          </NextBtn>
        </PaginatorWrapper>
      </TitleWrapper>
    </ThemePostContainer>
  );
};

export default ThemePost;

const ThemePostContainer = styled.div`
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
  width: 127px;
  height: 4px;
  background-color: #ff9303;
  z-index: -10;
`;

const PaginatorWrapper = styled.div`
  width: 79px;
  height: 40px;
  display: flex;
`;

const PrevBtn = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e1e2e4;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  cursor: pointer;
`;

const NextBtn = styled.div`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e1e2e4;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  cursor: pointer;
`;
