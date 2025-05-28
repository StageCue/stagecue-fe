import styled from 'styled-components';
import Overlay from '../modal/overlay';

import DatePicker from 'react-datepicker';
import CaretLeft from '@assets/icons/caret_left_cal.svg?react';
import CaretRight from '@assets/icons/caret_right_cal.svg?react';

import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import Button from '../buttons/button';
import { formatDate } from '@/utils/format';
import { INDEFINITE_DATE } from '@/constants/biz';

interface DatepickerModalProps {
  defaultValue?: string;
  onClose: () => void;
  onConfirm: (date: string) => void;
}

const DatepickerModal = ({ onClose, onConfirm, defaultValue }: DatepickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const parseDate = (dateString?: string) => {
    if (dateString) {
      const [year, month, day] = dateString.split('-').map(Number);

      return new Date(year, month - 1, day);
    } else {
      return new Date(Date.now());
    }
  };

  useEffect(() => {
    if (defaultValue === INDEFINITE_DATE) {
      setSelectedDate(new Date(Date.now()));
      return;
    }
    setSelectedDate(parseDate(defaultValue));
  }, [defaultValue]);
  return (
    <DatepickerModalContainer>
      <Overlay>
        <ModalBox className="datepicker-modal">
          <TextWrapper>
            <MainText>공고 마감일 변경</MainText>
            <SubText>변경할 공고마감일을 선택해주세요.</SubText>
          </TextWrapper>
          <DatePicker
            inline
            minDate={new Date()}
            dateFormat="yyyy.MM.dd"
            selected={selectedDate}
            onChange={handleDateChange}
            shouldCloseOnSelect={false}
            disabledKeyboardNavigation
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <CustomHeader
                date={date}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                pickerText={''}
              />
            )}
          />
          <ButtonWrapper>
            <Button
              variation="outlined"
              btnClass="primary"
              width={146}
              height={48}
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              variation="solid"
              btnClass="primary"
              width={146}
              height={48}
              onClick={() => onConfirm(formatDate(selectedDate!))}
            >
              저장
            </Button>
          </ButtonWrapper>
        </ModalBox>
      </Overlay>
    </DatepickerModalContainer>
  );
};

export default DatepickerModal;

const DatepickerModalContainer = styled.div``;

const ModalBox = styled.div`
  width: 340px;
  height: 537.77px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainText = styled.div`
  color: #171719;
  font-weight: var(--font-semibold);
  font-size: 20px;
  line-height: 140%;
  letter-spacing: -1.2%;
  text-align: center;
`;

const SubText = styled.div`
  width: 300px;
  height: 36px;
  font-size: 15px;
  line-height: 160%;
  letter-spacing: 0.96%;
  font-weight: var(--font-regular);
  text-align: center;
  color: #47484b;
`;

interface CustomHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  pickerText: string;
}

// Header
const CustomHeader = ({ date, decreaseMonth, increaseMonth, pickerText }: CustomHeaderProps) => {
  return (
    <CustomHeaderContainer>
      <HeaderWrapper>
        <PickerText>{pickerText}</PickerText>
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

const YearMonthWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
