import { requestFollowTroupe, requestTroupeDetail, requestUnfollowTroupe } from '@/api/troupe';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import LocationSVG from '@assets/icons/location_lg.svg?react';
import PlusSVG from '@assets/icons/plus_white.svg?react';
import CaretSVG from '@assets/icons/caret_right.svg?react';
import CheckSVG from '@assets/icons/checkline_white.svg?react';
import Button from '@/components/buttons/button';
import { formatPhoneNumber } from '@/utils/format';
import CastCard from '../components/castCard';
import { Swiper, SwiperSlide } from 'swiper/react';

interface TroupeDetail {
  id: string;
  troupeName: string;
  description: string;
  address: string;
  addressDetail: string;
  addressLat: number;
  addressLng: number;
  websiteUrl: string;
  logoImage: string;
  bgImage: string;
  isVerify: boolean;
  managerName: string;
  managerCell: string;
  followerCount: number;
  publishDate: string;
  recruits: [
    {
      id: number;
      title: string;
      artworkName: string;
      shortAddress: string;
      troupeName: string;
      isScrap: true;
    }
  ];
}

const TroupeDetail = () => {
  const { troupeName } = useParams();
  const [detail, setDetail] = useState<TroupeDetail>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationAddress, setLocationAddress] = useState<{ lng: number; lat: number }>({
    lng: 0,
    lat: 0,
  });

  const getTroupeDetail = async () => {
    const { result } = await requestTroupeDetail(troupeName!);

    if (!result) {
      alert('극단 정보를 불러오는데 실패했습니다.');
      return;
    }

    setDetail(result);
    if (result?.addressLat !== null && result?.addressLng !== null) {
      setLocationAddress({ lng: result?.addressLng, lat: result?.addressLat });
    } else {
      getCoordinates(`${result?.address}`);
    }

    if (result?.isFollow) {
      setIsFollowing(true);
    }
  };

  const getCoordinates = async (address: string) => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const secretId = import.meta.env.VITE_NAVER_SECRET_ID;
    const url = `/naver-geocode/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': clientId,
          'X-NCP-APIGW-API-KEY': secretId,
        },
      });

      const data = await response?.json();

      if (data?.addresses?.length > 0) {
        const { x: lng, y: lat } = data.addresses[0];

        setLocationAddress({ lng, lat });
      } else {
        throw new Error('주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('Geocoding 에러:', error);
    }
  };

  const handleFollowClick = async () => {
    if (loading) return;
    setLoading(true);

    if (!detail) return;

    try {
      if (isFollowing) {
        const { result } = await requestUnfollowTroupe(detail?.id);
        if (result) {
          setIsFollowing(false);
          detail.followerCount--;
        }
      } else {
        const { result } = await requestFollowTroupe(detail?.id);
        if (result) {
          setIsFollowing(true);
          detail.followerCount++;
        }
      }
    } catch (error) {
      console.error('Following action failed', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWebsiteClick = () => {
    if (detail?.websiteUrl) {
      window.open(detail?.websiteUrl, '_blank');
    }
  };

  useEffect(() => {
    getTroupeDetail();
  }, []);

  const parsePublishDate = (date?: string) => {
    return date?.split('-')[0];
  };

  const getYearsOfExperience = (date?: string) => {
    const currentYear = new Date().getFullYear();
    const publishYear = Number(parsePublishDate(date));
    return currentYear - publishYear + 1;
  };

  return (
    <TroupeDetailContainer>
      <CoverBox $bgSrc={detail?.bgImage as string}>
        <BackgroundLayout>
          <CoverTextWrapper>
            <TroupeName>{detail?.troupeName}</TroupeName>
            <Description>{detail?.description}</Description>
          </CoverTextWrapper>
        </BackgroundLayout>
      </CoverBox>
      <InfoWrapper>
        <PositionInfoBox>
          <Property>극단위치</Property>
          <AddressWrapper>
            <LocationSVG />
            <LocationTextWrapper>
              <TextRow>
                <Name>해봄 공연장</Name>
                <Slash>/</Slash>
                <PhoneNumber>02-1234-5677</PhoneNumber>
              </TextRow>
              <TextRow>
                <Address>
                  {detail?.address} {detail?.addressDetail}
                </Address>
              </TextRow>
            </LocationTextWrapper>
          </AddressWrapper>
          <Map
            src={`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=571&h=233&center=${
              locationAddress?.lng
            },${locationAddress?.lat}&level=16&scale=2&X-NCP-APIGW-API-KEY-ID=${
              import.meta.env.VITE_NAVER_CLIENT_ID
            }`}
          />
        </PositionInfoBox>
        <TroupeInfoWrapper>
          <TroupeTopBox>
            <TroupeTopTopBox>
              <TroupeSummaryWrapper>
                <TroupeLogoNameWrapper>
                  <TroupeLogo src={detail?.logoImage} />
                  <TroupeNameInfo>{detail?.troupeName}</TroupeNameInfo>
                </TroupeLogoNameWrapper>
                <FollowerCount>{detail?.followerCount}명이 팔로우중</FollowerCount>
              </TroupeSummaryWrapper>
              <Button
                variation="solid"
                btnClass="primary"
                width={114}
                height={40}
                lineHeight={146.7}
                letterSpacing={0.96}
                fontWeight={'var(--font-semibold)'}
                fontSize={15}
                padding="9px 23px"
                onClick={handleFollowClick}
              >
                {isFollowing ? (
                  <>
                    <CheckSVG />
                    팔로잉
                  </>
                ) : (
                  <>
                    <PlusSVG />
                    팔로우
                  </>
                )}
              </Button>
            </TroupeTopTopBox>
            <TroupeTopBottomBox>
              <Property>설립연도</Property>
              <Value>
                {parsePublishDate(detail?.publishDate)}년<Slash>/</Slash>
                {getYearsOfExperience(detail?.publishDate)}년차
              </Value>
            </TroupeTopBottomBox>
          </TroupeTopBox>
          <TroupeBottomBox>
            <DataRow>
              <Property>홈페이지</Property>
              <WithIconValue onClick={handleWebsiteClick}>
                바로가기
                <CaretSVG />
              </WithIconValue>
            </DataRow>
            <DataRow>
              <Property>담당자</Property>
              <Value>{detail?.managerName}</Value>
            </DataRow>
            <DataRow>
              <Property>담당자 연락처</Property>
              <Value>{detail?.managerCell && formatPhoneNumber(detail?.managerCell)}</Value>
            </DataRow>
          </TroupeBottomBox>
        </TroupeInfoWrapper>
      </InfoWrapper>
      <CastWrapper>
        <MenuBar>
          <Menu>현재 모집중인 공고</Menu>
        </MenuBar>
        {detail?.recruits && detail?.recruits?.length > 0 ? (
          <Casts>
            {detail?.recruits?.length > 3 ? (
              <Swiper
                direction="horizontal"
                spaceBetween={20}
                slidesPerView={3}
                slidesPerGroup={3}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{ clickable: true }}
                grabCursor={true}
              >
                {detail?.recruits?.map(recruit => {
                  const { id, troupeName, title, shortAddress, isScrap } = recruit;
                  return (
                    <SwiperSlide key={id}>
                      <CastCard
                        key={id}
                        castId={id}
                        castTitle={title}
                        artworkName={''}
                        practiceLocation={shortAddress}
                        troupeName={troupeName}
                        isScrap={isScrap}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <NoneSwiperWrapper>
                {detail?.recruits?.map(recruit => {
                  const { id, troupeName, title, shortAddress, isScrap } = recruit;
                  return (
                    <CastCard
                      key={id}
                      castId={id}
                      castTitle={title}
                      artworkName={''}
                      practiceLocation={shortAddress}
                      troupeName={troupeName}
                      isScrap={isScrap}
                    />
                  );
                })}
              </NoneSwiperWrapper>
            )}
          </Casts>
        ) : (
          <NoCasts>
            <NoCastsTitle>현재 모집중인 공고가 없습니다!</NoCastsTitle>
            <NoCastsSubTitle>모집 공고를 기다려주세요 :)</NoCastsSubTitle>
          </NoCasts>
        )}
      </CastWrapper>
    </TroupeDetailContainer>
  );
};

export default TroupeDetail;

const TroupeDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  overflow-x: hidden;
`;

