import { ComponentProps, forwardRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import PickerHeader from './picker-header';

interface DatepickerProps extends Omit<ComponentProps<typeof DatePicker>, 'ref'> {
  selectedDate: Date | null;
  onChangeDate: (date: Date | null) => void;
  pickerText: string;
}

const Datepicker = forwardRef<DatePicker, DatepickerProps>(
  ({ selectedDate, onChangeDate, pickerText, ...props }, ref) => {
    const handleApplyClick = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.setOpen(false);
      }
    };

    const handleResetClick = () => {
      const today = new Date(Date.now());
      onChangeDate(today);

      if (ref && 'current' in ref && ref.current) {
        ref.current.setSelected(today);
      }
    };

    return (
      <DatePickerContainer>
        <DatePicker
          ref={ref}
          dateFormat="yyyy.MM.dd"
          selected={selectedDate}
          // @ts-expect-error - Discriminated Union bug
          selectsRange={false}
          onChange={onChangeDate}
          placeholderText="선택해주세요."
          shouldCloseOnSelect={false}
          disabledKeyboardNavigation
          customInputRef=""
          {...props}
          renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeYear, changeMonth }) => (
            <PickerHeader
              date={date}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
              changeYear={changeYear}
              changeMonth={changeMonth}
              pickerText={pickerText}
              onClickApply={handleApplyClick}
              onClickReset={handleResetClick}
            />
          )}
        />
      </DatePickerContainer>
    );
  }
);

export default Datepicker;

const DatePickerContainer = styled.div`
  && input[disabled] {
    color: #dadada;
    background-color: white;
    cursor: not-allowed;
  }
`;
