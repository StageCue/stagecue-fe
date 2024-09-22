import styled from "styled-components";
import LocationSVG from "@/assets/icons/location.svg?react";

interface CastProps {
  castId: number;
  castTitle: string;
  artworkName: string;
  practiceLocation: string;
  isScrapping: boolean;
  thumbnail: string;
}

const Cast = ({
  castId,
  castTitle,
  artworkName,
  practiceLocation,
  isScrapping,
  thumbnail,
}: CastProps) => {
  return (
    <CastContainer>
      <Poster src={`https://s3.stagecue.co.kr/stagecue/${thumbnail}`} />
      <TextWrapper>
        <Title>{castTitle}</Title>
        <Artwork>{artworkName}</Artwork>
        <Location>
          <LocationSVG />
          {practiceLocation}
        </Location>
      </TextWrapper>
    </CastContainer>
  );
};

export default Cast;

const CastContainer = styled.div`
  width: 196px;
  height: 394px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Poster = styled.img`
  border-radius: 8px;
  width: 196px;
  height: 294px;
`;

const TextWrapper = styled.div``;

const Title = styled.div`
  width: 196px;
  min-height: 24px;
  word-break: break-all;
  text-overflow: ellipsis;
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 150%;
`;

const Artwork = styled.div`
  width: 196px;
  height: 18px;
  text-overflow: ellipsis;
  color: #999ba2;
  font-weight: var(--font-medium);
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
`;

const Location = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  font-size: 12px;
  letter-spacing: 2.52%;
  line-height: 133.4%;
  color: #989ba2;
`;
