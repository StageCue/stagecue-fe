import { ApplyStatus } from '@/pages/biz/types/applicants';

export interface ApplyStatusLog {
  applyStatus: ApplyStatus;
  historyAt: string;
}

export interface Apply {
  applyId: number;
  recruitTitle: string;
  recruitCategory:
    | 'THEATRE'
    | 'MUSICAL'
    | 'MOVIE'
    | 'DANCE'
    | 'PERFORMANCE'
    | 'TVSHOW'
    | 'SNS'
    | 'SINGER'
    | 'MODEL';
  troupeName: string;
  applyStatus: ApplyStatus;
  applyStatusLogs: ApplyStatusLog[];
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