const CoverBox = styled.div<{ $bgSrc: string }>`
  position: relative;
  width: 100vw;
  height: 392px;
  background-image: url(${props => props.$bgSrc});
  background-size: cover;
  background-position: center;

  @media (max-width: 1060px) {
    width: 100%;
  }
`;

const BackgroundLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 61.42%);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoverTextWrapper = styled.div`
  width: 1060px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
`;

const TroupeName = styled.div`
  font-size: 40px;
  font-weight: var(--font-bold);
  color: white;
  line-height: 130%;
  letter-spacing: -2.82%;
`;

const Description = styled.div`
  font-size: 15px;
  font-weight: var(--font-regular);
  color: white;
  line-height: 147%;
  letter-spacing: 0.96%;
`;

const InfoWrapper = styled.div`
  width: 1060px;
  height: 373px;
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 40px;
`;

const PositionInfoBox = styled.div`
  width: 611px;
  height: 373px;
  border: 1px solid #eaebec;
  border-radius: 12px;
  padding: 20px;
`;

const TroupeInfoWrapper = styled.div`
  width: 429px;
  height: 373px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TroupeTopBox = styled.div`
  border: 1px solid #eaebec;
  width: 429px;
  height: 162.81px;
  border-radius: 12px;
`;

const TroupeTopTopBox = styled.div`
  width: 429px;
  height: 98px;
  padding: 20px;
  border-bottom: 1px solid #eaebec;
  display: flex;
  justify-content: space-between;
