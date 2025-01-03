import { requestCasts } from "@/api/cast";
import Cast from "@/pages/home/components/cast";
import useSearchStore from "@/store/search";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NoResult from "./noResult";

const Search = () => {
  const { query } = useSearchStore();

  const [currentFilter, _] = useState("공고");
  const [results, setResults] = useState([]);

  const getResults = async () => {
    const res = await requestCasts({
      offset: "0",
      limit: "16",
      query,
    });

    setResults(res.recruits);
  };

  useEffect(() => {
    getResults();
  }, [query]);

  return (
    <SearchContainer>
      <FilterWrapper>
        <Filter $isSelected={currentFilter === "공고"}>공고(0)</Filter>
      </FilterWrapper>
      {results ? (
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
