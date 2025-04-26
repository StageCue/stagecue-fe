import { Application, ApplyStatus, BizApplicationQuery } from '@/pages/biz/types/applicants';

export interface RawApplication {
  result: {
    pagingParam: {
      number: number;
      size: number;
      key: number;
    };
    body: {
      id: number;
      profileId: number;
      userName: string;
      userGender: 'MALE' | 'FEMALE';
      age: number;
      recruitTitle: string;
      applyDate: string;
      isFavorite: boolean;
      applyStatus: ApplyStatus;
    }[];
    isLastPage: boolean;
  };
}

export const toViewApplicationList = (apiData: RawApplication): BizApplicationQuery => {
  const applications: Application[] = apiData.result.body.map(item => ({
    applyId: item.id,
    profileId: item.profileId,
    performerName: item.userName,
    gender: item.userGender,
    age: item.age,
    recruitTitle: item.recruitTitle,
    applyDate: item.applyDate,
    isFavorite: item.isFavorite,
    recruitId: 0,
    applyStatus: item.applyStatus,
  }));

  return {
    totalCount: applications.length,
    applications,
  };
};
