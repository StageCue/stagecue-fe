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
  applyStatus: string;
}

export type ApplyStatus = 'APPLIED' | 'DOCUMENT_PASSED' | 'FINAL_ACCEPTED' | 'REJECTED' | 'CANCEL';

export type PassType = 'DOCUMENT_PASSED' | 'FINAL_ACCEPTED';
