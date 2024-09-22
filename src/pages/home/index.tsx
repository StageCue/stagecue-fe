import styled from "styled-components";
import NewPost from "./components/newPost";
import ThemePost from "./components/themePost";
import PopularPost from "./components/popularPost";
import { useEffect, useState } from "react";
import { requestCasts } from "@/api/cast";
import AdsSlide from "./components/adsSlide";
import StageCue from "./components/stageCue";
import { requestNotices } from "@/api/notice";

const Home = () => {
  const [newestCasts, setNewestCasts] = useState([]);
  const [popularCasts, setPopularCast] = useState([]);
  const [notices, setNotices] = useState([]);

  const getNewestCasts = async () => {
    const { casts } = await requestCasts({
      limit: "10",
      offset: "0",
      orderBy: "newest",
    });

    setNewestCasts(casts);
  };

  const getPopularCasts = async () => {
    const { casts } = await requestCasts({
      limit: "10",
      offset: "0",
      orderBy: "popular",
    });

    setPopularCast(casts);
  };

  const getNotices = async () => {
    const { notices } = await requestNotices();

    setNotices(notices);
  };

  useEffect(() => {
    getNewestCasts();
    getPopularCasts();
    getNotices();
  }, []);

  return (
    <HomeContainer>
      <SlideWrapper>
        <AdsSlide />
      </SlideWrapper>
      <NewPost casts={newestCasts} />
      <ThemePost />
      <PopularPost casts={popularCasts} />
      <StageCue notices={notices} />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 1440px;
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
