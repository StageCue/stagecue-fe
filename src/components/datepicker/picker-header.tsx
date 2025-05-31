import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../buttons/button';
import YearPicker from './year-picker';
import CaretLeft from '@assets/icons/caret_left_cal.svg?react';
import CaretRight from '@assets/icons/caret_right_cal.svg?react';
import MonthPicker from './month-picker';

interface PickerHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  changeYear?: (year: number) => void;
  changeMonth?: (month: number) => void;
  pickerText: string;
  onClickApply: () => void;
  onClickReset: () => void;
}

const PickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  changeYear,
  changeMonth,
  pickerText,
  onClickApply,
  onClickReset,
}: PickerHeaderProps) => {
  const [isYearSelectMode, setIsYearSelectMode] = useState(false);
  const [isMonthSelectMode, setIsMonthSelectMode] = useState(false);
  const YEARS_PER_PAGE = 16;
  const minYear = 1900;
  const maxYear = new Date().getFullYear();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  const getInitialStart = () => {
    const lastPageStart = maxYear - (YEARS_PER_PAGE - 1);
    return lastPageStart < minYear ? minYear : lastPageStart;
  };

  const [yearPageStart, setYearPageStart] = useState(getInitialStart());

  const goPrevYearPage = () => {
    setYearPageStart(prev => Math.max(minYear, prev - YEARS_PER_PAGE));
  };
  const goNextYearPage = () => {
    setYearPageStart(prev => Math.min(maxYear - (YEARS_PER_PAGE - 1), prev + YEARS_PER_PAGE));
  };

  const years = Array.from(
    { length: Math.min(YEARS_PER_PAGE, maxYear - yearPageStart + 1) },
    (_, i) => yearPageStart + i
  );

  useEffect(() => {
    setYearPageStart(getInitialStart());
  }, [maxYear]);

  const months = Array.from({ length: 12 }, (_, i) => i);

  const [pickerHeight, setPickerHeight] = useState(0);

  useEffect(() => {
    // TOOD: 더 좋은 방법 있으면 고쳐야함... 일단 만들어야해서 하드코딩임 ㅜㅜ
    const measureCalendarSize = () => {
      const pickerContainer = document.querySelector('.react-datepicker-popper');
      const monthContainer = document.querySelector('#picker-header-wrapper');
      const dayNamesContainer = document.querySelector('#picker-year-month-wrapper');

      let yearPickerHeight = 0;

      if (pickerContainer) {
        const rect = pickerContainer.getBoundingClientRect();
        yearPickerHeight += rect.height;
      }

      if (monthContainer) {
        const rect = monthContainer.getBoundingClientRect();
        yearPickerHeight -= rect.height + 60;
      }

      if (dayNamesContainer) {
        const rect = dayNamesContainer.getBoundingClientRect();
        yearPickerHeight -= rect.height;
      }

      setPickerHeight(yearPickerHeight);
    };

    measureCalendarSize();
  }, [years, months]);

  return (
    <CustomHeaderContainer className="picker-header-test">
      <HeaderWrapper id="picker-header-wrapper">
        <PickerText>{pickerText}</PickerText>
        <ButtonWrapper>
          <Button
            type="button"
            variation="text"
            btnClass="assistive"
            width={38}
            height={20}
            padding="0px"
            lineHeight={142.9}
            letterSpacing={1.45}
            fontSize={14}
            fontWeight="var(--font-semibold)"
            onClick={onClickReset}
          >
            초기화
          </Button>
          <Button
            type="button"
            variation="text"
            btnClass="primary"
            width={25}
            height={28}
            padding="0px"
            lineHeight={142.9}
            letterSpacing={1.45}
            fontSize={14}
            fontWeight="var(--font-semibold)"
            onClick={onClickApply}
          >
            저장
          </Button>
        </ButtonWrapper>
      </HeaderWrapper>
      <YearMonthWrapper id="picker-year-month-wrapper">
        <IconWrapper onClick={isYearSelectMode ? goPrevYearPage : decreaseMonth}>
          <CaretLeft />
        </IconWrapper>
        <YearMonth
          onClick={() => {
            if (changeYear) {
              setIsYearSelectMode(false);
            }

            if (changeMonth) {
              setIsMonthSelectMode(false);
            }
          }}
        >
          {isYearSelectMode ? (
            `${yearPageStart} - ${yearPageStart + YEARS_PER_PAGE - 1}`
          ) : (
            <YearMonthText className="w-full flex items-center gap-2">
              <YearText
                onClick={e => {
                  e.stopPropagation();

                  if (changeYear) {
                    setIsMonthSelectMode(false);
                    setIsYearSelectMode(prev => !prev);
                  }
                }}
              >
                {date.toLocaleString('ko-KR', { year: 'numeric' })}
              </YearText>
              <MonthText
                onClick={e => {
                  e.stopPropagation();

                  if (changeMonth) {
                    setIsYearSelectMode(false);
                    setIsMonthSelectMode(prev => !prev);
                  }
                }}
              >
                {date.toLocaleString('ko-KR', { month: 'long' })}
              </MonthText>
            </YearMonthText>
          )}
        </YearMonth>
        <IconWrapper onClick={isYearSelectMode ? goNextYearPage : increaseMonth}>
          <CaretRight />
        </IconWrapper>
      </YearMonthWrapper>

      {/* 연도 선택 모드일 때만 연도 리스트 표시 */}
      {isYearSelectMode && changeYear && (
        <YearPicker
          years={years}
          currentYear={currentYear}
          changeYear={changeYear}
          setIsYearSelectMode={setIsYearSelectMode}
          pickerHeight={pickerHeight}
        />
      )}
      {isMonthSelectMode && changeMonth && (
        <MonthPicker
          months={months}
          currentMonth={currentMonth}
          changeMonth={changeMonth}
          setIsMonthSelectMode={setIsMonthSelectMode}
          pickerHeight={pickerHeight}
        />
      )}
    </CustomHeaderContainer>
  );
};

const CustomHeaderContainer = styled.div`
  position: relative;
  background-color: white;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const YearMonth = styled.div`
  width: 100%;
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 14px;
`;

const YearMonthText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const YearText = styled.div`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MonthText = styled.div`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const PickerText = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 27.8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const YearMonthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default PickerHeader;
