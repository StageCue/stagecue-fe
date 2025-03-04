import DatePicker from 'react-datepicker';
import CaretLeft from '@assets/icons/caret_left_cal.svg?react';
import CaretRight from '@assets/icons/caret_right_cal.svg?react';

import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import Button from '../buttons/button';
import { forwardRef } from 'react';

interface RangeDatepickerProps {
  selectedRange: [Date | null, Date | null];
  onChangeDate: (range: [Date | null, Date | null]) => void;
  minDate?: Date;
  maxDate?: Date;
  pickerText: string;
}

const RangeDatepicker = forwardRef<DatePicker, RangeDatepickerProps>(
  ({ selectedRange, onChangeDate, pickerText }, ref) => {
    const [startDate, endDate] = selectedRange;

    const handleApplyClick = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.setOpen(false);
      }
    };

    const handleResetClick = () => {
      onChangeDate([new Date(Date.now()), new Date(Date.now())]);
    };

    return (
      <RangeDatePickerContainer>
        <DatePicker
          ref={ref}
          dateFormat="yyyy.MM.dd"
          selectsRange
          startDate={startDate!}
          endDate={endDate!}
          onChange={update => onChangeDate(update)}
          shouldCloseOnSelect={false}
          disabledKeyboardNavigation
          customInputRef=""
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <CustomHeader
              date={date}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
              pickerText={pickerText}
              onClickApply={handleApplyClick}
              onClickReset={handleResetClick}
            />
          )}
        />
      </RangeDatePickerContainer>
    );
  }
);

export default RangeDatepicker;

const RangeDatePickerContainer = styled.div`
  .react-datepicker__day--in-range:not(.react-datepicker__day--range-start) {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 33px;
      width: 7px;
      top: 0;
      left: -6px;
      bottom: 0;
      background: #d47473;
      border-radius: 0;
    }
  }
`;

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  pickerText: string;
  onClickApply: () => void;
  onClickReset: () => void;
}

// Header
const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  pickerText,
  onClickApply,
  onClickReset,
}: CustomHeaderProps) => {
  return (
    <CustomHeaderContainer>
      <HeaderWrapper>
        <PickerText>{pickerText}</PickerText>
        <ButtonWrapper>
          <Button
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
      <YearMonthWrapper>
        <IconWrapper onClick={decreaseMonth}>
          <CaretLeft />
        </IconWrapper>
        <YearMonth>{date.toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}</YearMonth>
        <IconWrapper onClick={increaseMonth}>
          <CaretRight />
        </IconWrapper>
      </YearMonthWrapper>
    </CustomHeaderContainer>
  );
};

const CustomHeaderContainer = styled.div`
  background-color: white;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const YearMonth = styled.div`
  color: #171719;
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
