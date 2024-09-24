import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";

interface PostImageSlideProps {
  images: string[];
}

SwiperCore.use([Autoplay, Navigation, Pagination]);

const PostImageSlide = ({ images }: PostImageSlideProps) => {
  return (
    <PostImageSlideContainer>
      <Swiper
        direction="horizontal"
        slidesPerView={2.5}
        spaceBetween={17}
        centeredSlides={false}
        navigation={true}
        pagination={{ clickable: true }}
        grabCursor={true}
      >
        {images.map((image) => {
          return (
            <SwiperSlide>
              <SlideDiv src={`https://s3.stagecue.co.kr/stagecue/${image}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </PostImageSlideContainer>
  );
};

export default PostImageSlide;

const PostImageSlideContainer = styled.div`
  width: 689px;
  height: 405px;
`;

const SlideDiv = styled.img`
  height: 405px;
  width: 270px;
  border-radius: 10px;
`;
