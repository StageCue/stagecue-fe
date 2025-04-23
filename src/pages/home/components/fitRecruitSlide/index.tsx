import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styled from 'styled-components';
import SmallImage from './components/SmallImage';
import EmptyWrapper from '@/components/emptyWrapper';
import { RecruitDetail } from '@/types/recruitDetail';
import { requestCastDetail } from '@/api/cast';

const FitRecruitSlide = ({ recommendRecruits }: { recommendRecruits: RecruitDetail[] }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [recruits, setRecruits] = useState<RecruitDetail[]>([]);

  const handleSlideClick = (index: number): void => {
    setActiveSlide(index);
  };

  const getCastDetail = async () => {
    if (recommendRecruits?.length > 0) {
      const recruits = await Promise.all(
        recommendRecruits.map(async recruit => {
          const { result } = await requestCastDetail(recruit?.id?.toString());
          return result;
        })
      );
      setRecruits(recruits);
    }
  };

  useEffect(() => {
    getCastDetail();
  }, [recommendRecruits]);

  return (
    <FitRecruitSlideContainer>
      {recruits?.length > 0 ? (
        <Swiper width={1060} slidesPerView={'auto'}>
          {recruits?.map((recruit, index) => (
            <CustomSwiperSlide
              key={recruit?.id}
              $isActive={activeSlide === index}
              onClick={() => handleSlideClick(index)}
            >
              <RecruitSlide
                $isActive={activeSlide === index}
                $isFirst={index === 0}
                $isLast={index === recommendRecruits?.length - 1}
                $imageURL={recruit?.recruitImages?.[0]}
              >
                <SlideCard $isActive={activeSlide === index}>
                  {activeSlide === index && (
                    <>
                      <CardInformation>
                        <CardInfo>
                          <CartTitle>{recruit?.title}</CartTitle>
                          <CardSubTitle>{recruit?.artworkName}</CardSubTitle>
                          <Divider />
                          <ShowDetailsTitle>지원 가능 배역</ShowDetailsTitle>
                          <CharacterParts>
                            {recruit?.recruitingParts?.map((character, index) => (
                              <Character key={index}>{character}</Character>
                            ))}
                          </CharacterParts>
                          <ShowDetailsTitle>공연기간</ShowDetailsTitle>
                          <ShowDetailsSubTitle>
                            {recruit?.theatreStartDate}~{recruit?.theatreEndDate}
                          </ShowDetailsSubTitle>
                          <ShowDetailsTitle>연습위치</ShowDetailsTitle>
                          <ShowDetailsSubTitle>
                            <LocationIcon />
                            {recruit?.practiceAddress}
                          </ShowDetailsSubTitle>
                        </CardInfo>
                        <CardImage>
                          <SmallImage imageURL={recruit?.recruitImages?.[0]} />
                        </CardImage>
                      </CardInformation>
                      <CardDescription>
                        <Chip>{recruit?.troupeName}</Chip>
                        <Description>{recruit?.recruitIntroduce}</Description>
                      </CardDescription>
                    </>
                  )}
                </SlideCard>
              </RecruitSlide>
            </CustomSwiperSlide>
          ))}
        </Swiper>
      ) : (
        <EmptyWrapper width={1060} height={545}>
          추천 공고가 없습니다.
        </EmptyWrapper>
      )}
    </FitRecruitSlideContainer>
  );
};

export default FitRecruitSlide;

const LocationIcon = () => {
  return (
    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.16797 6.94287C1.16797 10.9861 4.70503 14.3296 6.27063 15.6115C6.49469 15.795 6.60806 15.8878 6.77522 15.9349C6.90539 15.9715 7.09697 15.9715 7.22713 15.9349C7.39461 15.8877 7.50719 15.7958 7.7321 15.6116C9.29769 14.3297 12.8346 10.9864 12.8346 6.94324C12.8346 5.41315 12.22 3.94554 11.1261 2.8636C10.0321 1.78166 8.54847 1.17383 7.00137 1.17383C5.45427 1.17383 3.97047 1.78175 2.87651 2.86369C1.78255 3.94563 1.16797 5.41278 1.16797 6.94287Z"
        stroke="#EAEBEC"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33464 6.17383C5.33464 7.0943 6.08083 7.84049 7.0013 7.84049C7.92178 7.84049 8.66797 7.0943 8.66797 6.17383C8.66797 5.25335 7.92178 4.50716 7.0013 4.50716C6.08083 4.50716 5.33464 5.25335 5.33464 6.17383Z"
        stroke="#EAEBEC"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ShowDetailsTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: #ffffffff;
  margin-top: 20px;
`;

const ShowDetailsSubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #eaebecff;
  margin-top: 8px;
`;

const CharacterParts = styled.div`
  display: flex;
  gap: 7px;
  margin-top: 16px;
`;

const Character = styled.div`
  min-width: 49px;
  width: fit-content;
  height: 28px;
  border-radius: 40px;
  padding: 4px 12px 4px 12px;
  white-space: nowrap;
  background-color: #f4f4f5ff;

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #171719ff;
`;

const Chip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  width: 72px;
  height: 24px;
  padding: 4px 9px 4px 9px;
  border-radius: 4px;
  background-color: #000000ff;
  font-size: 10px;
`;

const Description = styled.div`
  margin-top: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  max-height: 94px;
  color: #989ba2ff;
  overflow-y: scroll;
`;

const Divider = styled.div`
  width: 357px;
  border: 1px solid #70737c28;
  margin-top: 20px;
`;

const CartTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
`;

const CardSubTitle = styled.div`
  margin-top: 6px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #eaebecff;
`;

const SlideCard = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 36px 36px 36px 36px;
  background-color: ${({ $isActive }) => ($isActive ? '#000000b2' : '#00000066')};
`;

const CardInformation = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

const CardInfo = styled.div`
  width: calc(100%-215px);
`;

const CardImage = styled.div`
  width: 215px;
  height: 322.5px;
  border-radius: 8px;
  border: 1.1px solid #70737c14;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardDescription = styled.div``;

// ========================================================================================================================

const FitRecruitSlideContainer = styled.div`
  width: 1060px;
  height: 545px;
`;

const CustomSwiperSlide = styled(SwiperSlide)<{ $isActive: boolean }>`
  width: ${({ $isActive }) => ($isActive ? '668px' : '98px')};
  height: 545px;
  transition: width 0.3s ease-in-out;
`;

const RecruitSlide = styled.div<{
  $isActive: boolean;
  $isFirst: boolean;
  $isLast: boolean;
  $imageURL: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ $isActive }) => ($isActive ? 'white' : 'black')};
  height: 545px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: ${({ $isActive }) => ($isActive ? '0px 4px 10px rgba(0, 0, 0, 0.3)' : 'none')};
  overflow: hidden;

  border-radius: ${({ $isFirst, $isLast }) =>
    $isFirst ? '8px 0 0 8px' : $isLast ? '0 8px 8px 0' : '0'};

  background: ${({ $isActive }) => ($isActive ? '#000000b2' : '#ddd')};
  background-image: url(${({ $imageURL }) => $imageURL});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