`;

const TroupeTopBottomBox = styled.div`
  width: 429px;
  height: 64px;
  padding: 20px;
  display: flex;
  gap: 12px;
`;

const TroupeBottomBox = styled.div`
  width: 429px;
  height: 190px;
  border: 1px solid #eaebec;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
`;

const Property = styled.div`
  min-width: 98px;
  font-size: 16px;
  font-weight: var(--font-semibold);
  line-height: 150%;
  letter-spacing: 0.57%;
`;

const AddressWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  margin-top: 12px;
`;

const LocationTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TextRow = styled.div`
  gap: 8px;
  align-items: center;
  display: flex;
`;

const Slash = styled.div`
  color: #e1e2e4;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: var(--font-semibold);
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #171719;
`;

const PhoneNumber = styled.div`
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-weight: var(--font-medium);
  color: #171719;
`;

const Address = styled.div`
  font-weight: var(--font-medium);
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #858688;
`;

const Map = styled.img`
  width: 571px;
  height: 233px;
`;

const TroupeSummaryWrapper = styled.div`
  width: 112px;
  height: 58px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TroupeLogoNameWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const TroupeLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 6px;
`;

const TroupeNameInfo = styled.div`
  font-size: 16px;
  font-weight: var(--font-semibold);
  line-height: 150%;
  letter-spacing: 0.57%;
`;

const FollowerCount = styled.div`
  color: #b81716;
  font-size: 13px;
  font-weight: var(--font-medium);
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const Value = styled.div`
  font-size: 15px;
  font-weight: var(--font-medium);
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #171719;
  display: flex;
  gap: 8px;
`;

const WithIconValue = styled.div`
  font-size: 15px;
  font-weight: var(--font-medium);
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #171719;
  display: flex;
  gap: 8px;
  cursor: pointer;
  align-items: center;
`;
const DataRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const CastWrapper = styled.div`
  width: 1060px;
  height: 262px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const MenuBar = styled.div`
  width: 100%;
  height: 58px;
  border-bottom: 2px solid #f4f4f5;
`;

const Menu = styled.div`
  width: 149px;
  height: 58px;
  border-bottom: 4px solid #b81716;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #171719;
  font-size: 18px;
  font-weight: var(--font-semibold);
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;

const Casts = styled.div`
  display: flex;
  width: 100%;
`;

const NoneSwiperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const NoCasts = styled.div`
  background-color: #f7f7f8ff;
  width: 100%;
  height: 176px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const NoCastsTitle = styled.div`
  color: #000000ff;
  font-weight: 600;
  font-size: 18px;
  line-height: 145%;
  letter-spacing: -0.02%;
`;

const NoCastsSubTitle = styled.div`
  color: #989ba2ff;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  text-align: center;
`;
