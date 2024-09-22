import styled from "styled-components";
import { Cast } from "../newPost";
import { useEffect, useState } from "react";

interface RankedCastsProps {
  casts: Cast[];
}

const RankedCasts = ({ casts }: RankedCastsProps) => {
  const [selectedCast, setSelectedCast] = useState<Cast>();

  const handleThumbnailClick = (cast: Cast) => {
    setSelectedCast(cast);
  };

  useEffect(() => {
    setSelectedCast(casts[0]);
  }, [casts]);
  return (
    <RankedCastsContainer>
      <ThumbnailWrapper>
        <SelectedThumbnail
          src={`https://s3.stagecue.co.kr/stagecue/${selectedCast?.thumbnail}`}
        />
      </ThumbnailWrapper>
      <RightSideWrapper>
        <SummaryWrapper>
          <TitleWrapper>
            <TroupeName>업템포극단</TroupeName>
            <CastTitle>{selectedCast?.castTitle}</CastTitle>
            <ArtworkName>{selectedCast?.artworkName}</ArtworkName>
          </TitleWrapper>
          <Summary />
        </SummaryWrapper>
        <Thumbnails>
          {casts.map((cast) => (
            <Thumbnail
              key={cast.castId}
              src={`https://s3.stagecue.co.kr/stagecue/${cast.thumbnail}`}
              onClick={() => handleThumbnailClick(cast)}
              $isSelected={cast.castId === selectedCast?.castId}
            />
          ))}
        </Thumbnails>
      </RightSideWrapper>
    </RankedCastsContainer>
  );
};

export default RankedCasts;

const RankedCastsContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
`;

const SelectedThumbnail = styled.img`
  width: 325px;
  height: 488px;
  border-radius: 8px;
`;

const RightSideWrapper = styled.div`
  width: 711px;
  height: 488px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SummaryWrapper = styled.div`
  width: 711px;
  height: 270px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TroupeName = styled.div`
  width: 72px;
  height: 24px;
  border-radius: 4px;
  background-color: #fdf2f2;
  color: #dc1f1e;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: var(--font-medium);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CastTitle = styled.div`
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  color: #171719;
`;

const ArtworkName = styled.div`
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
  font-weight: var(--font-regular);
  color: #47484b;
`;

const Summary = styled.div`
  width: 711px;
  height: 172px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 13px;
`;

const Thumbnail = styled.img<{ $isSelected: boolean }>`
  border-radius: 8px;
  width: 132px;
  height: 198px;
  border: ${({ $isSelected }) => ($isSelected ? "2px solid #B81716" : "none")};
  cursor: pointer;
`;
