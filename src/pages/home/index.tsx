import styled from "styled-components";
import Slide from "./components/slide";
import NewPost from "./components/newPost";
import ThemePost from "./components/themePost";
import PopularPost from "./components/popularPost";

const Home = () => {
  return (
    <HomeContainer>
      <SlideWrapper>
        <Slide />
      </SlideWrapper>
      <NewPost />
      <ThemePost />
      <PopularPost />
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
  padding: 24px 189.5px 100px 189.5px;
`;

const SlideWrapper = styled.div`
  width: 190vw;

  margin: 24px 0;
`;
