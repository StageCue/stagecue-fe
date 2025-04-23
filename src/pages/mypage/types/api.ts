import { Apply } from './data';
export interface AppliedCastsResponse {
  result: {
    body: Apply[];
    pagingParam: PagingParam;
    isLastPage: boolean;
  };
}

interface PagingParam {
  number: number;
  size: number;
  key: number;
}
