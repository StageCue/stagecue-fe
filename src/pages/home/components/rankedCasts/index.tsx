import styled from "styled-components";
import { useEffect, useState } from "react";
import { RecruitDetail } from "../popularPost";
import LocationSVG from "@assets/icons/location.svg?react";
import Button from "@/components/buttons/button";
import ArrowRightSVG from "@assets/icons/arrow_right_red.svg?react";
import { useNavigate } from "react-router-dom";

interface RankedRecruitsProps {
  recruits: RecruitDetail[];
}

const RankedCasts = ({ recruits }: RankedRecruitsProps) => {
  const navigate = useNavigate();
  const [selectedRecruit, setSelectedRecruit] = useState<RecruitDetail>();

  const handleThumbnailClick = (recruit: RecruitDetail) => {
    setSelectedRecruit(recruit);
  };

  const handleClickDetail = (id?: number) => {
    navigate(`/casts/${id}`);
  };

  useEffect(() => {
    setSelectedRecruit(recruits[0]);
  }, [recruits]);
  return (
    <RankedCastsContainer>
      <ThumbnailWrapper>
        <SelectedThumbnail
          src={`https://s3.stagecue.co.kr/stagecue/${selectedRecruit?.thumbnailUrl}`}
        />
      </ThumbnailWrapper>
      <RightSideWrapper>
        <SummaryWrapper>
          <TitleWrapper>
            <TroupeName>{selectedRecruit?.troupeName}</TroupeName>
            <CastTitle>{selectedRecruit?.title}</CastTitle>
            <ArtworkName>{selectedRecruit?.artworkName}</ArtworkName>
          </TitleWrapper>
          <Summary>
            <SummaryRow>
              <PropertyWrapper>
                <Property>지원 가능 배역</Property>
                <Value>
                  {selectedRecruit?.recruitingParts.map((part) => (
                    <Chip>{part}</Chip>
                  ))}
                </Value>
              </PropertyWrapper>
              <PropertyWrapper>
                <Property>연습 위치</Property>
                <Value>
                  <LocationSVG />
                  <LocationText>
                    {selectedRecruit?.practiceAddress}
                  </LocationText>
                </Value>
              </PropertyWrapper>
              <Button
                variation="outlined"
                btnClass="primary"
                padding="7px 14px"
                width={94}
                height={32}
                fontSize={13}
                onClick={() => handleClickDetail(selectedRecruit?.id)}
              >
                상세보기
                <ArrowRightSVG />
              </Button>
            </SummaryRow>
            <SummaryRow>
              <PropertyWrapper>
                <Property>극단소개</Property>
                <Value>{selectedRecruit?.troupeIntroduce}</Value>
              </PropertyWrapper>
            </SummaryRow>
          </Summary>
        </SummaryWrapper>
        <Thumbnails>
          {recruits.map((recruit) => (
            <Thumbnail
              key={recruit.id}
              src={`https://s3.stagecue.co.kr/stagecue/${recruit.thumbnailUrl}`}
              onClick={() => handleThumbnailClick(recruit)}
              $isSelected={recruit.id === selectedRecruit?.id}
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
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const SummaryRow = styled.div`
  width: 671px;
  height: 62px;
  display: flex;
  gap: 12px;
`;

const PropertyWrapper = styled.div`
  min-width: 276px;
  height: 62px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Property = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 18px;
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;

const Value = styled.div`
  display: flex;
  gap: 4px;
  color: #858688;
`;

const Chip = styled.div`
  min-width: 49px;
  height: 28px;
  padding: 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f5;
  color: #818184;
  border-radius: 40px;
`;

const LocationText = styled.div`
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #858688;
`;
