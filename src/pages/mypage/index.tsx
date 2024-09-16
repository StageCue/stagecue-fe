import styled from "styled-components";
import Menu from "./components/menu/menu";
import Mystage from "./components/mystage";
import { useState } from "react";
import ApplyHistory from "./components/applyHistory";
import Scraps from "./components/scraps";
import SettingProfile from "./components/settingProfile";

export type mypageMenuType =
  | "my stage"
  | "배우지원 현황"
  | "공고 스크랩 리스트"
  | "프로필 관리"
  | "기본정보 변경"
  | "비밀번호 재설정"
  | "계정 탈퇴";

const MyPage = () => {
  const [selectedMenu, setSelectedMenu] = useState<mypageMenuType>("my stage");

  const handleOptionClick = (option: mypageMenuType) => {
    setSelectedMenu(option);
  };

  console.log(selectedMenu);

  return (
    <MyPageContainer>
      <MenuColumn>
        <Username>서예지님</Username>
        <Menu selectedMenu={selectedMenu} onClick={handleOptionClick} />
      </MenuColumn>
      <ContentColumn>
        {selectedMenu === "my stage" && <Mystage />}
        {selectedMenu === "배우지원 현황" && <ApplyHistory />}
        {selectedMenu === "공고 스크랩 리스트" && <Scraps />}
        {selectedMenu === "프로필 관리" && <SettingProfile />}
        {selectedMenu === "기본정보 변경" && <Mystage />}
        {selectedMenu === "비밀번호 재설정" && <Mystage />}
        {selectedMenu === "계정 탈퇴" && <Mystage />}
      </ContentColumn>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  padding: 60px 260px 100px 260px;
  gap: 55px;
  position: relative;
`;

const MenuColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: fixed;
  background-color: white;
`;

const ContentColumn = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-left: 235px;
`;

const Username = styled.div`
  font-weight: var(--font-semibold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;
