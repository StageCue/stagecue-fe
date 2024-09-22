import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Cast1SVG from "@assets/images/themeCast1.svg";
import Cast2SVG from "@assets/images/themeCast2.svg";

import "swiper/css";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const ThemeSlide = ({ swiperRef }) => {
  return (
    <ThemeSlideContainer>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        direction="horizontal"
        spaceBetween={20}
        loop={true}
        slidesPerView={2}
        navigation={true}
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <SlideDiv src={Cast1SVG} />
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv src={Cast2SVG} />
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv src={Cast1SVG} />
        </SwiperSlide>
        <SwiperSlide>
          <SlideDiv src={Cast2SVG} />
        </SwiperSlide>
      </Swiper>
    </ThemeSlideContainer>
  );
};

export default ThemeSlide;

const ThemeSlideContainer = styled.div`
  width: 1060px;
`;

const SlideDiv = styled.img`
  height: 260px;
  width: 520px;
  border-radius: 10px;
`;
