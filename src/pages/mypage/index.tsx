import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import Menu from './components/menu/menu';
import MyStage from './components/mystage';
import EditAccount from './components/editAccount';
import ApplyHistory from './components/applyHistory';
import ResetPassword from './components/resetPassword';
import DeleteAccount from './components/deleteAccount';
import ScrapRecruits from './components/scrapRecruits';
import SettingProfile from './components/settingProfile';

import useSessionStore from '@/store/session';

export type mypageMenuType =
  | 'my stage'
  | '배우지원 현황'
  | '공고 스크랩 리스트'
  | '프로필 관리'
  | '기본정보 변경'
  | '비밀번호 재설정'
  | '계정 탈퇴';

const MyPage = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<mypageMenuType>('my stage');
  const [selectedType, setSelectedType] = useState<'이메일' | '휴대폰 번호'>('이메일');
  const { username } = useSessionStore();

  useEffect(() => {
    if (location?.state?.menu) {
      setSelectedMenu(location?.state?.menu);
      setSelectedType(location?.state?.type);
    }
  }, [location?.state]);

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
        {selectedMenu === 'my stage' && <MyStage />}
        {selectedMenu === '배우지원 현황' && <ApplyHistory />}
        {selectedMenu === '공고 스크랩 리스트' && <ScrapRecruits />}
        {selectedMenu === '프로필 관리' && <SettingProfile />}
        {selectedMenu === '기본정보 변경' && <EditAccount accountType={selectedType} />}
        {selectedMenu === '비밀번호 재설정' && <ResetPassword />}
        {selectedMenu === '계정 탈퇴' && <DeleteAccount />}
      </ContentColumn>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 60px 0 100px 0;
  gap: 56px;
  position: relative;
`;

const MenuColumn = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  /* position: fixed; */
  background-color: white;
`;

const ContentColumn = styled.div`
  margin-top: 20px;
  width: 685px;
`;

const Username = styled.div`
  font-weight: var(--font-semibold);
  font-size: 28px;
  line-height: 135.8%;
  letter-spacing: -2.36%;
`;
