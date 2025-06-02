import styled, { keyframes } from 'styled-components';

const DetailSkeleton = () => {
  return (
    <DetailContainer>
      <ContentWrapper>
        <Header>
          <TitleWrapper>
            <DdayWrapper>
              <SkeletonBox width="80px" height="26px" />
              <SkeletonBox width="24px" height="24px" />
            </DdayWrapper>
            <SkeletonBox width="400px" height="32px" />
          </TitleWrapper>
          <Divider />
          <TroupeWrapper>
            <SkeletonBox width="40px" height="40px" borderRadius="8px" />
            <SkeletonBox width="120px" height="24px" />
          </TroupeWrapper>
          {/* 이미지 슬라이드 스켈레톤 */}
          <SkeletonBox width="689px" height="300px" borderRadius="8px" />
        </Header>
        <Content>
          <ContentTab>
            <SkeletonBox width="118px" height="24px" />
            <SkeletonBox width="118px" height="24px" />
            <SkeletonBox width="118px" height="24px" />
          </ContentTab>
          <ContentBody>
            <SkeletonBox width="100%" height="20px" marginBottom="12px" />
            <SkeletonBox width="80%" height="20px" marginBottom="12px" />
            <SkeletonBox width="90%" height="20px" marginBottom="12px" />
            <SkeletonBox width="70%" height="20px" marginBottom="24px" />

            <SkeletonBox width="100%" height="20px" marginBottom="12px" />
            <SkeletonBox width="85%" height="20px" marginBottom="12px" />
            <SkeletonBox width="95%" height="20px" marginBottom="12px" />
          </ContentBody>
        </Content>
      </ContentWrapper>
    </DetailContainer>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// 스켈레톤 박스 컴포넌트
const SkeletonBox = styled.div<{
  width: string;
  height: string;
  borderRadius?: string;
  marginBottom?: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export default DetailSkeleton;

const DetailContainer = styled.div`
  width: 100%;
  min-width: 1060px;
  height: 100%;
  min-height: inherit;
  display: flex;
  margin-top: 60px;
  margin-bottom: 100px;
`;
const ContentWrapper = styled.div`
  width: 689px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DdayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Divider = styled.div`
  width: 689px;
  height: 1px;
  background-color: #f4f4f5;
`;

const TroupeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Content = styled.div``;

const ContentTab = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #f4f4f5;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const ContentBody = styled.div`
  width: 689px;
  padding: 24px 0;
`;
