import { requestNoticeDetail, requestNotices } from '@/api/notice';
import { useState } from 'react';
import styled from 'styled-components';
import CaretUpSVG from '@assets/icons/notice_caret_up.svg?react';
import CaretDownSVG from '@assets/icons/notice_caret_down.svg?react';
import CaretLeftSVG from '@assets/icons/notice_caret_left.svg?react';
import CaretRightSVG from '@assets/icons/notice_caret_right.svg?react';
import { useQuery } from '@tanstack/react-query';

interface Notice {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface NoticeQuery {
  total: number;
  items: Notice[];
}

const Notice = () => {
  const [page, setPage] = useState(0);
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [contents, setContents] = useState<string | null>(null);

  const pageGroupSize = 5;
  const itemsPerPage = 10;

  const { data } = useQuery<NoticeQuery>({
    queryKey: ['notices', page],
    queryFn: () => requestNotices({ limit: 10, offset: page * itemsPerPage }),
  });

  const totalCounts = data?.total || 0;
  const totalPages = Math.ceil(totalCounts / itemsPerPage);

  const calculatePageNumbers = () => {
    const startPage = Math.floor(page / pageGroupSize) * 5;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = calculatePageNumbers();

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
    setOpenPostId(null);
    setContents(null);
  };

  const getContents = async (id: number) => {
    const res = await requestNoticeDetail(id);
    setContents(res?.content);
  };

  const handlePostClick = async (id: number) => {
    if (id === openPostId) {
      setOpenPostId(null);
      setContents(null);
    } else {
      await getContents(id);
      setOpenPostId(id);
    }
  };

  return (
    <NoticeContainer>
      <Title>공지사항</Title>
      <List>
        {data?.items?.map(post => (
          <PostItem key={post?.id}>
            <Post onClick={() => handlePostClick(post.id)}>
              <LeftSideWrapper>
                <Tag>공지사항</Tag>
                <PostTitle>{post.title}</PostTitle>
              </LeftSideWrapper>
              <RightSideWrapper>
                <Date>{post.createdAt}</Date>
                {post.id === openPostId ? <CaretUpSVG /> : <CaretDownSVG />}
              </RightSideWrapper>
            </Post>
            {post?.id === openPostId && <Contents>{contents}</Contents>}
          </PostItem>
        ))}
      </List>
      <Paginator>
        <PgBtnWrapper $isActive={page > 0} onClick={() => page > 0 && handlePageClick(page - 1)}>
          <CaretLeftSVG />
        </PgBtnWrapper>
        <PageNumbers>
          {pageNumbers?.map(number => (
            <PgNumber
              key={number}
              onClick={() => handlePageClick(number)}
              $isCurrent={number === page}
            >
              {number + 1}
            </PgNumber>
          ))}
        </PageNumbers>
        <PgBtnWrapper
          $isActive={!(page === totalPages - 1)}
          onClick={() => !(page === totalPages - 1) && handlePageClick(page + 1)}
        >
          <CaretRightSVG />
        </PgBtnWrapper>
      </Paginator>
    </NoticeContainer>
  );
};

export default Notice;

const NoticeContainer = styled.div`
  width: 920px;
  margin-top: 60px;
`;

const Title = styled.div`
  margin-bottom: 32px;
  color: #000000;
  font-weight: var(--font-bold);
  font-size: 24px;
  letter-spacing: -2.3%;
  line-height: 133.4%;
`;

const List = styled.div`
  width: 920px;
  border-top: 1px solid #e8e9ea;
`;

const PostItem = styled.div``;

const Post = styled.div`
  width: 100%;
  height: 56px;
  padding: 16px;
  border-bottom: 1px solid #e8e9ea;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const Tag = styled.div`
  width: 62px;
  height: 24px;
  padding: 4px 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e9ea;
  border-radius: 4px;
  font-size: 12px;
  font-weight: var(--font-medium);
  color: #000000;
  line-height: 133.4%;
  letter-spacing: 2.52%;
`;

const PostTitle = styled.div`
  font-size: 15px;
  letter-spacing: 0.96%;
  line-height: 146.7%;
  font-size: var(--font-medium);
`;

const Paginator = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 66px;
`;

const PgBtnWrapper = styled.div<{ $isActive: boolean }>`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  border: 1px solid #858688;
  align-items: center;

  rect {
    fillopacity: ${({ $isActive }) => $isActive && '1'};
  }
`;

const PgNumber = styled.div<{ $isCurrent: boolean }>`
  width: 32px;
  height: 32px;
  color: ${({ $isCurrent }) => ($isCurrent ? '#171719' : '#858688')};
  background-color: ${({ $isCurrent }) => ($isCurrent ? '#EAEAEA' : 'none')};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Contents = styled.div`
  width: 880px;
  background-color: #f7f7f8;
  padding: 16px 87px;
  color: #828285;
  line-height: 142.9%;
  letter-spacing: 1.45%;
  font-size: 14px;
`;

const LeftSideWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const RightSideWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Date = styled.div`
  color: #989ba2;
  font-size: 13px;
  letter-spacing: 1.94%;
  line-height: 138.5%;
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 4px;
  margin-left: 16px;
  margin-right: 16px;
  align-items: center;
`;
