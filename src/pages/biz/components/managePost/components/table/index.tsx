import styled from "styled-components";
import CheckboxSVG from "@assets/icons/checkbox_gray.svg?react";
import CheckboxCheckedSVG from "@assets/icons/checkbox_checked.svg?react";
import StarSVG from "@assets/icons/star.svg?react";
import CaretSVG from "@assets/icons/caret_down.svg?react";
import { useState } from "react";
import RecruitRow from "./components/recruitRow";
import NoPost from "./components/noPost";
// import RadioSVG from "@assets/icons/radio_s.svg?react";
// import RadioCheckedSVG from "@assets/icons/radio_s_checked.svg?react";

interface Recruit {
  id: number;
  isFavorite: boolean;
  title: string;
  applyCount: number;
  status: string;
  recruitEnd: string;
}

interface TableProps {
  recruits: Recruit[];
  onClickCreateRecruit: () => void;
}

const Table = ({ recruits, onClickCreateRecruit }: TableProps) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  // const [isGenderFilterShowing, setIsGenderFilterShowing] = useState(false);
  // const [selectedGender, setSelectedGender] = useState("남성");

  const handleCheckboxClick = () => {
    setIsCheckedAll((prev) => !prev);
  };

  // const handleGenderColumnClick = () => {
  //   setIsGenderFilterShowing((prev) => !prev);
  // };

  // const handleGenderFilterClick = (
  //   event: React.MouseEvent<HTMLElement, MouseEvent>,
  //   gender: string
  // ) => {
  //   event.stopPropagation();
  //   setSelectedGender(gender);
  // };

  return (
    <TableContainer>
      <Header>
        <CheckboxColumn>
          <CheckboxWrapper onClick={handleCheckboxClick}>
            {isCheckedAll ? <CheckboxCheckedSVG /> : <CheckboxSVG />}
          </CheckboxWrapper>
          <StarWrapper>
            <StarSVG />
          </StarWrapper>
        </CheckboxColumn>
        <PostTitleColumn>공고명</PostTitleColumn>
        <ApplicantColumn>
          지원 건수
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </ApplicantColumn>
        <DateColumn>
          마감일
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </DateColumn>
        <StateColumn>
          상태
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </StateColumn>
      </Header>
      <Body>
        {/* {recruits?.map(
          ({ title, id, isFavorite, applyCount, recruitEnd, status }) => (
            <RecruitRow
              key={id}
              title={title}
              id={id}
              applyCount={applyCount}
              recruitEnd={recruitEnd}
              status={status}
              isFavorite={isFavorite}
            />
          )
        )} */}
        <NoPost onClick={onClickCreateRecruit} />
      </Body>
    </TableContainer>
  );
};

export default Table;

const TableContainer = styled.div`
  width: 1100px;
  height: 638px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  border: 1px solid #e1e2d4;
`;

const Header = styled.div`
  width: 100%;
  height: 48px;
  background-color: #f4f4f5;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  align-items: center;
  padding: 14px 24px;
  gap: 16px;
`;

const CheckboxColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 36px;
  padding: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const CaretWrapper = styled.div``;

// const NameColumn = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100px;
//   height: 36px;
//   cursor: pointer;
// `;

// const AgeColumn = styled.div`
//   display: flex;
//   align-items: center;
//   width: 80px;
//   height: 36px;
//   cursor: pointer;
// `;

// const GenderColumn = styled.div`
//   display: flex;
//   align-items: center;
//   width: 80px;
//   height: 36px;
//   position: relative;
//   cursor: pointer;
// `;

const PostTitleColumn = styled.div`
  display: flex;
  align-items: center;
  width: 564px;
  height: 36px;
  cursor: pointer;
`;

const ApplicantColumn = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
  cursor: pointer;
`;

const DateColumn = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
  cursor: pointer;
`;

const StateColumn = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const Row = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #f4f4f5;
  align-items: center;
  display: flex;
  padding: 6px 24px;
  gap: 16px;
`;
