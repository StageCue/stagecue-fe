import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

// interface AdsSlideContainer {
//   banners: any[];
// }

SwiperCore.use([Autoplay, Navigation, Pagination]);

const AdsSlide = () => {
  return (
    <AdsSlideContainer>
      <Swiper
        direction="horizontal"
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        grabCursor={true}
      >
        <SwiperSlide>
          <SlideDiv>Slide 1</SlideDiv>
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv>Slide 2</SlideDiv>
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv>Slide 3</SlideDiv>
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv>Slide 4</SlideDiv>
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv>Slide 5</SlideDiv>
        </SwiperSlide>
      </Swiper>
    </AdsSlideContainer>
  );
};

export default AdsSlide;

const AdsSlideContainer = styled.div`
  width: 1060px; // 전체 화면 너비로 설정
  display: flex;
  justify-content: center;
`;

const SlideDiv = styled.div`
  height: 240px;
  width: 1060px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 10px;
`;
