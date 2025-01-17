import StarSVG from "@assets/icons/star.svg?react";
import CheckboxSVG from "@assets/icons/checkbox_gray.svg?react";
import CheckboxCheckedSVG from "@assets/icons/checkbox_checked.svg?react";
import styled from "styled-components";
import StarMarkedSVG from "@assets/icons/star_marked.svg?react";

interface RecruitRowProps {
  title: string;
  applyCount: number;
  recruitEnd: string;
  status: string;
  id: number;
  isFavorite: boolean;
  isSelected: boolean;
  onClickCheckbox: (id: number) => void;
  onClickStar: (e: React.MouseEvent<HTMLElement>, id: number) => void;
}

const RecruitRow = ({
  title,
  applyCount,
  recruitEnd,
  id,
  status,
  isSelected,
  isFavorite,
  onClickCheckbox,
  onClickStar,
}: RecruitRowProps) => {
  return (
    <RecruitRowContainer>
      <CheckboxInRow>
        <CheckIconWrapper onClick={() => onClickCheckbox(id)}>
          <CheckedIconWrapper $isChecked={isSelected}>
            {isSelected ? <CheckboxCheckedSVG /> : <CheckboxSVG />}
          </CheckedIconWrapper>
        </CheckIconWrapper>
        <StarIconWrapper
          onClick={(e) => onClickStar(e, id)}
          $isMarked={isFavorite}
        >
          {isFavorite ? <StarMarkedSVG /> : <StarSVG />}
        </StarIconWrapper>
      </CheckboxInRow>
      <PostTitle>{title}</PostTitle>
      <Applicant>{applyCount}건</Applicant>
      <Date>{recruitEnd}</Date>
      <State>{status}</State>
    </RecruitRowContainer>
  );
};

export default RecruitRow;

const RecruitRowContainer = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #f4f4f5;
  align-items: center;
  display: flex;
  padding: 6px 24px;
  gap: 16px;
`;

const CheckboxInRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 36px;
  padding: 8px;
  cursor: pointer;
`;

const PostTitle = styled.div`
  display: flex;
  align-items: center;
  width: 564px;
  height: 36px;
`;

const Applicant = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
`;

const State = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
`;

const CheckIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 28px;
    height: 28px;
  }
`;

const StarIconWrapper = styled.div<{ $isMarked: boolean }>`
  rect {
    fill: ${({ $isMarked }) => !$isMarked && "#e0e0e2"};
  }
`;

const CheckedIconWrapper = styled.div<{ $isChecked: boolean }>`
  rect {
    stroke: ${({ $isChecked }) => !$isChecked && "#e0e0e2"};
  }
`;
