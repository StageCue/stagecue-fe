/* eslint-disable @typescript-eslint/no-explicit-any */
import useSessionStore from "@/store/session";
import styled from "styled-components";
import FitRecruitSlide from "../fitRecruitSlide";

const RecommendRecruit = ({ recommendRecruits }: any) => {
  const { username } = useSessionStore();

  return (
    <RecommendRecruitContainer>
      <TitleWrapper>
        <Title>
          {username}님을 위한&nbsp;
          <Strong>
            추천공고
            <Higliting />
          </Strong>
          에요!
        </Title>
      </TitleWrapper>
      <FitRecruitSlide recommendRecruits={recommendRecruits} />
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
  position: relative;
  font-weight: var(--font-bold);
`;

const Higliting = styled.div`
  position: absolute;
  left: 0px;
  bottom: 7px;
  width: 100px;
  height: 4px;
  background-color: #ff9303;
  z-index: -10;
`;
