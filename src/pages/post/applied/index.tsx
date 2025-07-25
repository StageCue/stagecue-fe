import { requestCasts } from '@/api/cast';
import Button from '@/components/buttons/button';
import Cast from '@/pages/home/components/cast';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import AppliedGIF from '@assets/images/appliedLottie.json';
import { useNavigate } from 'react-router-dom';

const Applied = () => {
  const navigate = useNavigate();
  const [popularRecruits, setPopularRecruits] = useState([]);

  const getNewestCasts = async () => {
    const { result } = await requestCasts({
      key: 0,
      size: 4,
      category: 'THEATER',
      sort: 'RECENT',
    });

    setPopularRecruits(result?.body);
  };

  useEffect(() => {
    getNewestCasts();
  }, []);

  const handleMoveMainPopularPage = () => {
    navigate('/casts', {
      state: { orderBy: 'popular' },
    });
  };

  const handleMoveMainNewestPage = () => {
    navigate('/casts', {
      state: { orderBy: 'newest' },
    });
  };

  return (
    <AppliedContainer>
      <SuccessBox>
        <Lottie
          width={150}
          height={150}
          options={{
            loop: true,
            autoplay: true,
            animationData: AppliedGIF,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
          }}
        />
        <CompleteTextWrapper>
          <Text>공고지원을 완료했어요!</Text>
          <SubText>다른 공고도 둘러볼까요?</SubText>
        </CompleteTextWrapper>
        <Button
          type="button"
          variation="solid"
          btnClass="primary"
          width={308}
          height={48}
          onClick={handleMoveMainNewestPage}
        >
          공고 둘러보기
        </Button>
      </SuccessBox>
      <CastsWrapper>
        <TextWrapper>
          <TitleText>이번주 인기 공고</TitleText>
          <ShowAll onClick={handleMoveMainPopularPage}>전체보기</ShowAll>
        </TextWrapper>
        <Casts>
          {popularRecruits?.map(({ recruitId, imageUrl, shortAddress, title, troupeName }) => (
            <Cast
              key={recruitId}
              imgWidth={215}
              imgHeight={322.5}
              recruitId={recruitId}
              thumbnail={imageUrl}
              recruitTitle={title}
              troupeName={troupeName}
              practiceLocation={shortAddress}
            />
          ))}
        </Casts>
      </CastsWrapper>
    </AppliedContainer>
  );
};

export default Applied;

const AppliedContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  margin-bottom: 100px;
  gap: 80px;
`;

const SuccessBox = styled.div`
  width: 920px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border: 1px solid #dfdfe0;
  border-radius: 8px;
`;

const CompleteTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  line-height: 144.5%;
  letter-spacing: -0.02;
  color: #000000;
`;

const SubText = styled.div`
  font-weight: var(--font-regular);
  font-size: 15px;
  line-height: 146.7%;
  letter-spacing: 0.96%;
  color: #999ba2;
`;

const CastsWrapper = styled.div``;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleText = styled.div`
  font-weight: var(--font-semibold);
  font-size: 22px;
  letter-spacing: -1.94px;
  line-height: 136.4%;
  color: #000000;
`;

const ShowAll = styled.div`
  cursor: pointer;
  font-weight: var(--font-medium);
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 162.5%;
  color: #171719;
`;

const Casts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  gap: 20px;

  height: fit-content;
  margin-top: 20px;
`;
