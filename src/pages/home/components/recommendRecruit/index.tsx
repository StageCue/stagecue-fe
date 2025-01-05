import useSessionStore from "@/store";
import styled from "styled-components";
import FitRecruitSlide from "../fitRecruitSlide";

const RecommendRecruit = () => {
  const { username } = useSessionStore();

  return (
    <RecommendRecruitContainer>
      <TitleWrapper>
        <Title>
          {username}님을 위한&nbsp;
          <Strong> 추천공고 </Strong>에요!
          <Higliting />
        </Title>
      </TitleWrapper>
      <FitRecruitSlide />
    </RecommendRecruitContainer>
  );
};

export default RecommendRecruit;

const RecommendRecruitContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 32px;
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
  left: 110px;
  bottom: 7px;
  width: 100px;
  height: 4px;
  background-color: #ff9303;
  z-index: -10;
`;
