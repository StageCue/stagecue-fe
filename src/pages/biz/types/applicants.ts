export interface BizApplicationQuery {
  totalCount: number;
  applications: Application[];
}
export interface Application {
  applyId: number;
  profileId: number;
  recruitId: number;
  isFavorite: boolean;
  performerName: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  recruitTitle: string;
  applyDate: string;
  applyStatus: ApplyStatus;
}

export type ApplyStatus =
  | 'APPLY' // 지원완료
  | 'OPEN' // 열람
  | 'PASS' // 서류통과
  | 'WIN' // 합격
  | 'LOSE' // 불합격
  | 'CANCELED'; // 지원취소

export type ApplyFilter = 'APPLY' | 'OPEN' | 'PASS' | 'WIN' | 'LOSE' | 'CANCELED' | '전체';

export type PassType = Extract<ApplyStatus, 'PASS' | 'WIN'>;

export type DecisionType = Extract<ApplyStatus, 'PASS' | 'WIN' | 'LOSE'>;
export const decisionLabelMap: Record<DecisionType, string> = {
  PASS: '서류합격',
  WIN: '최종합격',
  LOSE: '불합격',
};

export type RecruitStatus = 'DRAFT' | 'OPEN' | 'CLOSED';
