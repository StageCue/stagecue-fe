import styled from "styled-components";
import CheckboxSVG from "@assets/icons/checkbox_gray.svg?react";
import CheckboxCheckedSVG from "@assets/icons/checkbox_checked.svg?react";
import StarSVG from "@assets/icons/star.svg?react";
import CaretSVG from "@assets/icons/caret_down.svg?react";
import { useState } from "react";

const Table = () => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  const handleCheckboxClick = () => {
    setIsCheckedAll((prev) => !prev);
  };

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
        <NameColumn>
          이름
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </NameColumn>
        <AgeColumn>
          나이
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </AgeColumn>
        <GenderColumn>
          성별
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </GenderColumn>
        <PostTitle>
          공고명
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </PostTitle>
        <Date>
          지원 일자
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </Date>
        <State>
          상태
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
        </State>
      </Header>
      <Body></Body>
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

const NameColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AgeColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GenderColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const State = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
