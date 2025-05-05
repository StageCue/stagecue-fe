export type Gender = 'MALE' | 'FEMALE';
export type Sort = 'AGE' | 'NAME' | 'APPLY_DATE';
export type RecruitStatus = keyof typeof RecruitStatusLabel;

export const CATEGORY: Record<string, string> = {
  THEATER: '연극',
  MUSICAL: '뮤지컬',
  DANCE: '댄스',
};

export const RecruitStatusLabel = {
  DRAFT: '임시저장',
  OPEN: '모집중',
  CLOSED: '모집종료',
} as const;

export interface Recruit {
  id: number;
  isFavorite: boolean;
  title: string;
  applyCount: number;
  recruitStatus: keyof typeof RecruitStatusLabel;
  recruitEndDate: string;
}
