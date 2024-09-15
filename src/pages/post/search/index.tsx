import { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ChevronDownSVG from "../../assets/icons/chevron_down.svg?react";
import ChevronDownSSVG from "../../assets/icons/chebron_down_s.svg?react";
import RadioSVG from "../../assets/icons/radio.svg?react";
import RadioCheckedSVG from "../../assets/icons/radio_checked.svg?react";
import Button from "../../../components/buttons/button";

type genreType = "연극" | "뮤지컬" | "댄스";
type zoneType =
  | "전체지역"
  | "서울"
  | "경기"
  | "인천"
  | "강원"
  | "경상"
  | "전라"
  | "제주"
  | "충청";
type dayPickerType = "전체요일" | "주말" | "평일" | "";
type dayType = "월" | "화" | "수" | "목" | "금" | "토" | "일";

const Search = () => {
  const minThumbRef = useRef();
  const maxThumbRef = useRef();
  const rangeRef = useRef();

  const [selectedGenre, setSelectedGenre] = useState<genreType>("연극");
  const [selectedZone, setSelectedZone] = useState(["전체지역"]);
  const [selectedDayPicker, setSelectedDayPicker] =
    useState<dayPickerType>("주말");
  const [selectedDay, setSelectedDay] = useState<dayType[]>(["토", "일"]);
  const [selectedMinCost, setSelectedMinCost] = useState<string>("10,000");
  const [selectedMaxCost, setSelectedMaxCost] = useState<string>("500,000");

  const [isAppliedZone, setIsAppliedZone] = useState<boolean>(false);
  const [isAppliedDay, setIsAppliedDay] = useState<boolean>(false);
  const [isAppliedCost, setIsAppliedCost] = useState<boolean>(false);

  const [isGenreMenuShowing, setIsGenreMenuShowing] = useState<boolean>(false);
  const [isZoneFilterShowing, setIsZoneFilterShowing] =
    useState<boolean>(false);
  const [isDayFilterShowing, setIsDayFilterShowing] = useState<boolean>(false);
  const [isCostFilterShowing, setIsCostFilterShowing] =
    useState<boolean>(false);

  const genreOptions: genreType[] = ["연극", "뮤지컬", "댄스"];
  const zoneOptions: zoneType[] = [
    "전체지역",
    "서울",
    "경기",
    "인천",
    "강원",
    "경상",
    "전라",
    "제주",
    "충청",
  ];
  const dayPickerOptions: dayPickerType[] = ["전체요일", "주말", "평일"];
  const daysOptions: dayType[] = ["월", "화", "수", "목", "금", "토", "일"];

  const handleGenreOptionChange = (genre: genreType) => {
    setSelectedGenre(genre);
    setIsGenreMenuShowing(false);
  };

  const handleGenreButtonClick = () => {
    setIsGenreMenuShowing((curr: boolean) => !curr);
  };

  const handleZoneButtonClick = () => {
    setIsZoneFilterShowing((curr: boolean) => !curr);
  };

  const handleDayButtonClick = () => {
    setIsDayFilterShowing((curr: boolean) => !curr);
  };

  const handleCostButtonClick = () => {
    setIsCostFilterShowing((curr: boolean) => !curr);
  };

  const handleZoneClick = (option: zoneType) => {
    setSelectedZone((prev) => {
      if (option !== "전체지역" && prev.includes("전체지역")) {
        const newSelectedZone = [option];
        return newSelectedZone;
      } else if (prev.includes(option) && option !== "전체지역") {
        const newSelectedZone = prev.filter((zone) => zone !== option);
        return newSelectedZone;
      } else if (option === "전체지역") {
        return ["전체지역"];
      } else {
        return [...prev, option];
      }
    });
  };

  const handleResetZoneClick = () => {
    setSelectedZone(["전체지역"]);
    setIsAppliedZone(false);
  };

  const handleResetDayClick = () => {
    setSelectedDay(["토", "일"]);
    setIsAppliedDay(false);
  };

  const handleApplyZoneClick = () => {
    setIsZoneFilterShowing(false);
    setIsAppliedZone(true);
  };

  const handleApplyDayClick = () => {
    setIsDayFilterShowing(false);
    setIsAppliedDay(true);
  };

  const handleClickDayPicker = (option: dayPickerType) => {
    setSelectedDayPicker(option);
  };

  const handleDayClick = (option: dayType) => {
    setSelectedDay((prev) => {
      if (prev.includes(option)) {
        const newSelectedDay = prev.filter((day) => day !== option);
        return newSelectedDay;
      } else {
        return [...prev, option];
      }
    });
  };

  const handleMinCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    const validatedValue = event.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("ko-KR").format(
      Number(validatedValue)
    );
    setSelectedMinCost(formattedValue);
    updateThumbsAndRange(formattedValue, selectedMaxCost);
  };

  const handleMaxCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    const validatedValue = event.target.value.replace(/[^0-9]/g, "");
    const formattedValue = new Intl.NumberFormat("ko-KR").format(
      Number(validatedValue)
    );
    setSelectedMaxCost(formattedValue);
    updateThumbsAndRange(selectedMaxCost, formattedValue);
  };

  const handleMinCostRangeChange = (event: ChangeEvent<HTMLInputElement>) => {};

  const handleMaxCostRangeChange = (event: ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    if (selectedDayPicker === "주말") {
      setSelectedDay(["토", "일"]);
    }
    if (selectedDayPicker === "평일") {
      setSelectedDay(["월", "화", "수", "목", "금"]);
    }
    if (selectedDayPicker === "전체요일") {
      setSelectedDay(["월", "화", "수", "목", "금", "토", "일"]);
    }
  }, [selectedDayPicker]);

  useEffect(() => {
    const normalDays: dayType[] = ["월", "화", "수", "목", "금"];
    const weekend: dayType[] = ["토", "일"];
    const allDays: dayType[] = ["월", "화", "수", "목", "금", "토", "일"];

    if (
      normalDays.every((day: dayType) => selectedDay.includes(day)) &&
      selectedDay.length === normalDays.length
    ) {
      setSelectedDayPicker("평일");
    } else if (
      weekend.every((day: dayType) => selectedDay.includes(day)) &&
      selectedDay.length === weekend.length
    ) {
      setSelectedDayPicker("주말");
    } else if (
      allDays.every((day: dayType) => selectedDay.includes(day)) &&
      selectedDay.length === allDays.length
    ) {
      setSelectedDayPicker("전체요일");
    } else {
      setSelectedDayPicker("");
    }
  }, [selectedDay]);

  useEffect(() => {
    if (selectedDay.length === 0) {
      setSelectedDayPicker("주말");
    }
  }, [selectedDay]);

  const updateThumbsAndRange = (minCost: string, maxCost: string) => {
    const minPercent = ((parseInt(minCost) - 10000) / (500000 - 10000)) * 100;
    const maxPercent = ((parseInt(maxCost) - 10000) / (500000 - 10000)) * 100;

    if (minThumbRef.current) minThumbRef.current.style.left = `${minPercent}%`;
    if (maxThumbRef.current) maxThumbRef.current.style.left = `${maxPercent}%`;
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.right = `${100 - maxPercent}%`;
    }
  };

  return (
    <HomeContainer>
      <GenreWrapper>
        <SelectedGenre>{selectedGenre}</SelectedGenre>
        <SelectGenreBtn onClick={handleGenreButtonClick}>
          <ChevronDownSVG />
        </SelectGenreBtn>
        <GenreMenu $isShowing={isGenreMenuShowing}>
          {genreOptions.map((option) => (
            <GenreOption
              key={option}
              onClick={() => handleGenreOptionChange(option)}
            >
              {option}
            </GenreOption>
          ))}
        </GenreMenu>
      </GenreWrapper>
      <FilterWrapper>
        <ZoneFilterBtn onClick={handleZoneButtonClick} $isDirty={isAppliedZone}>
          {selectedZone[0] === "전체지역"
            ? "연습지역"
            : `${selectedZone[0]} 외 ${selectedZone.length}`}
          <ChevronDownSSVG />
        </ZoneFilterBtn>
        <DayFilterBtn onClick={handleDayButtonClick} $isDirty={isAppliedDay}>
          {isAppliedDay ? selectedDayPicker : "요일"}
          <ChevronDownSSVG />
        </DayFilterBtn>
        <CostFilterBtn onClick={handleCostButtonClick} $isDirty={isAppliedCost}>
          월회비
          <ChevronDownSSVG />
        </CostFilterBtn>
        <FilterMenu $isShowing={isZoneFilterShowing}>
          <Chips>
            {zoneOptions.map((option) => (
              <Chip
                key={option}
                $isSelected={selectedZone.includes(option)}
                onClick={() => handleZoneClick(option)}
              >
                {option}
              </Chip>
            ))}
          </Chips>
          <FilterMenuFooter>
            <ResetBtn onClick={handleResetZoneClick}>초기화</ResetBtn>
            <Button
              variation="solid"
              btnClass="primary"
              width={51}
              height={32}
              fontSize={13}
              letterSpacing={138.5}
              lineHeight={1.94}
              onClick={handleApplyZoneClick}
            >
              적용
            </Button>
          </FilterMenuFooter>
        </FilterMenu>
        <FilterMenu $isShowing={isDayFilterShowing}>
          <PickerWrapper>
            <DayPickers>
              {dayPickerOptions.map((option) => (
                <Picker
                  key={option}
                  onClick={() => handleClickDayPicker(option)}
                >
                  <RadioWrapper>
                    {selectedDayPicker.includes(option) ? (
                      <RadioCheckedSVG />
                    ) : (
                      <RadioSVG />
                    )}
                  </RadioWrapper>
                  <PickerName>{option}</PickerName>
                </Picker>
              ))}
            </DayPickers>
            <Days>
              {daysOptions.map((option) => (
                <Day
                  key={option}
                  onClick={() => handleDayClick(option)}
                  $isSelected={selectedDay.includes(option)}
                >
                  {option}
                </Day>
              ))}
            </Days>
          </PickerWrapper>
          <FilterMenuFooter>
            <ResetBtn onClick={handleResetDayClick}>초기화</ResetBtn>
            <Button
              variation="solid"
              btnClass="primary"
              width={51}
              height={32}
              fontSize={13}
              letterSpacing={138.5}
              lineHeight={1.94}
              onClick={handleApplyDayClick}
            >
              적용
            </Button>
          </FilterMenuFooter>
        </FilterMenu>
        <FilterMenu $isShowing={isCostFilterShowing}>
          <Filters>
            <CostFilter>
              <InputWrapper>
                <CostInput
                  type="text"
                  onChange={handleMinCostChange}
                  value={selectedMinCost}
                />
                <Won>원</Won>
              </InputWrapper>
              <Dash />
              <InputWrapper>
                <CostInput
                  type="text"
                  onChange={handleMaxCostChange}
                  value={selectedMaxCost}
                />
                <Won>원</Won>
              </InputWrapper>
            </CostFilter>
            <CostRangeWrapper>
              <div>
                <MinRangeInput
                  type="range"
                  min={10000}
                  value={parseInt(selectedMinCost.replace(/,/g, ""), 10)}
                  max={parseInt(selectedMaxCost.replace(/,/g, ""), 10)}
                  onChange={handleMinCostChange}
                />
                <MaxRangeInput
                  type="range"
                  min={parseInt(selectedMinCost.replace(/,/g, ""), 10)}
                  value={parseInt(selectedMaxCost.replace(/,/g, ""), 10)}
                  max={500000}
                  onChange={handleMaxCostChange}
                />
                <Slider>
                  <Track />
                  <Range />
                  <MinThumb ref={minThumbRef.current} />
                  <MaxThumb ref={maxThumbRef.current} />
                </Slider>
              </div>
            </CostRangeWrapper>
          </Filters>
        </FilterMenu>
      </FilterWrapper>
    </HomeContainer>
  );
};

