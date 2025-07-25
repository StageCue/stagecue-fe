/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import NewPost from './components/newPost';
import ThemePost from './components/themePost';
import PopularPost from './components/popularPost';
import RecommendRecruit from './components/recommendRecruit';
import StageCue from './components/stageCue';
import AdsSlide from './components/adsSlide';

import { requestCasts, requestPopularCasts } from '@/api/cast';
import { requestRecommendRecruits } from '@/api/recommendRecruits';
import { requestNotices } from '@/api/notice';
import { requestBanners } from '@/api/ads';
import { PopularRecruitDetail } from './components/popularPost';
import useSessionStore from '@/store/session';

const Home = () => {
  const { isLoggined } = useSessionStore();

  const [recommendRecruits, setRecommendRecruits] = useState([]);
  const [newestRecruits, setNewestRecruits] = useState<PopularRecruitDetail[]>([]);
  const [popularRecruits, setPopularRecruits] = useState<PopularRecruitDetail[]>([]);
  const [notices, setNotices] = useState([]);
  const [banners, setBanners] = useState([]);

  const getRecommendRecruits = async () => {
    const { result: recommendRecruits } = await requestRecommendRecruits();

    setRecommendRecruits(recommendRecruits);
  };

  const getBanners = async () => {
    const banners = await requestBanners();

    setBanners(banners);
  };

  const getNewestCasts = async () => {
    const newRecruits: PopularRecruitDetail[] = (
      await Promise.all(
        [
          requestCasts({
            size: 5,
            category: 'THEATER',
            sort: 'RECENT',
          }),
          requestCasts({
            size: 5,
            category: 'DANCE',
            sort: 'RECENT',
          }),
          requestCasts({
            size: 5,
            category: 'MUSICAL',
            sort: 'RECENT',
          }),
        ].map(async request => {
          const { result } = await request;
          return result?.body;
        })
      )
    ).flatMap(item => item);

    setNewestRecruits(newRecruits);
  };

  const getPopularCasts = async () => {
    const popularRecruits: PopularRecruitDetail[] = (
      await Promise.all(
        [
          requestPopularCasts({
            size: 5,
            category: 'THEATER',
            sort: 'VIEW',
          }),
          requestPopularCasts({
            size: 5,
            category: 'DANCE',
            sort: 'VIEW',
          }),
          requestPopularCasts({
            size: 5,
            category: 'MUSICAL',
            sort: 'VIEW',
          }),
        ].map(async request => {
          const { result } = await request;
          return result?.body;
        })
      )
    ).flatMap(item => item);

    setPopularRecruits(popularRecruits);
  };

  const getNotices = async () => {
    const { result } = await requestNotices({ number: 0, size: 6 });

    setNotices(result?.body);
  };

  useEffect(() => {
    if (isLoggined) {
      getRecommendRecruits();
    }
    getBanners();
    getNewestCasts();
    getPopularCasts();
    getNotices();
  }, []);

  return (
    <HomeContainer>
      {isLoggined && <RecommendRecruit recommendRecruits={recommendRecruits} />}
      <AdsSlide banners={banners} />
      <NewPost recruits={newestRecruits} />
      <ThemePost />
      <PopularPost recruits={popularRecruits} />
      <StageCue notices={notices} />
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0 100px 0;
`;
