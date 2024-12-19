import styled from "styled-components";
import NewPost from "./components/newPost";
import ThemePost from "./components/themePost";
import PopularPost from "./components/popularPost";
import { useEffect, useState } from "react";
import { requestCasts, requestCastsDetailList } from "@/api/cast";
import AdsSlide from "./components/adsSlide";
import StageCue from "./components/stageCue";
import { requestNotices } from "@/api/notice";
import { requestBanners } from "@/api/ads";

const Home = () => {
  const [newestCasts, setNewestCasts] = useState([]);
  const [popularCasts, setPopularCast] = useState([]);
  const [notices, setNotices] = useState([]);
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    const { banners } = await requestBanners();

    setBanners(banners);
  };

  const getNewestCasts = async () => {
    const { recruits } = await requestCasts({
      limit: "10",
      offset: "0",
      orderBy: "newest",
    });

    setNewestCasts(recruits);
  };

  const getPopularCasts = async () => {
    const { recruits } = await requestCastsDetailList({
      limit: "5",
      offset: "0",
    });

    setPopularCast(recruits);
  };

  const getNotices = async () => {
    const { items } = await requestNotices();

    setNotices(items);
  };

  useEffect(() => {
    getBanners();
    getNewestCasts();
    getPopularCasts();
    getNotices();
  }, []);

  return (
    <HomeContainer>
      <AdsSlide banners={banners} />
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
  width: 1440px;
`;
