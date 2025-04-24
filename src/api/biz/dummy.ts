import { RawApplication } from '../adapters/applies';

export const dummy: RawApplication = {
  result: {
    pagingParam: {
      number: 1,
      size: 10,
      key: 123,
    },
    body: [
      {
        id: 101,
        profileId: 501,
        userName: '김민지',
        userGender: 'FEMALE',
        age: 27,
        recruitTitle: '뮤지컬 배우 모집',
        applyDate: '2025-04-24',
        isFavorite: true,
      },
      {
        id: 102,
        profileId: 502,
        userName: '이준호',
        userGender: 'MALE',
        age: 30,
        recruitTitle: '무용수 오디션',
        applyDate: '2025-04-23',
        isFavorite: false,
      },
      {
        id: 103,
        profileId: 503,
        userName: '박서윤',
        userGender: 'FEMALE',
        age: 25,
        recruitTitle: '연극 조연 출연자 모집',
        applyDate: '2025-04-22',
        isFavorite: true,
      },
    ],
    isLastPage: false,
  },
};
