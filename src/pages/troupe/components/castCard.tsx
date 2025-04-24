import { useState } from 'react';
import styled from 'styled-components';
import LocationSVG from '@assets/icons/location_gray.svg?react';
import bookmarkIcon from '@assets/icons/bookmark.svg';
import bookmarkFilledIcon from '@assets/icons/bookmark_filled.svg';
import { requestDeleteScrapCast, requestScrapCast } from '@/api/cast';
import { useNavigate } from 'react-router-dom';

interface CastCardProps {
  castId: number;
  castTitle: string;
  artworkName: string;
  practiceLocation: string;
  troupeName: string;
  isScrap: boolean;
}

const CastCard = ({
  castId,
  castTitle,
  artworkName,
  practiceLocation,
  troupeName,
  isScrap,
}: CastCardProps) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(isScrap);
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    if (loading) return;
    setLoading(true);

    try {
      if (isBookmarked) {
        // const res = await requestDeleteScrapCast(`${castId!}`);
        await requestDeleteScrapCast(`${castId!}`);
        setIsBookmarked(false);
      } else {
        // const res = await requestScrapCast(`${castId!}`);
        await requestScrapCast(`${castId!}`);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Bookmark action failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCastClick = () => {
    navigate(`/casts/${castId!}`);
  };

  return (
    <CastCardContainer onClick={handleCastClick}>
      <SummaryWrapper>
        <TitleText>{castTitle}</TitleText>
        <ArtworkName>{artworkName}</ArtworkName>
        <Address>
          <LocationSVG />
          {practiceLocation}
        </Address>
        <TroupeNameTag>{troupeName}</TroupeNameTag>
      </SummaryWrapper>
      <BookmarkButton onClick={handleBookmarkClick}>
        <BookmarkImage
          src={isBookmarked ? bookmarkFilledIcon : bookmarkIcon}
          alt={isBookmarked ? '북마크' : ''}
        />
      </BookmarkButton>
    </CastCardContainer>
  );
};

export default CastCard;

const CastCardContainer = styled.div`
  width: 340px;
  height: 176px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  display: flex;
  gap: 12px;
  padding: 20px;
  justify-content: center;
  cursor: pointer;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TitleText = styled.div`
  width: 256px;
  height: 52px;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: #171719;
  font-weight: var(--font-semibold);
`;

const ArtworkName = styled.div`
  font-size: 14px;
  font-weight: var(--font-regular);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #2e2f33;
`;

const Address = styled.div`
  font-size: 13px;
  font-weight: var(--font-regular);
  line-height: 138.5%;
  letter-spacing: 1.94%;
  color: #989ba2;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const BookmarkButton = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #e1e2e4;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BookmarkImage = styled.img`
  width: 30px;
  height: 40px;
`;

const TroupeNameTag = styled.div`
  border-radius: 4px;
  color: #b81716;
  background-color: #fdf2f2;
  font-size: 12px;
  letter-spacing: 2.52%;
  line-height: 133.4%;
  width: fit-content;
  padding: 4px 9px;
`;
