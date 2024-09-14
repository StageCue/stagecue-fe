import { useState } from "react";
import styled from "styled-components";
import ChevronDownSVG from "../../assets/icons/chevron_down.svg?react";

type genreType = "연극" | "뮤지컬" | "댄스";

const Home = () => {
  const [selectedGenre, setSelectedGenre] = useState<genreType>("연극");
  const [isGenreMenuShowing, setIsGenreMenuShowing] = useState<boolean>(true);
  const genreOptions = ["연극", "뮤지컬", "댄스"];

  const handleOptionChange = (genre: genreType) => {
    setSelectedGenre(genre);
  };
  return (
    <HomeContainer>
      <GenreWrapper>
        <SelectedGenre>{selectedGenre}</SelectedGenre>
        <SelectButton>
          <ChevronDownSVG />
        </SelectButton>
        <GenreMenu $isShowing={isGenreMenuShowing}>
          {genreOptions.map(({ option }) => (
            <Option
              key={option}
              onClick={(option) => handleOptionChange(option)}
            >
              {option}
            </Option>
          ))}
        </GenreMenu>
      </GenreWrapper>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 260px 100px 260px;
`;

const GenreWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const SelectButton = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #e1e2e4;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectedGenre = styled.div`
  color: #000000;
  font-weight: var(--font-bold);
  font-size: 32px;
  line-height: 133.4%;
  letter-spacing: -2.7%;
`;

const GenreMenu = styled.div<{ $isShowing: boolean }>`
  position: absolute;
  visibility: ;
`;

const Option = styled.div``;
