import styled from 'styled-components';
import LocationSVG from '@assets/icons/location_lg.svg?react';

interface LocationInfoProps {
  address: string;
  addressDetail: string;
  lat: number;
  lng: number;
}

const LocationInfo = ({ address, addressDetail, lat, lng }: LocationInfoProps) => {
  // const [map, setMap] = useState();

  // const getMap = async () => {
  //   const res = await requestStaticMap({ lat, lng });
  // };

  // useEffect(() => {
  //   getMap();
  // }, []);

  return (
    <LocationInfoContainer>
      <InfoWrapper>
        <Property>
          <Dot />
          공연 장소
        </Property>
        <LocationData>
          <LocationSVG />
          <TextWrapper>
            <TextRow>
              <Name>해봄 공연장</Name>
              <Slash>/</Slash>
              <PhoneNumber>02-1234-5677</PhoneNumber>
            </TextRow>
            <TextRow>
              <Address>
                {address} {addressDetail}
              </Address>
            </TextRow>
          </TextWrapper>
        </LocationData>
        <Map
          src={`https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=633&h=452&center=${lng},${lat}&level=16&scale=2&X-NCP-APIGW-API-KEY-ID=7sn0mkl4n4`}
        />
      </InfoWrapper>
    </LocationInfoContainer>
  );
};

export default LocationInfo;

const LocationInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 28px;
`;

const Dot = styled.div`
  background-color: #171719;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 12px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Property = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const LocationData = styled.div`
  margin-left: 28px;
  display: flex;
  gap: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: var(--font-semibold);
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #171719;
`;

const TextRow = styled.div`
  gap: 8px;
  align-items: center;
  display: flex;
`;

const Slash = styled.div`
  color: #e1e2e4;
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

const Map = styled.img``;
