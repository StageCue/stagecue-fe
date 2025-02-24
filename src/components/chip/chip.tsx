import styled from "styled-components";

interface ChipProps {
  theme: keyof typeof THEME_STYLES;
  children: React.ReactNode;
}

const THEME_STYLES = {
  red: {
    background: "#fbf2f2",
    color: "#b82925",
  },
  yellow: {
    background: "#FFFCF7",
    color: "#FF9200",
  },
  green: {
    background: "#F2FFF6",
    color: "#00BF40",
  },
} as const;

const Chip = ({ theme, children }: ChipProps) => {
  return <StyledChip themeColor={theme}>{children}</StyledChip>;
};

const StyledChip = styled.div<{ themeColor: keyof typeof THEME_STYLES }>`
  padding: 4px 9px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-medium);
  font-size: 12px;
  line-height: 133.4%;
  letter-spacing: 2.52%;

  background-color: ${({ themeColor }) => THEME_STYLES[themeColor].background};
  color: ${({ themeColor }) => THEME_STYLES[themeColor].color};
`;

export default Chip;