export default Search;

const HomeContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 260px 100px 260px;
`;

const GenreWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 40px;
`;

const SelectGenreBtn = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #e1e2e4;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SelectedGenre = styled.div`
  color: #000000;
  font-weight: var(--font-bold);
  font-size: 32px;
  line-height: 133.4%;
  letter-spacing: -2.7%;
`;

const GenreMenu = styled.div<{ $isShowing: boolean }>`
  position: absolute;
  width: 226px;
  height: fit-content;
  bottom: -135px;
  left: 0;
  border-radius: 8px;
  background-color: white;
  visibility: ${({ $isShowing }) => ($isShowing ? "visible" : "hidden")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  gap: 4px;
  padding: 4px;
  z-index: 1000;
`;

const GenreOption = styled.div`
  width: 218px;
  height: 36px;
  border-radius: 4px;
  padding: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  font-weight: var(font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;

  &:hover {
    background-color: #007aff;
    color: #b81716;
  }
`;

const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
`;

const ZoneFilterBtn = styled.div<{ $isDirty: boolean }>`
  min-width: 80px;
  height: 40px;
  padding: 9px 16px;
  border-radius: 1000px;
  border: 1px solid #70737c;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background-color: ${({ $isDirty }) => ($isDirty ? "black" : "white")};
  color: ${({ $isDirty }) => ($isDirty ? "white" : "#171719")};

  rect {
    fill: ${({ $isDirty }) => ($isDirty ? "white" : "#171719")};
  }
`;

const DayFilterBtn = styled.div<{ $isDirty: boolean }>`
  min-width: 80px;
  height: 40px;
  padding: 9px 16px;
  border-radius: 1000px;
  border: 1px solid #70737c;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background-color: ${({ $isDirty }) => ($isDirty ? "black" : "white")};
  color: ${({ $isDirty }) => ($isDirty ? "white" : "#171719")};

  rect {
    fill: ${({ $isDirty }) => ($isDirty ? "white" : "#171719")};
  }
`;

const CostFilterBtn = styled.div<{ $isDirty: boolean }>`
  min-width: 80px;
  height: 40px;
  padding: 9px 16px;
  border-radius: 1000px;
  border: 1px solid #70737c;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background-color: ${({ $isDirty }) => ($isDirty ? "black" : "white")};
  color: ${({ $isDirty }) => ($isDirty ? "white" : "#171719")};

  rect {
    fill: ${({ $isDirty }) => ($isDirty ? "white" : "#171719")};
  }
`;

const FilterMenu = styled.div<{ $isShowing: boolean }>`
  position: absolute;
  width: 682px;
  height: 168px;
  left: 0;
  bottom: -180px;
  padding: 20px;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  background-color: white;
  visibility: ${({ $isShowing }) => ($isShowing ? "visible" : "hidden")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Chips = styled.div`
  display: flex;
  gap: 6px;
`;

const Chip = styled.div<{ $isSelected: boolean }>`
  min-width: 49px;
  height: 32px;
  border-radius: 1000px;
  border: ${({ $isSelected }) =>
    $isSelected ? "1px solid #B81716;" : "1px solid #70737c"};
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#B81716" : "1px solid "};

  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: var(--font-medium);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  cursor: pointer;
`;

const FilterMenuFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ResetBtn = styled.div`
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  color: #aeb0b6;
  cursor: pointer;
`;

const PickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DayPickers = styled.div`
  display: flex;
  gap: 12px;
`;

const RadioWrapper = styled.div`
  cursor: pointer;
`;

const Picker = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
  min-width: 57px;
  width: fit-content;
`;

const PickerName = styled.div`
  color: #171719;
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
`;

const Days = styled.div`
  display: flex;
  gap: 9.83px;
`;

const Day = styled.div<{ $isSelected: boolean }>`
  width: 40px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #70737c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  font-size: 13px;
  font-weight: var(--font-medium);
  letter-spacing: 1.94%;
  line-height: 138.5%;
  border: ${({ $isSelected }) =>
    $isSelected ? "1px solid #B81716" : "1px solid #70737c;"};
  color: ${({ $isSelected }) => ($isSelected ? "#B81716" : "#171719;")};
  cursor: pointer;
`;

const Filters = styled.div`
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
  width: 50%;
  max-width: 500px;
`;

const MinRangeInput = styled.input`
  position: absolute;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
  z-index: 2;
  height: 10px;
  width: 100%;
  opacity: 0;

  &:-webkit-slider-thumb {
    pointer-events: all;
    width: 30px;
    height: 30px;
    border-radius: 0;
    border: 0 none;
    background-color: red;
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
  height: 10px;
  width: 100%;
  opacity: 0;

  &:-webkit-slider-thumb {
    pointer-events: all;
    width: 30px;
    height: 30px;
    border-radius: 0;
    border: 0 none;
    background-color: red;
    cursor: pointer;
    -webkit-appearance: none;
  }
`;

const Slider = styled.div`
  position: relative;
  z-index: 1;
  height: 10px;
  margin: 0 15px;
`;

const Track = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #c6aee7;
`;

const Range = styled.div`
  position: absolute;
  z-index: 2;
  left: 25%;
  right: 25%;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background-color: #6200ee;
`;

const MinThumb = styled.div`
  position: absolute;
  z-index: 3;
  width: 30px;
  height: 30px;
  background-color: #6200ee;
  border-radius: 50%;
  left: 25%;
  transform: translate(-15px, -10px);
`;

const MaxThumb = styled.div`
  position: absolute;
  z-index: 3;
  width: 30px;
  height: 30px;
  background-color: #6200ee;
  border-radius: 50%;
  right: 25%;
  transform: translate(15px, -10px);
`;
