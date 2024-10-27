import { ReactNode } from "react";
import styled from "styled-components";

interface OverlayProps {
  children: ReactNode;
  zIndex?: number;
}

const Overlay = ({ children, zIndex }: OverlayProps) => {
  return <OverlayContainer $zIndex={zIndex}>{children}</OverlayContainer>;
};

export default Overlay;

const OverlayContainer = styled.div<{ $zIndex?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ $zIndex }) => ($zIndex ? $zIndex : 1000)};
`;
