import styled from "styled-components";
import Sidemenu from "./components/sidemenu";
import { useState } from "react";
import CreateTroupe from "./components/createTroupe";

export type bizMenuOption =
  | "지원자 관리"
  | "내 극단 관리"
  | "공고 관리"
  | "My Stage";

const Biz = () => {
  const [selectedOption, setSelectedOption] =
    useState<bizMenuOption>("내 극단 관리");

  const handleOptionClick = (option: bizMenuOption) => {
    setSelectedOption(option);
  };
  return (
    <BizContainer>
      <Sidemenu
        selectedOption={selectedOption}
        onOptionClick={handleOptionClick}
      />
      <Content>{selectedOption === "내 극단 관리" && <CreateTroupe />}</Content>
    </BizContainer>
  );
};

export default Biz;

const BizContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  min-height: inherit;
`;
