import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";

interface SlideData {
  id: number;
  title: string;
  description: string;
}

const FitRecruitSlide = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handleSlideClick = (index: number): void => {
    setActiveSlide(index);
  };

  const slides: SlideData[] = [
    { id: 1, title: "Slide 1", description: "추가 내용 1" },
    { id: 2, title: "Slide 2", description: "추가 내용 2" },
    { id: 3, title: "Slide 3", description: "추가 내용 3" },
    { id: 4, title: "Slide 4", description: "추가 내용 4" },
    { id: 5, title: "Slide 5", description: "추가 내용 5" },
  ];

  return (
    <FitRecruitSlideContainer>
      <Swiper width={1060} slidesPerView={"auto"}>
        {slides.map((slide, index) => (
          <CustomSwiperSlide
            key={slide.id}
            $isActive={activeSlide === index}
            onClick={() => handleSlideClick(index)}
          >
            <RecruitSlide
              $isActive={activeSlide === index}
              $isFirst={index === 0}
              $isLast={index === slides.length - 1}
            >
              <h3>{slide.title}</h3>
            </RecruitSlide>
          </CustomSwiperSlide>
        ))}
      </Swiper>
    </FitRecruitSlideContainer>
  );
};

export default FitRecruitSlide;

const FitRecruitSlideContainer = styled.div`
  width: 1060px;
  height: 545px;
`;

const CustomSwiperSlide = styled(SwiperSlide)<{ $isActive: boolean }>`
  width: ${({ $isActive }) => ($isActive ? "668px" : "98px")};
  height: 545px;
  transition: width 0.3s ease-in-out;
`;

const RecruitSlide = styled.div<{
  $isActive: boolean;
  $isFirst: boolean;
  $isLast: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ $isActive }) => ($isActive ? "#6200ea" : "#ddd")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  height: 545px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0px 4px 10px rgba(0, 0, 0, 0.3)" : "none"};
  overflow: hidden;

  border-radius: ${({ $isFirst, $isLast }) =>
    $isFirst ? "8px 0 0 8px" : $isLast ? "0 8px 8px 0" : "0"};
`;
