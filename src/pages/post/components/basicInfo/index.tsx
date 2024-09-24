import styled from "styled-components";

interface BasicInfoProps {
  introduce: string;
  start: string;
  end: string;
  monthlyFee: number;
  recruitingParts: string;
}

const BasicInfo = ({
  introduce,
  start,
  end,
  monthlyFee,
  recruitingParts,
}: BasicInfoProps) => {
  return (
    <BasicInfoContainer>
      <InfoWrapper>
        <Property>
          <Dot />
          공연설명
        </Property>
        <TextValue>{introduce}</TextValue>
      </InfoWrapper>
      <InfoWrapper>
        <Property>
          <Dot />
          공연기간
        </Property>
        <TextValue>
          {start}~{end}
        </TextValue>
      </InfoWrapper>
      <InfoWrapper>
        <Property>
          <Dot />
          월회비
        </Property>
        <TextValue>{monthlyFee}원</TextValue>
      </InfoWrapper>
      <InfoWrapper>
        <Property>
          <Dot />
          연기 가능 배역
        </Property>
        <Chips>
          {recruitingParts?.split("|").map((part) => (
            <Chip>{part}</Chip>
          ))}
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
  border-radius: 6px;
`;
