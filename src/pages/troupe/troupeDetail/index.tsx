import { requestTroupeDetail } from "@/api/troupe";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

  console.log(detail);

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
    </TroupeDetailContainer>
  );
};

export default TroupeDetail;

const TroupeDetailContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const CoverBox = styled.div<{ $bgSrc: string }>`
  width: 100vw;
  height: 392px;
  background-image: url(${(props) => props.$bgSrc});
  background-size: cover;
  padding-left: 190px;
  padding-top: 124px;
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
