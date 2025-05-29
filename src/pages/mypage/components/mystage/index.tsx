import styled from 'styled-components';
import NoScrappedSVG from '@assets/images/noscrappedd.svg?react';
import BookmarkSVG from '@assets/icons/bookmark.svg';
import BookmarkFilledSVG from '@assets/icons/bookmark_filled.svg';
import Button from '@/components/buttons/button';
import Cast from '@/pages/home/components/cast';

import { useNavigate } from 'react-router-dom';
import { Recruit } from '../../types/data';

import EmptyWrapper from '@/components/emptyWrapper';
import { useMyStageData } from '../../hooks/useMyStageData.ts';

const MyStage = () => {
  const { recruitsStatus, popularRecruits, scraps, handleBookmarkClick } = useMyStageData();
  const navigate = useNavigate();

  const getStatusCount = (status: string) => {
    return recruitsStatus?.result?.find(item => item.applyStatus === status)?.count ?? 0;
  };

  const handleShowAllClick = () => {
    navigate('/casts', {
      state: { orderBy: 'popular' },
    });
  };

  return (
    <MyStageWrapper>
      <MyStageStatus>
        <ItemTitleWrapper>
          <ItemTitle>My Stage</ItemTitle>
        </ItemTitleWrapper>
        <Dashboard>
          <MyStageItem>
            <ItemName>지원 완료</ItemName>
            <Value>{getStatusCount('APPLY')}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>서류 통과</ItemName>
            <Value>{getStatusCount('PASS')}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>최종 합격</ItemName>
            <Value>{getStatusCount('WIN')}</Value>
          </MyStageItem>
          <Divider />
          <MyStageItem>
            <ItemName>불합격</ItemName>
            <Value>{getStatusCount('LOSE')}</Value>
          </MyStageItem>
        </Dashboard>
      </MyStageStatus>
      <ScrappedPost>
        <ItemTitleWrapper>
          <ItemTitle>스크랩한 공고</ItemTitle>
        </ItemTitleWrapper>
        {scraps?.length === 0 ? (
          <NoSavedPost>
            <NoScrappedSVG />
            <TextWrapper>
              <Text>아직 스크랩한 공고가 없어요.</Text>
              <SubText>관심있는 공고를 스크랩 해보세요!</SubText>
            </TextWrapper>
            <Button
              variation="solid"
              btnClass="primary"
              width={296}
              onClick={() => navigate('/casts')}
            >
              공고 찾아보기
            </Button>
          </NoSavedPost>
        ) : (
          <Scraps>
            {scraps?.map(scrap => {
              return (
                <CastWrapper key={scrap?.castId}>
                  <Cast
                    imgWidth={215}
                    imgHeight={322.5}
                    recruitId={scrap?.castId}
                    thumbnail={scrap?.imageUrl}
                    recruitTitle={scrap?.castTitle}
                    troupeName={scrap?.troupeName}
                    practiceLocation={scrap?.practiceAddress}
                  />
                  <DdayTag>D{scrap?.dday}</DdayTag>
                  <BookmarkWrapper
                    key={`bookmark-${scrap?.castId}`}
                    onClick={() => handleBookmarkClick(scrap?.castId)}
                  >
                    <img
                      src={scrap?.isBookmarked ? BookmarkFilledSVG : BookmarkSVG}
                      alt="Bookmark"
                    />
                  </BookmarkWrapper>
                </CastWrapper>
              );
            })}
          </Scraps>
        )}
      </ScrappedPost>
      {scraps?.length === 0 && (
        <PopularPost>
          <ItemTitleWrapper>
            <ItemTitle>이번주 인기공고</ItemTitle>
            <ShowAll onClick={handleShowAllClick}>전체보기</ShowAll>
          </ItemTitleWrapper>
          <Casts>
            {popularRecruits?.length > 0 ? (
              popularRecruits?.map(
                ({ recruitId, shortAddress, title, imageUrl, troupeName }: Recruit) => (
                  <Cast
                    key={recruitId}
                    imgWidth={215}
                    imgHeight={322.5}
                    recruitId={recruitId}
                    thumbnail={imageUrl}
                    recruitTitle={title}
                    troupeName={troupeName}
                    practiceLocation={shortAddress}
                  />
                )
              )
            ) : (
              <EmptyWrapper width={685} height={432.5}>
                인기 공고가 없습니다.
              </EmptyWrapper>
            )}
          </Casts>
        </PopularPost>
      )}
    </MyStageWrapper>
  );
};

export default MyStage;

const MyStageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ItemTitle = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
`;

const MyStageStatus = styled.div``;

const Dashboard = styled.div`
  width: 685px;
  height: 120px;
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #eaebec;
  border-radius: 12px;
`;

const MyStageItem = styled.div`
  width: 147.25px;
  height: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const ItemName = styled.div`
  font-size: 18px;
  font-weight: var(--font-regualr);
  line-height: 144.5%;
  letter-spacing: -0.02%;
`;

const Value = styled.div`
  font-size: 22px;
  font-weight: var(--font-semibold);
  line-height: 136.4%;
  letter-spacing: -1.94%;
`;

const Divider = styled.div`
  width: 1px;
  height: 96px;
  background-color: #f3f3f3;
  margin: 0px 12px;
`;

const ScrappedPost = styled.div``;

const NoSavedPost = styled.div`
  width: 685px;
  height: 248px;
  padding: 28px 0;
  background-color: #f7f7f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Text = styled.div`
  font-weight: var(--font-semibold);
  font-size: 18px;
  letter-spacing: -0.02%;
  line-height: 144.5%;
`;

const SubText = styled.div`
  font-weight: var(--font-regular);
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
`;

const PopularPost = styled.div``;

const ItemTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ShowAll = styled.div`
  font-size: 16px;
  letter-spacing: 0.57%;
  line-height: 162.5%;
  color: 171719;
  font-weight: var(--font-medium);
  cursor: pointer;
`;

const Casts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  row-gap: 40px;
`;

const Scraps = styled.div`
  display: flex;
  gap: 20px;
`;

const CastWrapper = styled.div`
  position: relative;
`;

const DdayTag = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #ff4242;
  color: #fff;
  padding: 5px 8px;
  border-radius: 4px;
  font-size: 15px;
`;

const BookmarkWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  top: 3px;
  right: 3px;
`;
