/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import ChevronRightSVG from '@assets/icons/chevron_right.svg?react';
import BookmarkSVG from '@assets/icons/bookmark.svg?react';
import BookmarkFilledSVG from '@assets/icons/bookmark_filled.svg?react';
import { useEffect, useState } from 'react';
import BasicInfo from '../components/basicInfo';
import LocationInfo from '../components/locationInfo';
import PracticeInfo from '../components/practiceInfo';
import Application from '../components/application';
import { requestCastDetail, requestDeleteScrapCast, requestScrapCast } from '@/api/cast';
import { useNavigate, useParams } from 'react-router-dom';
import PostImageSlide from '../components/slide';
import useSessionStore from '@/store/session';
import { requestTroupeDetail } from '@/api/troupe';
import { RecruitDetail } from '@/types/recruitDetail';
import { getDday } from '@/utils/getDday';
import { getCoordinates } from '@/utils/getCoordinates';
import { cleanAddress } from '@/utils/cleanAddress';
import { INDEFINITE_DATE } from '@/constants/biz';
import DetailSkeleton from './components/skeleton';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recruitDetail, setRecruitDetail] = useState<RecruitDetail>();
  const [troupeImage, setTroupeImage] = useState<string>();
  const [selectedTab, setSelectedTab] = useState('공연 기본 정보');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { isLoggined } = useSessionStore();

  const handleTabClick = (option: string) => {
    setSelectedTab(option);
  };

  const handleBookmarkClick = async () => {
    if (isBookmarked) {
      const { result } = await requestDeleteScrapCast(id!);

      if (result) {
        setIsBookmarked(false);
      }
    } else {
      const { result } = await requestScrapCast(id!);

      if (result) {
        setIsBookmarked(true);
      }
    }
  };

  const handleTroupeNameClick = () => {
    navigate(`/troupe/${recruitDetail?.troupeName}`);
  };

  const getCastDetail = async () => {
    if (!id) return null;

    try {
      const { result } = await requestCastDetail(id);

      if (result?.isScrap) {
        setIsBookmarked(true);
      }

      return result;
    } catch (error) {
      console.error('캐스트 정보 조회 실패:', error);
      return null;
    }
  };

  const getLocationCoordinates = async (
    address: string,
    existingLat: number,
    existingLng: number
  ) => {
    if (!address || (existingLat && existingLng)) {
      return { lat: existingLat || 0, lng: existingLng || 0 };
    }

    try {
      const cleanedAddress = cleanAddress(address);
      const { lng, lat } = await getCoordinates(cleanedAddress);

      return { lat, lng };
    } catch (error) {
      console.error('좌표 조회 실패:', error);
      return { lat: 0, lng: 0 };
    }
  };

  const getTroupeDetail = async (recruitDetail: RecruitDetail) => {
    if (!recruitDetail) return;

    try {
      const promises = [];

      promises.push(
        getLocationCoordinates(
          recruitDetail?.practiceAddress,
          recruitDetail?.practiceLocationLat,
          recruitDetail?.practiceLocationLng
        )
      );

      promises.push(
        getLocationCoordinates(
          recruitDetail?.theatreAddress,
          recruitDetail?.theatreLocationLat,
          recruitDetail?.theatreLocationLng
        )
      );

      if (recruitDetail?.troupeName) {
        const troupePromise = requestTroupeDetail(recruitDetail?.troupeName);
        promises.push(troupePromise);
      }

      const [practiceCoords, theatreCoords, troupeResponse] = await Promise.all(promises);

      if (troupeResponse?.result?.logoImage) {
        setTroupeImage(troupeResponse.result.logoImage);
      }

      setRecruitDetail({
        ...recruitDetail,
        practiceLocationLat: practiceCoords?.lat,
        practiceLocationLng: practiceCoords?.lng,
        theatreLocationLat: theatreCoords?.lat,
        theatreLocationLng: theatreCoords?.lng,
      });
    } catch (error) {
      console.error('극단 정보 조회 실패:', error);
      setRecruitDetail(recruitDetail);
    }
  };

  useEffect(() => {
    const getCastAndTroupeDetail = async () => {
      try {
        const castDetail = await getCastDetail();

        if (castDetail) {
          await getTroupeDetail(castDetail);
        }
      } catch (error) {
        console.error('캐스트 및 극단 정보 로딩 실패:', error);
      }
    };

    getCastAndTroupeDetail();
  }, [id]);

  if (!recruitDetail) {
    return <DetailSkeleton />;
  }

  return (
    <DetailContainer>
      <ContentWrapper>
        <Header>
          <TitleWrapper>
            <DdayWrapper>
              <Dday>
                {recruitDetail?.recruitEndDate === INDEFINITE_DATE
                  ? '상시모집'
                  : `D${getDday(recruitDetail?.recruitEndDate as string)}`}
              </Dday>
              {isLoggined && (
                <BookmarkWrapper onClick={handleBookmarkClick}>
                  {isBookmarked ? <BookmarkFilledSVG /> : <BookmarkSVG />}
                </BookmarkWrapper>
              )}
            </DdayWrapper>
            <Title>{recruitDetail?.title}</Title>
          </TitleWrapper>
          <Divider />
          <TroupeWrapper>
            <TroupeLogo src={troupeImage} />
            <TroupeName onClick={handleTroupeNameClick}>
              {recruitDetail?.troupeName}
              <IconWrapper>
                <ChevronRightSVG />
              </IconWrapper>
            </TroupeName>
          </TroupeWrapper>
          {recruitDetail && <PostImageSlide images={recruitDetail?.recruitImages} />}
        </Header>
        <Content>
          <ContentTab>
            <Option
              onClick={() => handleTabClick('공연 기본 정보')}
              $isSelected={selectedTab === '공연 기본 정보'}
            >
              공연 기본 정보
              {selectedTab === '공연 기본 정보' && <SelectedBorder />}
            </Option>
            <Option
              onClick={() => handleTabClick('공연 위치 정보')}
              $isSelected={selectedTab === '공연 위치 정보'}
            >
              공연 위치 정보
              {selectedTab === '공연 위치 정보' && <SelectedBorder />}
            </Option>
            <Option
              onClick={() => handleTabClick('연습 장소 정보')}
              $isSelected={selectedTab === '연습 장소 정보'}
            >
              연습 장소 정보
              {selectedTab === '연습 장소 정보' && <SelectedBorder />}
            </Option>
          </ContentTab>
          {recruitDetail && (
            <ContentBody>
              {selectedTab === '공연 기본 정보' && (
                <BasicInfo
                  introduce={recruitDetail?.recruitIntroduce}
                  start={recruitDetail?.theatreStartDate}
                  end={recruitDetail?.theatreEndDate}
                  monthlyFee={recruitDetail?.monthlyFee}
                  recruitingParts={recruitDetail?.recruitingParts}
                />
              )}
              {selectedTab === '공연 위치 정보' && (
                <LocationInfo
                  address={recruitDetail?.theatreAddress}
                  addressDetail={recruitDetail?.theatreAddressDetail}
                  lat={recruitDetail?.theatreLocationLat}
                  lng={recruitDetail?.theatreLocationLng}
                />
              )}
              {selectedTab === '연습 장소 정보' && (
                <PracticeInfo
                  start={recruitDetail?.practiceStartDate}
                  end={recruitDetail?.practiceEndDate}
                  address={recruitDetail?.practiceAddress}
                  addressDetail={recruitDetail?.practiceAddressDetail}
                  practiceDay={recruitDetail?.practiceDay}
                  lat={recruitDetail?.practiceLocationLat}
                  lng={recruitDetail?.practiceLocationLng}
                />
              )}
            </ContentBody>
          )}
        </Content>
      </ContentWrapper>
      {recruitDetail && isLoggined && (
        <Application recruitId={id!} isApplied={recruitDetail?.isApply} />
      )}
    </DetailContainer>
  );
};

