import { useEffect, useState } from "react";
import styled from "styled-components";
import RadioSVG from "@assets/icons/radio.svg?react";
import RadioCheckedSVG from "@assets/icons/radio_checked.svg?react";
import DotdotdotSVG from "@/assets/images/dotdotdot.svg?react";
import Button from "@/components/buttons/button";
import { requestScraps } from "@/api/users";
import Cast from "@/pages/home/components/cast";

const Scraps = () => {
  const [isFilteredClosedPost, setIsFilteredClosedPost] = useState(false);
  const [scraps, setScraps] = useState([]);

  const handleFilterClick = () => {
    setIsFilteredClosedPost((curr) => !curr);
  };

  const getScrappedCasts = async () => {
    const { casts } = await requestScraps({
      limit: 3,
      offset: 0,
    });

    setScraps(casts);
  };

  useEffect(() => {
    getScrappedCasts();
  }, []);
  return (
    <ScrapContainer>
      <TitleWrapper>
        <ItemTitle>스크랩한 전체 공고 ({scraps.length})</ItemTitle>
        <FilterInput onClick={handleFilterClick}>
          {isFilteredClosedPost ? <RadioCheckedSVG /> : <RadioSVG />}
          마감 공고 제외
        </FilterInput>
      </TitleWrapper>

      {scraps?.length === 0 ? (
        <NoScrap>
          <DotdotdotSVG />
          <TextWrapper>
            <Text>아직 스크랩한 공고가 없어요.</Text>
          </TextWrapper>
          <Button variation="solid" btnClass="primary" width={296}>
            공고 찾아보기
          </Button>
        </NoScrap>
      ) : (
        <ScrapList>
          {scraps?.map(
            ({
              castId,
              imageUrl,
              castTitle,
              artworkName,
              practiceLocation,
              isScrapping,
            }) => (
              <Cast
                key={castId}
                castId={castId}
                thumbnail={imageUrl}
                castTitle={castTitle}
                artworkName={artworkName}
                practiceLocation={practiceLocation}
                isScrapping={isScrapping}
              />
            )
          )}
        </ScrapList>
      )}
    </ScrapContainer>
  );
};

export default Scraps;

const ScrapContainer = styled.div`
  width: 100%;
`;

const ItemTitle = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const FilterInput = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 4px;
`;

const NoScrap = styled.div`
  width: 685px;
  height: 248px;
  padding: 28px 0;
  background-color: #f7f7f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
`;

const ScrapList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  row-gap: 40px;
`;
