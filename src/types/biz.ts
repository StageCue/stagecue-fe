export const CATEGORY: Record<string, string> = {
  THEATER: '연극',
  MUSICAL: '뮤지컬',
  DANCE: '댄스',
};

export const RecruitStatus = {
  TEMP: '임시저장',
  RECRUIT: '모집중',
  CLOSED: '모집종료',
} as const;

export interface Recruit {
  id: number;
  isFavorite: boolean;
  title: string;
  applyCount: number;
  status: keyof typeof RecruitStatus;
  recruitEnd: string;
}