export default Detail;

const DetailContainer = styled.div`
  width: 100%;
  min-width: 1060px;
  height: 100%;
  min-height: inherit;
  display: flex;
  margin-top: 60px;
  margin-bottom: 100px;
`;

const ContentWrapper = styled.div`
  width: 689px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Dday = styled.div`
  height: 26px;
  background-color: #000000;
  border-radius: 4px;
  font-weight: var(--font-semibold);
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2px 6px;
  font-size: 15px;
`;

const Title = styled.div`
  height: 32px;
  font-size: 24px;
  letter-spacing: -2.3%;
  line-height: 133.4%;
  font-weight: var(--font-bold);
`;

const TroupeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TroupeLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const TroupeName = styled.div`
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
`;

const Divider = styled.div`
  width: 689px;
  height: 1px;
  background-color: #f4f4f5;
`;

const Content = styled.div``;

const ContentTab = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #f4f4f5;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const ContentBody = styled.div`
  width: 689px;
  padding: 24px 0;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  min-width: 118px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isSelected }) => ($isSelected ? '#171719' : '#999ba2')};
  cursor: pointer;
  position: relative;
`;

const SelectedBorder = styled.div`
  position: absolute;
  height: 4px;
  width: 118px;
  background-color: #b82824;
  bottom: -2px;
`;

const BookmarkWrapper = styled.div`
  cursor: pointer;
`;
