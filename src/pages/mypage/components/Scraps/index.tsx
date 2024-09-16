import styled from "styled-components";

const Scraps = () => {
  return (
    <ScrapContainer>
      <TitleWrapper>
        <ItemTitle>스크랩한 전체 공고 (6)</ItemTitle>
      </TitleWrapper>
    </ScrapContainer>
  );
};

export default Scraps;

const ScrapContainer = styled.div``;

const ItemTitle = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
`;

const TitleWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;
