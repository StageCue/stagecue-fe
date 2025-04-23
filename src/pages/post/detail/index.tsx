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

  const getTroupeDetail = async () => {
    if (recruitDetail?.troupeName) {
      const { result } = await requestTroupeDetail(recruitDetail?.troupeName);
      setTroupeImage(result?.logoImage);
    }
  };

  const getCastDetail = async () => {
    if (id) {
      const { result } = await requestCastDetail(id);
      setRecruitDetail(result);

      if (result?.isScrap) {
        setIsBookmarked(true);
      }
    }
  };

  const handleTroupeNameClick = () => {
    navigate(`/troupe/${recruitDetail?.troupeName}`);
  };

  useEffect(() => {
    getCastDetail();
  }, []);

  useEffect(() => {
    getTroupeDetail();
  }, [recruitDetail]);

  return (
    <DetailContainer>
      <ContentWrapper>
        <Header>
          <TitleWrapper>
            <DdayWrapper>
              <Dday>D{getDday(recruitDetail?.recruitEndDate as string)}</Dday>
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

const Content = styled.div``;

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
  width: 50px;
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

const ContentTab = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #f4f4f5;
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

const ContentBody = styled.div`
  width: 689px;
`;

const BookmarkWrapper = styled.div`
  cursor: pointer;
`;
