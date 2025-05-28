import { useState, ReactNode } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  message: string | ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom';
}

export default function Tooltip({ message, children, placement = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Wrapper onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <TooltipBox placement={placement}>
          {message}
          <TooltipArrow placement={placement} />
        </TooltipBox>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipBox = styled.div<{ placement: 'top' | 'bottom' }>`
  position: absolute;
  ${({ placement }) => (placement === 'top' ? 'bottom: 150%;' : 'top: 150%;')}
  left: 50%;
  transform: translateX(-50%);
  background-color: #2e2f33e0;
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 999;
  text-align: center;
`;

const TooltipArrow = styled.div<{ placement: 'top' | 'bottom' }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ${({ placement }) =>
    placement === 'top'
      ? `
    top: 100%;
    border-width: 6px 6px 0 6px;
    border-style: solid;
    border-color: #2e2f33e0 transparent transparent transparent;
  `
      : `
    bottom: 100%;
    border-width: 0 6px 6px 6px;
    border-style: solid;
    border-color: transparent transparent #2e2f33e0 transparent;
  `}
`;
