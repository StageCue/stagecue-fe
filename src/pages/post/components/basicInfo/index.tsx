import styled from "styled-components";

const BasicInfo = () => {
  return (
    <BasicInfoContainer>
      <InfoWrapper>
        <Property>
          <Dot />
          공연설명
        </Property>
        <TextValue>
          업템포극단은 2026년 생성된 어쩌고 저쩌고 대한민국 최고의 극단 중
          하나입니다. 총 100여명이 넘는 인원들을 보유하고 있으며 어쩌고 저쩌고
          내용이 아주 길게 들어갈까요..? 최대 2줄까지 노출 시키고 남은 내용은
          더보기클릭하여 나타내는 것이 좋을것같습니다.
        </TextValue>
      </InfoWrapper>
      <InfoWrapper>
        <Property>
          <Dot />
          공연기간
        </Property>
        <TextValue>2024.07.16~2024.07.25</TextValue>
      </InfoWrapper>
      <InfoWrapper>
        <Property>
          <Dot />
          월회비
        </Property>
        <TextValue>160,000원</TextValue>
      </InfoWrapper>
      <InfoWrapper>
        <Property>
          <Dot />
          연기 가능 배역
        </Property>
        <Chips>
          <Chip>지나가는 행인1</Chip>
        </Chips>
      </InfoWrapper>
    </BasicInfoContainer>
  );
};

export default BasicInfo;

const BasicInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 28px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Property = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const TextValue = styled.div`
  margin-left: 28px;
  font-weight: var(--font-medium);
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
  color: #47484b;
`;

const Dot = styled.div`
  background-color: #171719;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 12px;
`;

const Chips = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 28px;
`;

const Chip = styled.div`
  min-width: 49px;
  height: 32px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: var(--font-medium);
  line-height: 142.9%;
  letter-spacing: 1.45%;
  background-color: #f8f8f8;
`;
