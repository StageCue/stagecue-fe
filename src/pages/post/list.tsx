import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import ChevronDownSVG from "@assets/icons/chevron_down.svg?react";
import ChevronDownSSVG from "@assets/icons/chebron_down_s.svg?react";
import RadioSVG from "@assets/icons/radio.svg?react";
import RadioCheckedSVG from "@assets/icons/radio_checked.svg?react";
import ChecklineSVG from "@assets/icons/checkline.svg?react";
import ElipsisSVG from "@assets/icons/elipsis.svg?react";
import Button from "@components/buttons/button";
import { requestCasts } from "@/api/cast";
import Cast from "@/pages/home/components/cast";
import RangeInput from "./components/rangeInput";

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

const List = () => {
  const popupMenuRef = useRef<HTMLDivElement | null>(null);
  const genreButtonRef = useRef<HTMLDivElement | null>(null);
  const zoneButtonRef = useRef<HTMLDivElement | null>(null);
  const dayButtonRef = useRef<HTMLDivElement | null>(null);
  const costButtonRef = useRef<HTMLDivElement | null>(null);

  const [casts, setCasts] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState<genreType>("연극");
  const [selectedZone, setSelectedZone] = useState(["전체지역"]);
  const [selectedDayPicker, setSelectedDayPicker] = useState<string>("주말");

  const [practiceDays, setPracticeDays] = useState([
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
  ]);

  const [isAppliedZone, setIsAppliedZone] = useState<boolean>(false);
  const [isAppliedDay, setIsAppliedDay] = useState<boolean>(false);
  const [isAppliedCost] = useState<boolean>(false);

  const [appliedZone, setAppliedZone] = useState<string[]>(["전체지역"]);
  const [appliedDay, setAppliedDay] = useState<string[]>([
    "0",
    "0",
    "0",
    "0",
    "0",
    "1",
    "1",
  ]);
  const [appliedCost, setAppliedCost] = useState<string>("");

  const [minCost, setMinCost] = useState<string>("10000");
  const [maxCost, setMaxCost] = useState<string>("500000");

  const [isGenreMenuShowing, setIsGenreMenuShowing] = useState<boolean>(false);
  const [isZoneFilterShowing, setIsZoneFilterShowing] =
    useState<boolean>(false);
  const [isDayFilterShowing, setIsDayFilterShowing] = useState<boolean>(false);
  const [isCostFilterShowing, setIsCostFilterShowing] =
    useState<boolean>(false);

  const [currentOrderBy, setCurrentOrderBy] = useState<"newest" | "popular">(
    "newest"
  );

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
  const dayPickerOptions = ["전체요일", "주말", "평일"];
  const daysOptions = useMemo(
    () => ["월", "화", "수", "목", "금", "토", "일"],
    []
  );

  const handleGenreOptionChange = (genre: genreType) => {
    setSelectedGenre(genre);
    setIsGenreMenuShowing(false);
  };

  const handleGenreButtonClick = () => {
    setIsGenreMenuShowing((curr: boolean) => {
      if (!curr) {
        setIsZoneFilterShowing(false);
        setIsCostFilterShowing(false);
        setIsDayFilterShowing(false);
      }
      return !curr;
    });
  };

  const handleZoneButtonClick = () => {
    setIsZoneFilterShowing((curr: boolean) => {
      if (!curr) {
        setIsGenreMenuShowing(false);
        setIsCostFilterShowing(false);
        setIsDayFilterShowing(false);
      }
      return !curr;
    });
  };

  const handleDayButtonClick = () => {
    setIsDayFilterShowing((curr: boolean) => {
      if (!curr) {
        setIsZoneFilterShowing(false);
        setIsCostFilterShowing(false);
        setIsGenreMenuShowing(false);
      }
      return !curr;
    });
  };

  const handleCostButtonClick = () => {
    setIsCostFilterShowing((curr: boolean) => {
      if (!curr) {
        setIsGenreMenuShowing(false);
        setIsZoneFilterShowing(false);
        setIsDayFilterShowing(false);
      }
      return !curr;
    });
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
    setIsAppliedDay(false);
    setPracticeDays(["0", "0", "0", "0", "0", "1", "1"]);
  };

  const handleApplyZoneClick = () => {
    setIsZoneFilterShowing(false);
    setIsAppliedZone(true);
    setAppliedZone([...selectedZone]);
  };

  const handleApplyDayClick = () => {
    setIsDayFilterShowing(false);
    setIsAppliedDay(true);
    setAppliedDay([...practiceDays]);
  };

  const handleClickDayPicker = (option: string) => {
    setSelectedDayPicker(option);
  };

  const handleDayClick = (index: number) => {
    setPracticeDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index] = updatedDays[index] === "0" ? "1" : "0";
      return updatedDays;
    });
  };

  useEffect(() => {
    if (selectedDayPicker === "주말") {
      setPracticeDays(["0", "0", "0", "0", "0", "1", "1"]);
    }
    if (selectedDayPicker === "평일") {
      setPracticeDays(["1", "1", "1", "1", "1", "0", "0"]);
    }
    if (selectedDayPicker === "전체요일") {
      setPracticeDays(["1", "1", "1", "1", "1", "1", "1"]);
    }
  }, [selectedDayPicker]);

  useEffect(() => {
    if (
      practiceDays.every(
        (day, index) => day === ["1", "1", "1", "1", "1", "0", "0"][index]
      )
    ) {
      setSelectedDayPicker("평일");
    } else if (
      practiceDays.every(
        (day, index) => day === ["0", "0", "0", "0", "0", "1", "1"][index]
      )
    ) {
      setSelectedDayPicker("주말");
    } else if (
      practiceDays.every(
        (day, index) => day === ["1", "1", "1", "1", "1", "1", "1"][index]
      )
    ) {
      setSelectedDayPicker("전체요일");
    } else {
      const activeDays = practiceDays
        .map((value, index) => (value === "1" ? daysOptions[index] : null)) // "1"인 경우 해당 요일 반환
        .filter((day) => day !== null) // null 값 제거
        .join("·"); // 중간점을 넣어 문자열로 결합

      setSelectedDayPicker(activeDays);
    }
  }, [practiceDays, daysOptions]);

  const onChangeMinCost = (cost: string) => {
    setMinCost(cost);
  };

  const onChanageMaxCost = (cost: string) => {
    setMaxCost(cost);
  };

  const handleResetCostClick = () => {
    setMinCost("10000");
    setMaxCost("500000");
  };

  const handleCostApplyClick = () => {
    setAppliedCost(`${minCost}-${maxCost}`);
    setIsCostFilterShowing(false);
  };

  useEffect(() => {
    if (
      practiceDays.every(
        (day, index) => day === ["0", "0", "0", "0", "0", "0", "0"][index]
      )
    ) {
      setPracticeDays(["0", "0", "0", "0", "0", "1", "1"]);
    }
  }, [practiceDays]);

  const getCasts = async () => {
    const res = await requestCasts({
      offset: "0",
      limit: "16",
      category: parsingCategory(selectedGenre),
      locations: appliedZone[0] === "전체지역" ? "" : appliedZone.join(";"),
      orderBy: currentOrderBy,
      feeRange: appliedCost,
    });

    setCasts(res.casts);
  };

  const parsingCategory = (category: string) => {
    switch (category) {
      case "연극":
        return "THEATRE";
      case "뮤지컬":
        return "MUSICAL";
      case "댄스":
        return "DANCE";
    }
  };

  const handleResetFilterClick = () => {
    setPracticeDays(["0", "0", "0", "0", "0", "1", "1"]);
    setAppliedDay(["0", "0", "0", "0", "0", "1", "1"]);
    setAppliedZone(["전체지역"]);
    setSelectedZone(["전체지역"]);
    setIsAppliedDay(false);
    setIsAppliedZone(false);
  };

  const handleNewestClick = () => {
    setCurrentOrderBy("newest");
  };

  const handlePopularClick = () => {
    setCurrentOrderBy("popular");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popupMenuRef.current &&
      !popupMenuRef.current.contains(event.target as Node) &&
      genreButtonRef.current &&
      !genreButtonRef.current.contains(event.target as Node) &&
      dayButtonRef.current &&
      !dayButtonRef.current.contains(event.target as Node) &&
      zoneButtonRef.current &&
      !zoneButtonRef.current.contains(event.target as Node) &&
      costButtonRef.current &&
      !costButtonRef.current.contains(event.target as Node)
    ) {
      setIsGenreMenuShowing(false);
      setIsZoneFilterShowing(false);
      setIsDayFilterShowing(false);
      setIsCostFilterShowing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getCasts();
  }, [appliedDay, selectedZone, selectedGenre, currentOrderBy, appliedCost]);

  return (
    <ListContainer>
      <GenreWrapper>
        <SelectedGenre>{selectedGenre}</SelectedGenre>
        <SelectGenreBtn ref={genreButtonRef} onClick={handleGenreButtonClick}>
          <ChevronDownSVG />
        </SelectGenreBtn>
        {isGenreMenuShowing && (
          <GenreMenu ref={popupMenuRef}>
            {genreOptions.map((option) => (
              <GenreOption
                key={option}
                onClick={() => handleGenreOptionChange(option)}
              >
                {option}
              </GenreOption>
            ))}
          </GenreMenu>
        )}
      </GenreWrapper>
      <FilterOrderByWrapper>
        <FilterWrapper>
          <ZoneFilterBtn
            onClick={handleZoneButtonClick}
            $isDirty={isAppliedZone}
            $isOpen={isZoneFilterShowing}
            ref={zoneButtonRef}
          >
            {appliedZone[0] === "전체지역"
              ? "연습지역"
              : `${appliedZone[0]} 외 ${appliedZone.length}`}
            <ChevronDownSSVG />
          </ZoneFilterBtn>
          <DayFilterBtn
            onClick={handleDayButtonClick}
            $isDirty={isAppliedDay}
            $isOpen={isDayFilterShowing}
            ref={dayButtonRef}
          >
            {isAppliedDay ? selectedDayPicker : "요일"}
            <ChevronDownSSVG />
          </DayFilterBtn>
          <CostFilterBtn
            onClick={handleCostButtonClick}
            $isDirty={isAppliedCost}
            $isOpen={isCostFilterShowing}
            ref={costButtonRef}
          >
            월회비
            <ChevronDownSSVG />
          </CostFilterBtn>
          {isZoneFilterShowing && (
            <FilterMenu ref={popupMenuRef}>
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
                  padding="7px 14px"
                >
                  적용
                </Button>
              </FilterMenuFooter>
            </FilterMenu>
          )}
          {isDayFilterShowing && (
            <FilterMenu ref={popupMenuRef}>
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
                  {daysOptions.map((option, index) => (
                    <Day
                      key={option}
                      onClick={() => handleDayClick(index)}
                      $isSelected={practiceDays[index] === "1"}
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
                  padding="7px 14px"
                  onClick={handleApplyDayClick}
                >
                  적용
                </Button>
              </FilterMenuFooter>
            </FilterMenu>
          )}
          {isCostFilterShowing && (
            <FilterMenu ref={popupMenuRef}>
              <RangeInput
                minCost={minCost}
                maxCost={maxCost}
                onChangeMaxCost={onChanageMaxCost}
                onChangeMinCost={onChangeMinCost}
              />
              <FilterMenuFooter>
                <ResetBtn onClick={handleResetCostClick}>초기화</ResetBtn>
                <Button
                  variation="solid"
                  btnClass="primary"
                  width={51}
                  height={32}
                  fontSize={13}
                  letterSpacing={138.5}
                  lineHeight={1.94}
                  padding="7px 14px"
                  onClick={handleCostApplyClick}
                >
                  적용
                </Button>
              </FilterMenuFooter>
            </FilterMenu>
          )}
          <ResetFilterWrapper>
            <Button
              variation="text"
              btnClass="primary"
              width={42}
              height={32}
              padding="0px"
              fontSize={16}
              fontWeight="var(--medium)"
              lineHeight={150}
              letterSpacing={0.57}
              onClick={handleResetFilterClick}
            >
              초기화
            </Button>
          </ResetFilterWrapper>
        </FilterWrapper>
        <OrderByWrapper>
          <IconWrapper
            onClick={handleNewestClick}
            $isSelected={currentOrderBy === "newest"}
          >
            <ChecklineSVG />
            최신순
          </IconWrapper>
          <IconWrapper
            onClick={handlePopularClick}
            $isSelected={currentOrderBy === "popular"}
          >
            <ElipsisSVG />
            인기순
          </IconWrapper>
        </OrderByWrapper>
      </FilterOrderByWrapper>
      <CastGrid>
        {casts?.map(
          ({
            castId,
            castTitle,
            artworkName,
            practiceLocation,
            isScrapping,
            thumbnail,
          }) => (
            <Cast
              castId={castId}
              castTitle={castTitle}
              artworkName={artworkName}
              practiceLocation={practiceLocation}
              isScrapping={isScrapping}
              thumbnail={thumbnail}
            />
          )
        )}
      </CastGrid>
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div`
  width: 920px;
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

const GenreMenu = styled.div`
  position: absolute;
  width: 226px;
  height: fit-content;
  bottom: -135px;
  left: 0;
  border-radius: 8px;
  background-color: white;
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
    background-color: #fbf1f1;
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

const ZoneFilterBtn = styled.div<{ $isDirty: boolean; $isOpen: boolean }>`
  min-width: 80px;
  height: 40px;
  padding: 9px 16px;
  border-radius: 1000px;
  border: 1px solid #70737c;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background-color: ${({ $isDirty, $isOpen }) =>
    $isOpen ? "#f4f4f5" : $isDirty ? "#171719" : "white"};
  color: ${({ $isDirty, $isOpen }) =>
    $isOpen ? "#171719" : $isDirty ? "white" : "#171719"};

  svg {
    rect {
      fill: ${({ $isDirty, $isOpen }) =>
        $isOpen ? "#171719" : $isDirty ? "white" : "#171719"};
    }
  }
`;

const DayFilterBtn = styled.div<{ $isDirty: boolean; $isOpen: boolean }>`
  min-width: 80px;
  height: 40px;
  padding: 9px 16px;
  border-radius: 1000px;
  border: 1px solid #70737c;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background-color: ${({ $isDirty, $isOpen }) =>
    $isOpen ? "#f4f4f5" : $isDirty ? "#171719" : "white"};
  color: ${({ $isDirty, $isOpen }) =>
    $isOpen ? "#171719" : $isDirty ? "white" : "#171719"};

  svg {
    rect {
      fill: ${({ $isDirty, $isOpen }) =>
        $isOpen ? "#171719" : $isDirty ? "white" : "#171719"};
    }
  }
`;

const CostFilterBtn = styled.div<{ $isDirty: boolean; $isOpen: boolean }>`
  min-width: 80px;
  height: 40px;
  padding: 9px 16px;
  border-radius: 1000px;
  border: 1px solid #70737c;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background-color: ${({ $isDirty, $isOpen }) =>
    $isOpen ? "#f4f4f5" : $isDirty ? "#171719" : "white"};
  color: ${({ $isDirty, $isOpen }) =>
    $isOpen ? "#171719" : $isDirty ? "white" : "#171719"};

  svg {
    rect {
      fill: ${({ $isDirty, $isOpen }) =>
        $isOpen ? "#171719" : $isDirty ? "white" : "#171719"};
    }
  }
`;

const FilterMenu = styled.div`
  position: absolute;
  width: 682px;
  height: 168px;
  left: 0;
  bottom: -180px;
  padding: 20px;
  border: 1px solid #f3f3f3;
  border-radius: 8px;
  background-color: white;
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
  background-color: ${({ $isSelected }) => ($isSelected ? "#f9ecec" : "white")};
  color: ${({ $isSelected }) => ($isSelected ? "#B81716;" : "#171719")};

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

// const Filters = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 16px;
// `;

// const CostFilter = styled.div`
//   display: flex;
//   gap: 12px;
//   align-items: center;
//   justify-content: center;
// `;

// const InputWrapper = styled.div`
//   border: 1px solid #70737c;
//   border-radius: 10px;
//   padding: 12px 16px;
//   display: flex;
//   align-items: center;
//   gap: 12px;
// `;

// const CostInput = styled.input`
//   border: none;
//   outline: none;
//   font-size: 16px;
//   line-height: 150%;
//   letter-spacing: 0.57%;
//   width: 91px;
// `;

// const Won = styled.div``;

// const Dash = styled.div`
//   width: 12px;
//   height: 1px;
//   border: 1px solid #171719;
// `;

// const CostRangeWrapper = styled.div`
//   position: relative;
//   width: 50%;
//   max-width: 500px;
// `;

// const MinRangeInput = styled.input`
//   position: absolute;
//   -webkit-appearance: none;
//   appearance: none;
//   pointer-events: none;
//   z-index: 2;
//   height: 10px;
//   width: 100%;
//   opacity: 0;

//   &:-webkit-slider-thumb {
//     pointer-events: all;
//     width: 30px;
//     height: 30px;
//     border-radius: 0;
//     border: 0 none;
//     background-color: red;
//     cursor: pointer;
//     -webkit-appearance: none;
//   }
// `;

// const MaxRangeInput = styled.input`
//   position: absolute;
//   -webkit-appearance: none;
//   appearance: none;
//   pointer-events: none;
//   z-index: 2;
//   height: 10px;
//   width: 100%;
//   opacity: 0;

//   &:-webkit-slider-thumb {
//     pointer-events: all;
//     width: 30px;
//     height: 30px;
//     border-radius: 0;
//     border: 0 none;
//     background-color: red;
//     cursor: pointer;
//     -webkit-appearance: none;
//   }
// `;

// const Slider = styled.div`
//   position: relative;
//   z-index: 1;
//   height: 10px;
//   margin: 0 15px;
// `;

// const Track = styled.div`
//   position: absolute;
//   z-index: 1;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   border-radius: 5px;
//   background-color: #c6aee7;
// `;

// const Range = styled.div`
//   position: absolute;
//   z-index: 2;
//   left: 25%;
//   right: 25%;
//   top: 0;
//   bottom: 0;
//   border-radius: 5px;
//   background-color: #6200ee;
// `;

// const MinThumb = styled.div`
//   position: absolute;
//   z-index: 3;
//   width: 30px;
//   height: 30px;
//   background-color: #6200ee;
//   border-radius: 50%;
//   left: 25%;
//   transform: translate(-15px, -10px);
// `;

// const MaxThumb = styled.div`
//   position: absolute;
//   z-index: 3;
//   width: 30px;
//   height: 30px;
//   background-color: #6200ee;
//   border-radius: 50%;
//   right: 25%;
//   transform: translate(15px, -10px);
// `;

const CastGrid = styled.div`
  display: grid;
  width: 920px;
  row-gap: 40px;
  column-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;

const ResetFilterWrapper = styled.div`
  margin-left: 16px;
`;

const OrderByWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const IconWrapper = styled.div<{ $isSelected: boolean }>`
  cursor: pointer;
  width: 64px;
  height: 24px;
  display: flex;
  align-items: center;

  svg {
    path {
      stroke: ${({ $isSelected }) => ($isSelected ? "#B81716" : "#c7c8c9")};
    }

    circle {
      fill: ${({ $isSelected }) => ($isSelected ? "#B81716" : "#c7c8c9")};
    }
  }

  color: ${({ $isSelected }) => ($isSelected ? "#B81716" : "#c7c8c9")};
`;

const FilterOrderByWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;
