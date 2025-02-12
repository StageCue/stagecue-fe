/* eslint-disable @typescript-eslint/no-unused-vars */
import { requestCasts } from "@/api/cast";
import Cast from "@/pages/home/components/cast";
import useSearchStore from "@/store/search";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import NoResult from "./noResult";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const Search = () => {
  const { query } = useSearchStore();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [currentFilter, _] = useState("공고");

  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["results"],
      queryFn: ({ pageParam = 0 }) =>
        requestCasts({ offset: `${pageParam}`, limit: "16", query }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const totalLoaded = allPages.flatMap((page) => page.data).length;
        if (totalLoaded >= lastPage.totalCount) {
          return undefined;
        }
        return allPages.length;
      },
    });

  const results = useMemo(
    () => data?.pages.flatMap((page) => page.recruits) || [],
    [data]
  );

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["results"] });
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 1.0,
      }
    );
    const target = loadMoreRef.current;
    if (target) {
      observer.observe(target);
    }
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SearchContainer>
      <FilterWrapper>
        <Filter
          $isSelected={currentFilter === "공고"}
        >{`공고(${results.length})`}</Filter>
      </FilterWrapper>
      {results.length > 0 ? (
        <CastGrid>
          {results?.map(
            ({
              recruitId,
              recruitTitle,
              artworkName,
              practiceLocation,
              isScrapping,
              thumbnail,
            }) => (
              <Cast
                recruitId={recruitId}
                recruitTitle={recruitTitle}
                artworkName={artworkName}
                practiceLocation={practiceLocation}
                isScrapping={isScrapping}
                thumbnail={thumbnail}
              />
            )
          )}
        </CastGrid>
      ) : (
        <NoResult />
      )}
      <div ref={loadMoreRef} />
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  width: 920px;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 260px 100px 260px;
`;

const FilterWrapper = styled.div`
  width: 920px;
  height: 56px;
  border-bottom: 2px solid #eaebec;
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
`;

const Filter = styled.div<{ $isSelected: boolean }>`
  width: 70px;
  height: 56px;
  padding: 16px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ $isSelected }) =>
    $isSelected ? "2px solid #000000" : "none"};
  font-size: 17px;
  line-height: 141.2%;
  font-weight: var(--font-semibold);
  letter-spacing: 0%;
  color: ${({ $isSelected }) => ($isSelected ? "#171719" : "#c7c7c8")};
  cursor: pointer;
`;

const CastGrid = styled.div`
  display: grid;
  width: 920px;
  row-gap: 40px;
  column-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
`;
