import styled from 'styled-components';

interface YearPickerProps {
  currentYear: number;
  years: number[];
  changeYear: (year: number) => void;
  setIsYearSelectMode: (v: boolean) => void;
  pickerHeight: number;
}

const YearPicker = ({
  years,
  currentYear,
  changeYear,
  setIsYearSelectMode,
  pickerHeight,
}: YearPickerProps) => {
  return (
    <YearPickerContainer $height={pickerHeight}>
      <YearGrid>
        {years.map(year => (
          <YearButton
            key={year}
            selected={year === currentYear}
            onClick={() => {
              changeYear(year);
              setIsYearSelectMode(false);
            }}
          >
            {year}
          </YearButton>
        ))}
      </YearGrid>
    </YearPickerContainer>
  );
};

export default YearPicker;

const YearPickerContainer = styled.div<{ $height: number }>`
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

const YearGrid = styled.div`
  background-color: white;
  height: inherit;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  justify-items: space-between;
  align-items: center;
`;

const YearButton = styled.button<{ selected: boolean }>`
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
