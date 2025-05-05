import Button from '@/components/buttons/button';
import styled from 'styled-components';
import PlusSVG from '@assets/icons/plus_red.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetTroupeInfo } from '../manageTroupe/hooks/useGetTroupe';

type bizMenuOption = '지원자 관리' | '내 극단 관리' | '공고 관리' | 'My Stage';

const Sidemenu = () => {
  const navigate = useNavigate();
  const { name = '극단을 설정해주세요.' } = useGetTroupeInfo() ?? {};
  const [currentMenu, setCurrentMenu] = useState('지원자 관리');

  const location = useLocation();

  const menuOption: bizMenuOption[] = ['지원자 관리', '내 극단 관리', '공고 관리', 'My Stage'];

  const handleCreateRecruitClick = () => {
    navigate('/biz/cast/form');
  };

  const handleOptionClick = (option: bizMenuOption) => {
    if (option === '지원자 관리') {
      navigate('/biz/apply');
    } else if (option === '내 극단 관리') {
      navigate('/biz/troupe');
    } else if (option === '공고 관리') {
      navigate('/biz/cast');
    }

    setCurrentMenu(option);
  };

  useEffect(() => {
    if (location.pathname.startsWith('/biz/apply')) {
      setCurrentMenu('지원자 관리');
    } else if (location.pathname.startsWith('/biz/troupe')) {
      setCurrentMenu('내 극단 관리');
    } else if (location.pathname.startsWith('/biz/cast')) {
      setCurrentMenu('공고 관리');
    } else if (location.pathname.startsWith('/biz/my-stage')) {
      setCurrentMenu('My Stage');
    }
  }, [location.pathname]);
  return (
    <SideMenuContainer>
      <TroupeWrapper>
        <TopArea>
          <TroupeLogo />
          <Button
            variation="outlined"
            btnClass="assistive"
            width={75}
            height={32}
            fontSize={13}
            padding="7px 14px"
            fontWeight="var(--font-medium)"
          >
            계정관리
          </Button>
        </TopArea>
        <TroupeName>{name}</TroupeName>
      </TroupeWrapper>
      <UploadPostWrapper>
        <Button
          variation="outlined"
          btnClass="primary"
          width={212}
          height={48}
          fontSize={16}
          letterSpacing={0.57}
          lineHeight={150}
          onClick={handleCreateRecruitClick}
        >
          <PlusSVG />
          <BtnText>모집 공고 올리기</BtnText>
        </Button>
      </UploadPostWrapper>
      <Menu>
        {menuOption.map((option: bizMenuOption, index) => (
          <Option
            key={index}
            onClick={() => handleOptionClick(option)}
            $isSelected={currentMenu === option}
          >
            {option}
          </Option>
        ))}
      </Menu>
    </SideMenuContainer>
  );
};

export default Sidemenu;

const SideMenuContainer = styled.div`
  width: 260px;
  min-height: inherit;
  border-right: 1px solid #e1e2e4;
  padding-top: 24px;
  background-color: white;
`;

const TroupeWrapper = styled.div`
  width: 260px;
  padding-bottom: 20px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 20px;
`;

const TopArea = styled.div`
  width: 212px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TroupeLogo = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: gray;
`;

const TroupeName = styled.div`
  font-weight: var(--font-semibold);
  font-size: 20px;
  letter-spacing: -1.2%;
  line-height: 140%;
  color: #000000;
`;

const UploadPostWrapper = styled.div`
  padding: 24px;
  border-top: 1px solid #e1e2e4;
  border-bottom: 1px solid #e1e2e4;
`;

const BtnText = styled.div`
  margin-left: 4px;
`;

const Menu = styled.div`
  height: 100%;
  margin-top: 24px;
  padding: 0 17px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Option = styled.div<{ $isSelected: boolean }>`
  width: 219px;
  height: 32px;
  padding: 0 7px;
  font-weight: var(--font-semibold);
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.57%;
  color: ${({ $isSelected }) => ($isSelected ? '#171719' : '#858688')};
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? '#eaeaea' : 'white')};
  display: flex;
  align-items: center;
  border-radius: 5px;
`;
