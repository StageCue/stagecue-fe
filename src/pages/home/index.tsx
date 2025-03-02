/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import NewPost from './components/newPost';
import ThemePost from './components/themePost';
import PopularPost from './components/popularPost';
import { useEffect, useState } from 'react';
import { requestCasts, requestCastsDetailList } from '@/api/cast';
import AdsSlide from './components/adsSlide';
import StageCue from './components/stageCue';
import { requestNotices } from '@/api/notice';
import { requestBanners } from '@/api/ads';
import { requestRecommendRecruits } from '@/api/recommendRecruits';
import RecommendRecruit from './components/recommendRecruit';
import useSessionStore from '@/store/session';

const Home = () => {
  const { isLoggined } = useSessionStore();

  const [recommendRecruits, setRecommendRecruits] = useState([]);
  const [newestRecruits, setNewestRecruits] = useState([]);
  const [popularRecruits, setPopularRecruits] = useState([]);
  const [notices, setNotices] = useState([]);
  const [banners, setBanners] = useState([]);

  const getRecommendRecruits = async () => {
    const { recommendRecruits } = await requestRecommendRecruits({
      limit: '5',
      offset: '0',
      orderBy: 'popular',
    });

    setRecommendRecruits(
      recommendRecruits ?? [
        {
          id: 1,
          title: 'Slide 1',
          description: '추가 내용 1',
          imageURL:
            'https://s3-alpha-sig.figma.com/img/6097/c856/acbbe48ca76176374f2533235c7f6848?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iSkE6e3SJoKe0WWUm7P20TutjYTDflnCiUsuzFOalOAJPrfV-uM7koQXaYsORkSrkuIZaNdCgxFI3waEKWBJgqzSV9M7O3aTO~atfrKlxvGI4bN2AvWB1U1tJpUcF3e9lQfaFRlYq6X5DDftvuOsHkMW6xUiyMKmflr8eeZqBO63hbRgCGI8ZMkhuYjhxKgMCBGmNIyn~MIaFgp1xNsSjjKlSZWPzAxJT8CHWeoE6XP6mWuhftpcKLcqBvYd0i6ZojOIAqA1fBYuP0InRUx5PxecgLsnn5f189enaiel6s9bbsudusEPmRC1taMtClWdtTE88nWx3SI8LSfhVQ1jdg__',
        },
        { id: 2, title: 'Slide 2', description: '추가 내용 2', imageURL: '' },
        { id: 3, title: 'Slide 3', description: '추가 내용 3', imageURL: '' },
        { id: 4, title: 'Slide 4', description: '추가 내용 4', imageURL: '' },
        { id: 5, title: 'Slide 5', description: '추가 내용 5', imageURL: '' },
      ]
    );
  };

  const getBanners = async () => {
    const { banners } = await requestBanners();

    const test: any = Array.from({ length: 10 }).map(() => banners[0]);

    setBanners(test);
  };

  const getNewestCasts = async () => {
    const { recruits } = await requestCasts({
      limit: '10',
      offset: '0',
      orderBy: 'newest',
    });

    const test: any = Array.from({ length: 20 }).map(() => recruits[0]);

    setNewestRecruits(test);
  };

  const getPopularCasts = async () => {
    const { recruits } = await requestCastsDetailList({
      limit: '5',
      offset: '0',
    });

    setPopularRecruits(recruits);
  };

  const getNotices = async () => {
    const { items } = await requestNotices({ limit: 6, offset: 0 });

    const test: any = Array.from({ length: 10 }).map(() => items[0]);

    setNotices(test);
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
  width: 1440px;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 189.5px 100px 189.5px;
`;
