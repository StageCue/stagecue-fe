import { requestTroupeDetail } from "@/api/troupe";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LocationSVG from "@assets/icons/location_lg.svg?react";
import PlusSVG from "@assets/icons/plus_white.svg?react";
import Button from "@/components/buttons/button";

interface TroupeDetail {
  troupeName: string;
  description: string;
  coverImage: string;
  location: {
    address: string;
    addressDetail: string;
    lat: number;
    lng: number;
  };
  logoImage: string;
  followerCount: number;
  isFollowing: boolean;
  publishedAt: string;
  publishedCount: string;
  website: string;
  picName: string;
  picCell: string;
  casts: [
    {
      castId: string;
      castTitle: string;
      artworkName: string;
      practiceLocation: string;
      troupeName: string;
      isScrapping: true;
    }
  ];
}

const TroupeDetail = () => {
  const { troupeName } = useParams();
  const [detail, setDetail] = useState<TroupeDetail>();

  const getTroupeDetail = async () => {
    const res = await requestTroupeDetail(troupeName!);

    setDetail(res);
  };

  useEffect(() => {
    getTroupeDetail();
  }, []);

  const parsePublishDate = (date?: string) => {
    return date.split("-")[0];
  };

  return (
    <TroupeDetailContainer>
      <CoverBox
        $bgSrc={`https://s3.stagecue.co.kr/stagecue${detail?.coverImage}`}
      >
        <CoverTextWrapper>
          <TroupeName>{detail?.troupeName}</TroupeName>
          <Description>{detail?.description}</Description>
        </CoverTextWrapper>
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
                  {detail?.location.address} {detail?.location.addressDetail}
                </Address>
              </TextRow>
            </LocationTextWrapper>
          </AddressWrapper>
          <Map
            src={`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=571&h=233&center=${detail?.location.lng},${detail?.location.lat}&level=16&scale=2&X-NCP-APIGW-API-KEY-ID=7sn0mkl4n4`}
          />
        </PositionInfoBox>
        <TroupeInfoWrapper>
          <TroupeTopBox>
            <TroupeTopTopBox>
              <TroupeSummaryWrapper>
                <TroupeLogoNameWrapper>
                  <TroupeLogo
                    src={`https://s3.stagecue.co.kr/stagecue${detail?.logoImage}`}
                  />
                  <TroupeNameInfo>{detail?.troupeName}</TroupeNameInfo>
                </TroupeLogoNameWrapper>
                <FollowerCount>
                  {detail?.followerCount}명이 팔로우중
                </FollowerCount>
              </TroupeSummaryWrapper>
              <Button
                variation="solid"
                btnClass="primary"
                width={114}
                height={40}
                lineHeight={146.7}
                letterSpacing={0.96}
                fontWeight={"var(--font-semibold)"}
                fontSize={15}
                padding="9px 23px"
              >
                <PlusSVG />
                팔로우
              </Button>
            </TroupeTopTopBox>
            <TroupeTopBottomBox>
              <Property>설립연도</Property>
              <Value>
                {parsePublishDate(detail?.publishedAt)}년<Slash>/</Slash>
                {detail?.publishedCount}년차
              </Value>
            </TroupeTopBottomBox>
          </TroupeTopBox>
          <TroupeBottomBox></TroupeBottomBox>
        </TroupeInfoWrapper>
      </InfoWrapper>
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
`;

const CoverBox = styled.div<{ $bgSrc: string }>`
  width: 100vw;
  height: 392px;
  background-image: url(${(props) => props.$bgSrc});
  background-size: cover;
  padding-left: 190px;
  padding-top: 124px;
  margin-bottom: 40px;
`;

const CoverTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  line-height: 146.7%;
  letter-spacing: 0.96%;
`;

const InfoWrapper = styled.div`
  width: 1060px;
  height: 373px;
  display: flex;
  gap: 20px;
  justify-content: center;
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
  color: #171719;
  margin-bottom: 16px;
`;

const AddressWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
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

const DataRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
