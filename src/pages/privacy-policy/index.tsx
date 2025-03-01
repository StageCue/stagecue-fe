import styled, { keyframes } from 'styled-components';

const PrivacyPolicy = () => {
  return (
    <Container>
      <Title>개인정보처리방침 페이지를 준비 중이에요.</Title>
      <Description>
        더 좋은 콘텐츠로 찾아뵙기 위해 열심히 준비 중이에요! <br />곧 만나볼 수 있도록 최선을
        다하겠습니다. 🚀
      </Description>
    </Container>
  );
};

export default PrivacyPolicy;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  max-width: 400px;
  line-height: 1.6;
`;
