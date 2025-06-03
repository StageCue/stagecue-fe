import { ApplyStatus } from '@/pages/biz/types/applicants';

export interface ApplyHistories {
  applyStatus: ApplyStatus;
  changeDate: string;
}

export interface Apply {
  applyId: number;
  recruitTitle: string;
  recruitCategory?: 'THEATER' | 'MUSICAL' | 'DANCE';
  troupeName: string;
  status: ApplyStatus;
  histories: ApplyHistories[];
}

export interface Scrap {
  castId: string | number;
  castTitle: string;
  imageUrl: string;
  troupeName: string;
  isBookmarked: boolean;
  practiceAddress: string;
  dateExpired: string;
  dday: number | string;
}

export interface Recruit {
  imageUrl: string;
  isScrap: boolean;
  recruitId: number;
  shortAddress: string;
  title: string;
  troupeName: string;
}
