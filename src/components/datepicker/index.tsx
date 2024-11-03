import DatePicker from "react-datepicker";
import CaretLeft from "@assets/icons/caret_left_cal.svg?react";
import CaretRight from "@assets/icons/caret_right_cal.svg?react";

import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import Button from "../buttons/button";
import { useRef } from "react";

interface DatepickerProps {
  selectedDate: Date;
  onChangeDate: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  pickerText: string;
}

const Datepicker = ({
  selectedDate,
  onChangeDate,
  pickerText,
}: DatepickerProps) => {
  const datepickerRef = useRef<DatePicker | null>(null);

  const handleApplyClick = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(false);
    }
  };

  const handleResetClick = () => {
    onChangeDate(new Date(Date.now()));
  };

  return (
    <DatePickerContainer>
      <DatePicker
        ref={datepickerRef}
        dateFormat="yyyy.MM.dd"
        selected={selectedDate}
        onChange={onChangeDate}
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation
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
    </DatePickerContainer>
  );
};

export default Datepicker;

const DatePickerContainer = styled.div``;

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
        <YearMonth>
          {date.toLocaleString("ko-KR", { year: "numeric", month: "long" })}
        </YearMonth>
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
