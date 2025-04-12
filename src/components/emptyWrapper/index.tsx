import styled from 'styled-components';

interface EmptyWrapperProps {
  children: React.ReactNode;
  width: number;
  height: number;
  marginTop?: number;
}

const EmptyWrapper = ({ children, width, height, marginTop = 0 }: EmptyWrapperProps) => {
  return (
    <EmptyContainer $width={width} $height={height} $marginTop={marginTop}>
      {children}
    </EmptyContainer>
  );
};

export default EmptyWrapper;

const EmptyContainer = styled.div<{ $width: number; $height: number; $marginTop: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  margin-top: ${({ $marginTop }) => $marginTop}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  border: 2px dashed #ccc;
  border-radius: 12px;
  color: #666;
  font-size: 18px;
  line-height: 1.6;
  text-align: center;
`;
