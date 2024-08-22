import styled from "styled-components";

interface FloatingButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const FloatingButton = ({ children, disabled }: FloatingButtonProps) => {
  return (
    <FloatingButtonContainer disabled={disabled}>
      {children}
    </FloatingButtonContainer>
  );
};

export default FloatingButton;

const FloatingButtonContainer = styled.button`
  width: 56px;
  height: 56px;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  outline: none;
  border: none;
  background-color: var(--color-blue);

  /* disabled */
  &:disabled {
    background-color: var(--color-gray2);
    svg {
      stroke: var(--color-gray18);
      fill: var(--color-gray18);
    }
  }

  /* hovered */
  &:hover {
    background-color: var(--color-blue3);
  }

  /* focuesed */
  &:focus {
    background-color: var(--color-blue8);
  }

  /* pressed */
  &:active {
    background-color: var(--color-blue3);
  }
`;
