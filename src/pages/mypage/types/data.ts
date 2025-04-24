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
  castId: string;
  castTitle: string;
  imageUrl: string;
  troupeName: string;
  isBookmarked: boolean;
  practiceAddress: string;
  dateExpired: string;
  dday: number;
}

export interface Recruit {
  recruitId: string;
  thumbnail: string;
  recruitTitle: string;
  artworkName: string;
  troupeName: string;
  practiceLocation: string;
}
