import { useEffect, useRef } from "react";
import styled from "styled-components";

interface RangeInputProps {
  minCost: string;
  maxCost: string;
  onChangeMinCost: (cost: string) => void;
  onChangeMaxCost: (cost: string) => void;
}

const RangeInput = ({
  minCost,
  maxCost,
  onChangeMinCost,
  onChangeMaxCost,
}: RangeInputProps) => {
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const minThumbRef = useRef<HTMLDivElement | null>(null);
  const maxThumbRef = useRef<HTMLDivElement | null>(null);
  const rangeRef = useRef<HTMLDivElement | null>(null);

  const formatWon = (cost: string) => {
    return new Intl.NumberFormat("ko-KR").format(Number(cost));
  };

  const handleMinCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = event.target.value.replace(/[^0-9]/g, "");
    const minValue = Math.min(Number(validatedValue), Number(maxCost) - 40000);

    onChangeMinCost(minValue.toString());
  };

  const handleMaxCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = event.target.value.replace(/[^0-9]/g, "");
    const maxValue = Math.max(Number(validatedValue), Number(minCost) + 40000);

    onChangeMaxCost(maxValue.toString());
  };

  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = (Number(minCost.replace(/,/g, "")) / 500000) * 100;
      const maxPercent = (Number(maxCost.replace(/,/g, "")) / 500000) * 100;
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.right = `${100 - maxPercent}%`;
    }
    if (minThumbRef.current) {
      const minPercent = (Number(minCost.replace(/,/g, "")) / 500000) * 100;
      minThumbRef.current.style.left = `${minPercent}%`;
    }
    if (maxThumbRef.current) {
      const maxPercent = (Number(maxCost.replace(/,/g, "")) / 500000) * 100;
      maxThumbRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [minCost, maxCost]);

  return (
    <RangeInputContainer>
      <CostFilter>
        <InputWrapper>
          <CostInput
            type="text"
            onChange={handleMinCostChange}
            value={formatWon(minCost)}
          />
          <Won>원</Won>
        </InputWrapper>
        <Dash />
        <InputWrapper>
          <CostInput
            type="text"
            onChange={handleMaxCostChange}
            value={formatWon(maxCost)}
          />
          <Won>원</Won>
        </InputWrapper>
      </CostFilter>
      <CostRangeWrapper>
        <MultiRangeSlider>
          <MinRangeInput
            type="range"
            ref={minInputRef}
            min={10000}
            value={parseInt(minCost.replace(/,/g, ""), 10)}
            max={500000}
            onChange={handleMinCostChange}
          />
          <MaxRangeInput
            type="range"
            ref={maxInputRef}
            min={10000}
            value={parseInt(maxCost.replace(/,/g, ""), 10)}
            max={500000}
            onChange={handleMaxCostChange}
          />
          <Slider>
            <Track />
            <Range ref={rangeRef} />
            <MinThumb ref={minThumbRef} />
            <MaxThumb ref={maxThumbRef} />
            <MinLabel>최저</MinLabel>
            <MaxLabel>최고</MaxLabel>
          </Slider>
        </MultiRangeSlider>
      </CostRangeWrapper>
    </RangeInputContainer>
  );
};

export default RangeInput;

const RangeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const CostFilter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  border: 1px solid #70737c;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CostInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  width: 91px;
`;

const Won = styled.div``;

const Dash = styled.div`
  width: 12px;
  height: 1px;
  border: 1px solid #171719;
`;

const CostRangeWrapper = styled.div`
  position: relative;
  width: 254px;
  height: 6px;
  margin-top: 16px;
`;

const MinRangeInput = styled.input`
  position: absolute;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
  z-index: 2;
  height: 6px;
  width: 260px;
  opacity: 0;

  &::-webkit-slider-thumb {
    pointer-events: all;
    width: 24px;
    height: 24px;
    border-radius: 0;
    border: 0 none;
    cursor: pointer;
    -webkit-appearance: none;
  }
`;

const MaxRangeInput = styled.input`
  position: absolute;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
  z-index: 2;
  height: 6px;
  width: 260px;
  opacity: 0;

  &::-webkit-slider-thumb {
    pointer-events: all;
    width: 24px;
    height: 24px;
    border-radius: 0;
    border: 0 none;
    cursor: pointer;
    -webkit-appearance: none;
  }
`;

const Slider = styled.div`
  position: relative;
  z-index: 1;
  height: 6px;
  width: 254px;
`;

const Track = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #f4f4f5;
`;

const Range = styled.div`
  position: absolute;
  z-index: 2;
  left: 25%;
  right: 25%;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #b81716;
`;

const MinThumb = styled.div`
  position: absolute;
  z-index: 3;
  width: 24px;
  height: 24px;
  background-color: #b81716;
  border-radius: 50%;

  left: 25%;
  transform: translate(-15px, -10px);
  pointer-events: all;
  cursor: pointer;
`;

const MaxThumb = styled.div`
  position: absolute;
  z-index: 3;
  width: 24px;
  height: 24px;
  background-color: #b81716;
  border-radius: 50%;

  right: 25%;
  transform: translate(15px, -10px);
  pointer-events: all;
  cursor: pointer;
`;

const MultiRangeSlider = styled.div``;

const MinLabel = styled.div`
  position: absolute;
  bottom: -30px;
  left: -12px;
`;

const MaxLabel = styled.div`
  position: absolute;
  bottom: -30px;
  right: -16px;
`;
