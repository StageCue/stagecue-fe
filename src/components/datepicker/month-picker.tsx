import styled from 'styled-components';

interface MonthPickerProps {
  months: number[];
  currentMonth: number;
  changeMonth: (month: number) => void;
  setIsMonthSelectMode: (v: boolean) => void;
  pickerHeight: number;
}

const MonthPicker = ({
  months,
  currentMonth,
  changeMonth,
  setIsMonthSelectMode,
  pickerHeight,
}: MonthPickerProps) => {
  return (
    <MonthPickerContainer $height={pickerHeight}>
      <MonthGrid>
        {months.map(month => (
          <MonthButton
            key={month}
            selected={month === currentMonth}
            onClick={() => {
              changeMonth(month);
              setIsMonthSelectMode(false);
            }}
          >
            {month + 1}월
          </MonthButton>
        ))}
      </MonthGrid>
    </MonthPickerContainer>
  );
};

export default MonthPicker;

const MonthPickerContainer = styled.div<{ $height: number }>`
  background-color: white;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1000;

  height: ${({ $height }) => ($height ? `${$height}px` : 'fit-content')};

  display: flex;
  flex-direction: column;
`;

const MonthGrid = styled.div`
  background-color: white;
  height: inherit;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: space-between;
  align-items: center;
`;

const MonthButton = styled.button<{ selected: boolean }>`
  padding: 4px;
  min-width: 41px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? '#f5f5f5' : 'transparent')};
  color: ${({ selected }) => (selected ? '#37383C9C' : '#37383C29')};
  font-weight: var(--font-semibold);
  font-size: 16px;
  cursor: pointer;
  outline: none;
  transition: background 0.2s;
`;
