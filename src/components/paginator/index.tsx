import styled from "styled-components";
import PrevSVG from "@assets/icons/pg_caret_prev.svg?react";
import NextSVG from "@assets/icons/pg_caret_next.svg?react";

interface PaginatorProps {
  page: number;
  totalCounts: number;
  itemsPerPage: number;
  pageGroupSize: number;
  onChangePage: (page: number) => void;
}

const Paginator = ({
  page,
  totalCounts,
  itemsPerPage,
  pageGroupSize,
  onChangePage,
}: PaginatorProps) => {
  const totalPages = Math.ceil(totalCounts / itemsPerPage);

  const calculatePageNumbers = () => {
    const startPage = Math.floor(page / pageGroupSize) * pageGroupSize;
    const endPage = Math.min(startPage + pageGroupSize - 1, totalPages - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = calculatePageNumbers();

  return (
    <PaginatorContainer>
      <PgBtnWrapper onClick={() => page > 0 && onChangePage(page - 1)}>
        <PrevSVG />
      </PgBtnWrapper>
      {pageNumbers?.map((number) => (
        <PgNumber
          key={number}
          onClick={() => onChangePage(number)}
          $isCurrent={number === page}
        >
          {number + 1}
        </PgNumber>
      ))}
      <PgBtnWrapper>
        <NextSVG
          onClick={() => !(page === totalPages - 1) && onChangePage(page + 1)}
        />
      </PgBtnWrapper>
    </PaginatorContainer>
  );
};

export default Paginator;

const PaginatorContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

const PgBtnWrapper = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const PgNumber = styled.div<{ $isCurrent: boolean }>`
  width: 24px;
  height: 24px;
  color: ${({ $isCurrent }) => ($isCurrent ? "#B81715" : "#858688")};
  background-color: ${({ $isCurrent }) => ($isCurrent ? "#f5e3e3" : "none")};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
