import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const AdsSlide = () => {
  return (
    <Swiper
      direction="horizontal"
      spaceBetween={12}
      slidesPerView={3}
      centeredSlides={true}
      loop={true} //
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
  );
};

export default AdsSlide;

const SlideDiv = styled.div`
  height: 240px;
  width: 1060px;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 10px;
  margin: 0px 12px;
`;
