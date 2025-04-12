/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import NewPost from './components/newPost';
import ThemePost from './components/themePost';
import PopularPost from './components/popularPost';
import RecommendRecruit from './components/recommendRecruit';
import StageCue from './components/stageCue';
import AdsSlide from './components/adsSlide';

import { requestCasts, requestCastsDetailList } from '@/api/cast';
import { requestRecommendRecruits } from '@/api/recommendRecruits';
import { requestNotices } from '@/api/notice';
import { requestBanners } from '@/api/ads';
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
      locations: '',
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

    setBanners(banners);
  };

  const getNewestCasts = async () => {
    const { recruits } = await requestCasts({
      limit: '10',
      offset: '0',
      orderBy: 'newest',
    });

    setNewestRecruits(recruits);
  };

  const getPopularCasts = async () => {
    const { recruits } = await requestCastsDetailList({
      limit: '5',
      offset: '0',
    });

    setPopularRecruits(recruits);
  };

  const getNotices = async () => {
    const { content: notices } = await requestNotices({ limit: 6, offset: 0 });

    setNotices(notices);
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
