import styled from 'styled-components';
import RankedCasts from '../rankedCasts';
import EmptyWrapper from '@/components/emptyWrapper';

export interface PopularRecruitDetail {
  imageUrl: string;
  recruitId: number;
  shortAddress: string;
  title: string;
  troupeName: string;
  isScrap: boolean;
}

interface PopularRecruitProps {
  recruits: PopularRecruitDetail[];
}

const PopularPost = ({ recruits }: PopularRecruitProps) => {
  return (
    <PopularPostContainer>
      <TitleWrapper>
        <Title>
          이번주&nbsp;
          <Strong>인기 공고</Strong>입니다🏆
          <Higliting />
        </Title>
      </TitleWrapper>
      <Casts>
        {recruits?.length > 0 ? (
          <RankedCasts recruits={recruits} />
        ) : (
          <EmptyWrapper width={1060} height={394}>
            인기 공고가 없습니다.
          </EmptyWrapper>
        )}
      </Casts>
    </PopularPostContainer>
  );
};

export default PopularPost;

const PopularPostContainer = styled.div`
  width: 100%;
  max-width: 1060px;
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
  left: 79px;
  bottom: 7px;
  width: 104px;
  height: 4px;
  background-color: #ff9303;
  z-index: -10;
`;

const Casts = styled.div``;
