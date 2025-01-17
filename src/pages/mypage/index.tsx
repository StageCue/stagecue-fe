import styled from "styled-components";
import Menu from "./components/menu/menu";
import Mystage from "./components/mystage";
import { useState } from "react";
import ApplyHistory from "./components/applyHistory";
import SettingProfile from "./components/settingProfile";
import EditAccount from "./components/editAccount";
import ResetPassword from "./components/resetPassword";
import DeleteAccount from "./components/deleteAccount";
import useSessionStore from "@/store/session";
import ScrapRecruits from "./components/scrapRecruits";

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
  const { username } = useSessionStore();

  const handleOptionClick = (option: mypageMenuType) => {
    setSelectedMenu(option);
  };

  return (
    <MyPageContainer>
      <MenuColumn>
        <Username>{username}님</Username>
        <Menu selectedMenu={selectedMenu} onClick={handleOptionClick} />
      </MenuColumn>
      <ContentColumn>
        {selectedMenu === "my stage" && <Mystage />}
        {selectedMenu === "배우지원 현황" && <ApplyHistory />}
        {selectedMenu === "공고 스크랩 리스트" && <ScrapRecruits />}
        {selectedMenu === "프로필 관리" && <SettingProfile />}
        {selectedMenu === "기본정보 변경" && <EditAccount />}
        {selectedMenu === "비밀번호 재설정" && <ResetPassword />}
        {selectedMenu === "계정 탈퇴" && <DeleteAccount />}
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
  margin-top: 20px;
  margin-left: 235px;
  width: 685px;
`;

const Username = styled.div`
  font-weight: var(--font-semibold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;
