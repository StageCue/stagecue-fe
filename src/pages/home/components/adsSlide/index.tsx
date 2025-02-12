import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

interface AdsSlideProps {
  banners: { imageUrl: string; link: string }[];
}

SwiperCore.use([Autoplay, Navigation, Pagination]);

const AdsSlide = ({ banners }: AdsSlideProps) => {
  return (
    <AdsSlideContainer>
      {banners?.length > 0 && (
        <Swiper
          direction="horizontal"
          spaceBetween={20}
          slidesPerView={"auto"}
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
          {banners?.map((banner, index) => (
            <SwiperSlide key={index}>
              <SlideDiv
                src={`https://s3.stagecue.co.kr/stagecue/${banner.imageUrl}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </AdsSlideContainer>
  );
};

export default AdsSlide;

const AdsSlideContainer = styled.div`
  width: 1060px; // 전체 화면 너비로 설정
  display: flex;
  justify-content: center;
`;

const SlideDiv = styled.img`
  height: 240px;
  width: 1060px;
`;
