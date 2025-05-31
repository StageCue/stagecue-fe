import styled from 'styled-components';
import ChevronRightSVG from '@assets/icons/chevron_right.svg?react';
import Button from '@/components/buttons/button';
import DotMenuSvg from '@assets/icons/dotmenu.svg?react';
import { useEffect, useRef, useState } from 'react';
import ModalPortal from '@/components/modal/portal';
import Overlay from '@/components/modal/overlay';

interface ProfileProps {
  id: string | number;
  title: string;
  duration: string;
  birthday: string;
  dateCreated: string;
  height: number;
  weight: number;
  thumbnail: string;
  isDefault: boolean;
  handleRemoveProfile: (id: string | number) => void;
  handleProfileClick: () => void;
}

const Profile = ({
  id,
  title,
  duration,
  birthday,
  dateCreated,
  height,
  weight,
  thumbnail,
  isDefault,
  handleRemoveProfile,
  handleProfileClick,
}: ProfileProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenuId, setOpenMenuId] = useState<string | number | null>(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleOpenMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutSidClick = (event: MouseEvent) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target as Node)) {
        setOpenMenuId(null);
      }
    };

    window.addEventListener('mousedown', handleClickOutSidClick);
    return () => window.removeEventListener('mousedown', handleClickOutSidClick);
  }, []);

  return (
    <ProfileContainer>
      <PositionBox>
        <MenuContainer ref={menuRef}>
          <Button
            variation="text"
            btnClass="assistive"
            width={24}
            height={24}
            padding={'0px'}
            onClick={e => handleOpenMenu(e)}
          >
            <DotMenuSvg />
          </Button>
          {openMenuId && (
            <Menu>
              <Button
                type="button"
                variation="text"
                btnClass="assistive"
                width={79}
                height={28}
                padding="4px 6px"
                borderRadius={'5px'}
                fontSize={14}
                fontWeight="600"
                justifyContent="start"
                onClick={handleProfileClick}
              >
                수정
              </Button>
              <Button
                type="button"
                variation="text"
                btnClass="assistive"
                width={79}
                height={28}
                padding="4px 6px"
                borderRadius={'5px'}
                fontSize={14}
                fontWeight="600"
                justifyContent="start"
                onClick={() => setIsDeleteModal(true)}
              >
                삭제
              </Button>
            </Menu>
          )}
        </MenuContainer>
      </PositionBox>
      {isDefault && <DefaultProfileTag>기본프로필</DefaultProfileTag>}
      <ProfileWrapper>
        <ProfileImage src={thumbnail} />
        <ProfileSummary>
          <TitleWrapper>
            <Title>{title}</Title>
            <UpdatedDate>{dateCreated} 작성완료</UpdatedDate>
          </TitleWrapper>
          <SummaryWrapper>
            <ItemWrapper>
              <Property>경력</Property>
              <Value>{duration}</Value>
            </ItemWrapper>
            <ItemWrapper>
              <Property>생년월일</Property>
              <Value>{birthday} (30세)</Value>
            </ItemWrapper>
            <ItemWrapper>
              <Property>신체정보</Property>
              <Value>
                {height}cm/{weight}kg
              </Value>
            </ItemWrapper>
          </SummaryWrapper>
        </ProfileSummary>
        <ShowDetailBtn onClick={handleProfileClick}>
          <ChevronRightSVG />
        </ShowDetailBtn>
      </ProfileWrapper>
      {isDeleteModal && (
        <ModalPortal>
          <Overlay>
            <Modal>
              <ModalContent>
                <ContentTitle>프로필을 삭제할까요?</ContentTitle>
                <ContentSubTitle>삭제된 프로필은 복구가 불가능해요.</ContentSubTitle>
              </ModalContent>
              <Buttons>
                <Button
                  type="button"
                  variation="outlined"
                  btnClass="primary"
                  width={146}
                  height={48}
                  padding="12px 28px"
                  borderRadius={'10px'}
                  fontSize={16}
                  fontWeight="600"
                  onClick={() => setIsDeleteModal(false)}
                >
                  취소
                </Button>
                <Button
                  type="button"
                  variation="solid"
                  btnClass="primary"
                  width={146}
                  height={48}
                  padding="12px 28px"
                  borderRadius={'10px'}
                  fontSize={16}
                  fontWeight="600"
                  onClick={() => {
                    handleRemoveProfile(id);
                    setIsDeleteModal(false);
                  }}
                >
                  삭제
                </Button>
              </Buttons>
            </Modal>
          </Overlay>
        </ModalPortal>
      )}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  position: relative;
  width: 685px;
  min-height: 210px;
  border-radius: 12px;
  border: 1px solid #f4f4f5;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 9.7px;
`;

const PositionBox = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const MenuContainer = styled.div`
  position: relative;
`;

const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;

  width: 111px;
  height: fit-content;
  min-height: 88px;
  padding: 12px 16px;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: white;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08), 0px 1px 4px rgba(0, 0, 0, 0.08);
`;

const ProfileImage = styled.img`
  width: 128px;
  height: 170px;
  margin-right: 20px;
  border-radius: 4px;
`;

const ProfileSummary = styled.div`
  width: 457px;
`;

const UpdatedDate = styled.div`
  color: #37383c;
  font-size: 13px;
  line-height: 138.5%;
  letter-spacing: 1.94%;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  padding-bottom: 11px;
  border-bottom: 1px solid #f4f4f5;
  margin-bottom: 15px;
`;

const Title = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
`;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 0px;
`;

const ItemWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Property = styled.div`
  width: 54px;
  color: #989ba2;
  font-weight: var(--font-medium);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
`;

const Value = styled.div`
  font-weight: var(--font-semibold);
  font-size: 14px;
  letter-spacing: 1.45%;
  line-height: 142.9%;
  color: #171719;
`;

const ShowDetailBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
`;

const DefaultProfileTag = styled.div`
  width: 75px;
  height: 24px;
  background-color: #fbf2f2;
  color: #b82925;
  font-weight: var(--font-medium);
  font-size: 12px;
  line-height: 133.4%;
  letter-spacing: 2.52%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 9px;
`;

const ProfileWrapper = styled.div`
  display: flex;
`;

const Modal = styled.div`
  width: 340px;
  height: fit-content;
  min-height: 176px;
  border-radius: 16px;
  padding: 24px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: #ffffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.12);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContentTitle = styled.div`
  font-weight: var(--font-semibold);
  font-size: 20px;
  color: #171719ff;
  text-align: center;
`;

const ContentSubTitle = styled.div`
  font-weight: 400;
  font-size: 15px;
  color: #2e2f33e0;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
