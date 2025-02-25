import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoaderContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const DotsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Dot = styled.div<{ $delay: string }>`
  width: 12px;
  height: 12px;
  background: #b81716;
  border-radius: 50%;
  animation: ${bounce} 1.2s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay || "0s"};
`;

const LoadingText = styled.p`
  padding-top: 16px;
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
  margin: 0;
`;

const LoadingModal = () => {
  return (
    <Overlay>
      <LoaderContainer>
        <DotsWrapper>
          <Dot $delay={"0s"} />
          <Dot $delay={"0.2s"} />
          <Dot $delay={"0.4s"} />
        </DotsWrapper>
        <LoadingText>로딩 중...</LoadingText>
      </LoaderContainer>
    </Overlay>
  );
};

export default LoadingModal;
