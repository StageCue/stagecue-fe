import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '@/components/buttons/button';
import Cast from '../cast';
import ChevronRightSVG from '@/assets/icons/chevron_right_red_s.svg?react';

export interface Recruit {
  recruitId: number;
  thumbnail: string;
  recruitTitle: string;
  artworkName: string;
  practiceLocation: string;
  isScrapping: boolean;
}

interface NewPostProps {
  recruits: Recruit[];
}

const NewPost = ({ recruits }: NewPostProps) => {
  const navigate = useNavigate();
  const shouldLoop = recruits && recruits?.length >= 5;

  const handleRecruitClick = () => {
    navigate('/casts');
  };

  return (
    <NewPostContainer>
      <TitleWrapper>
        <Title>
          <Strong>새로 등록된 공고</Strong>를 확인해보세요!
          <Higliting />
        </Title>
        <Button
          variation="text"
          btnClass="primary"
          width={110}
          height={32}
          padding="4px 7px"
          onClick={handleRecruitClick}
        >
          공고 더보기
          <ChevronRightSVG />
        </Button>
      </TitleWrapper>

      {recruits?.length >= 0 && (
        <Recruits>
          <Swiper
            direction="horizontal"
            spaceBetween={20}
            slidesPerView={5}
            slidesPerGroup={5}
            centeredSlides={false}
            loop={shouldLoop}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            grabCursor={true}
            pagination={{ clickable: true }}
          >
            {recruits?.map((recruit, index) => {
              const {
                recruitId,
                thumbnail,
                recruitTitle,
                artworkName,
                practiceLocation,
                isScrapping,
              } = recruit;

              return (
                <SwiperSlide key={index}>
                  {recruit && (
                    <Cast
                      imgWidth={196}
                      imgHeight={294}
                      recruitId={String(recruitId)}
                      thumbnail={thumbnail}
                      recruitTitle={recruitTitle}
                      troupeName={artworkName}
                      practiceLocation={practiceLocation}
                      isScrapping={isScrapping}
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Recruits>
      )}
    </NewPostContainer>
  );
};

export default NewPost;

const NewPostContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 32px;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  position: relative;
  font-size: 28px;
  font-weight: var(--font-regualr);
  line-height: 135.8%;
  letter-spacing: -2.36%;
  color: black;
  z-index: 20;
`;

const Strong = styled.div`
  font-weight: var(--font-bold);
`;

const Higliting = styled.div`
  position: absolute;
  left: 2px;
  bottom: 7px;
  width: 180px;
  height: 4px;
  background-color: #ff9303;
  z-index: -10;
`;

const Recruits = styled.div`
  min-height: 394px;
`;
