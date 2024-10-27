import styled from "styled-components";
import CheckboxSVG from "@assets/icons/checkbox_gray.svg?react";
import CheckboxCheckedSVG from "@assets/icons/checkbox_checked.svg?react";
import StarSVG from "@assets/icons/star.svg?react";
import CaretSVG from "@assets/icons/caret_down.svg?react";
import { useState } from "react";
// import NoApplicant from "./components/noApplicant";
import RadioSVG from "@assets/icons/radio_s.svg?react";
import RadioCheckedSVG from "@assets/icons/radio_s_checked.svg?react";
import ProfileModal from "../profileMdoal";
import StatusTag from "../statusTag";

interface TableProps {
  applications: {
    applyId: number;
    profileId: number;
    recruitId: number;
    isFavorite: boolean;
    performerName: string;
    age: number;
    gender: "MALE" | "FEMALE";
    recruitTitle: string;
    applyDate: string;
    applyStatus: string;
  }[];
  onClickCheckbox: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number,
    name: string
  ) => void;
  selectedApplyIds: { id: number; name: string }[];
  onClickRow: (id: number, name: string) => void;
  onClickPass: () => void;
  onClickFail: () => void;
  onCloseModal: () => void;
  isProfileModalOpen: boolean;
  showingApplicant: { id: number; name: string };
}

const Table = ({
  applications,
  onClickCheckbox,
  selectedApplyIds,
  onClickRow,
  onClickPass,
  onClickFail,
  onCloseModal,
  isProfileModalOpen,
  showingApplicant,
}: TableProps) => {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isGenderFilterShowing, setIsGenderFilterShowing] = useState(false);
  const [selectedGender, setSelectedGender] = useState("남성");

  const handleCheckboxClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setIsCheckedAll((prev) => !prev);
    applications.map(({ applyId, performerName }) =>
      onClickCheckbox(e, applyId, performerName)
    );
  };

  const handleGenderColumnClick = () => {
    setIsGenderFilterShowing((prev) => !prev);
  };

  const handleGenderFilterClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    gender: string
  ) => {
    event.stopPropagation();
    setSelectedGender(gender);
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
        <GenderColumn onClick={handleGenderColumnClick}>
          성별
          <CaretWrapper>
            <CaretSVG />
          </CaretWrapper>
          {isGenderFilterShowing && (
            <GenderFilter>
              <GenderOption onClick={(e) => handleGenderFilterClick(e, "남성")}>
                <RaidoWrapper>
                  {selectedGender === "남성" ? (
                    <RadioCheckedSVG />
                  ) : (
                    <RadioSVG />
                  )}
                </RaidoWrapper>
                남성
              </GenderOption>
              <GenderOption onClick={(e) => handleGenderFilterClick(e, "여성")}>
                <RaidoWrapper>
                  {selectedGender === "여성" ? (
                    <RadioCheckedSVG />
                  ) : (
                    <RadioSVG />
                  )}
                </RaidoWrapper>
                여성
              </GenderOption>
            </GenderFilter>
          )}
        </GenderColumn>
        <PostTitleColumn>공고명</PostTitleColumn>
        <DateColumn>
          지원 일자
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
        {applications.map(
          ({
            applyId,
            age,
            gender,
            performerName,
            recruitTitle,
            applyDate,
            applyStatus,
          }) => (
            <>
              <Row
                key={applyId}
                onClick={() => onClickRow(applyId, performerName)}
              >
                <CheckboxInRow>
                  <CheckIconWrapper
                    onClick={(e) => onClickCheckbox(e, applyId, performerName)}
                  >
                    {selectedApplyIds.some((apply) => apply.id === applyId) ? (
                      <CheckboxCheckedSVG />
                    ) : (
                      <CheckboxSVG />
                    )}
                  </CheckIconWrapper>
                  <StarIconWrapper>
                    <StarSVG />
                  </StarIconWrapper>
                </CheckboxInRow>
                <Name>{performerName}</Name>
                <Age>{age}</Age>
                <Gender>{gender === "MALE" ? "남" : "여"}</Gender>
                <PostTitle>{recruitTitle}</PostTitle>
                <Date>{applyDate}</Date>
                <StatusTag status={applyStatus} />
              </Row>
              {isProfileModalOpen && showingApplicant.id === applyId && (
                <ProfileModal
                  id={`${applyId}`}
                  onClickPass={onClickPass}
                  onClickFail={onClickFail}
                  onClose={onCloseModal}
                  name={performerName}
                  applyStatus={applyStatus}
                />
              )}
            </>
          )
        )}
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

const NameColumn = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
  cursor: pointer;
`;

const AgeColumn = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
  cursor: pointer;
`;

const GenderColumn = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
  position: relative;
  cursor: pointer;
`;

const PostTitleColumn = styled.div`
  display: flex;
  align-items: center;
  width: 408px;
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

const GenderFilter = styled.div`
  position: absolute;
  bottom: -72px;
  width: 81px;
  height: 76px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
`;

const GenderOption = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  width: 53px;
  height: 20px;
  cursor: pointer;
`;

const RaidoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #f4f4f5;
  align-items: center;
  display: flex;
  padding: 6px 24px;
  gap: 16px;
  cursor: pointer;
`;

const CheckboxInRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 36px;
  padding: 8px;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  height: 36px;
`;

const Age = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 36px;
`;

const PostTitle = styled.div`
  display: flex;
  align-items: center;
  width: 408px;
  height: 36px;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
`;

const CheckIconWrapper = styled.div`
  cursor: pointer;
  rect {
    stroke: #e0e0e2;
  }
`;

const StarIconWrapper = styled.div`
  rect {
    fill: #e0e0e2;
  }
`;
