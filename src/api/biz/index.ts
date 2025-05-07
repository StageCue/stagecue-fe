import { EditTroupeInputs } from '@/pages/biz/components/manageTroupe/components/editTroupe/hooks/useEditTroupe';
import request from '..';
import { toApiPostTroupe, toViewTroupe, toViewTroupePreview } from '../adapters/troupe';
import { ApplyStatus } from '@/pages/biz/types/applicants';
import { toViewApplicationList } from '../adapters/applies';
import { BizRecruitQuery } from '@/pages/biz/components/managePost/hooks/useGetPost';
import { Gender, RecruitStatus, Sort } from '@/types/biz';
import { PostSortType } from '@/pages/biz/components/managePost/components/context';

interface ReqChangingApplyState {
  applyIds: string;
  applyStatus: 'PASS' | 'WIN' | 'CANCELED';
}

interface ReqAppliesParams {
  number: number;
  size?: number;
  key?: number;
  gender?: Gender;
  sort?: Sort;
  sortDirection?: 'ASC' | 'DESC';
  term?: string;
  appplyStatus?: ApplyStatus;
  isFavorite?: boolean;
}

export interface ReqRecruitsParams {
  number: number;
  size?: number;
  key?: number;
  sort?: PostSortType;
  sortDirection?: 'ASC' | 'DESC';
  isFavorite?: boolean;
  recruitStatus?: RecruitStatus | null;
  search?: string;
}

export interface ReqEditRecruitParams {
  title: string;
  recruitIntroduce: string;
  recruitStartDate?: string;
  recruitEndDate: string;
  recruitingParts: string[];
  monthlyFee: number;
  artworkName: string;
  recruitCategory: string;
  recruitStatus: RecruitStatus;
  recruitImages?: string[];
  theatreAddress: string;
  theatreAddressDetail: string;
  theatreStartDate: string;
  theatreEndDate: string;
  practiceAddress: string;
  practiceAddressDetail: string;
  practiceStartDate: string;
  practiceEndDate: string;
  practiceDay: string[];
}

interface ReqDeleteRecruitsBody {
  applyIds: number[];
}

interface ReqChangeRecruitStatusParmas {
  ids: number[];
  status: 'TEMP' | 'RECRUIT' | 'CLOSED';
}

interface ReqChangeEndDateParams {
  ids: number[];
  endDate: string;
}

export const requestApplications = async (params: ReqAppliesParams) => {
  const res = await request({
    method: 'get',
    endpoint: `troupes/applies`,
    params,
  });
  return toViewApplicationList(res);
};

export const requestApplyStatus = () => {
  return request({
    method: 'get',
    endpoint: 'troupes/applies/status',
  });
};

export const requestChangingApplyState = ({ applyIds, applyStatus }: ReqChangingApplyState) => {
  const res = request({
    method: 'put',
    endpoint: `applies/${applyIds}?applyStatus=${applyStatus}`,
  });
  return res;
};

export const requestUploadLogo = (data: FormData) => {
  const res = request({
    method: 'put',
    endpoint: 'troupes/logo',
    data,
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const requestUploadCover = (data: FormData) => {
  const res = request({
    method: 'put',
    endpoint: 'troupes/cover',
    data,
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const requestUploadRegistration = (data: FormData) => {
  const res = request({
    method: 'put',
    endpoint: 'troupes/registration',
    data,
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const requestPostTroupe = (data: EditTroupeInputs) => {
  const res = request({
    method: 'post',
    endpoint: 'troupes',
    data: toApiPostTroupe(data),
  });

  return res;
};

export const requestTroupeInfo = async () => {
  const res = await request({
    method: 'get',
    endpoint: 'troupes/preview',
  });

  return toViewTroupePreview(res);
};

export const requestTroupeEditInfo = async () => {
  const res = await request({
    method: 'get',
    endpoint: 'troupes/edit',
  });

  return toViewTroupe(res);
};

export const requestFavorite = (applyId: number, isFavorite: boolean) => {
  return request({
    method: 'put',
    endpoint: 'troupes/applies/favorite',
    params: { applyId, isFavorite },
  });
};

export const requestUploadImage = async (data: FormData) => {
  const res = await request({
    method: 'put',
    endpoint: 'profiles/image',
    data,
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const requestRecruits = async (
  params: ReqRecruitsParams
): Promise<BizRecruitQuery['result']> => {
  const res = await request({
    method: 'get',
    endpoint: 'recruits/troupes',
    params,
  });

  return res.result;
};

export const requestCreateRecruit = (data: ReqEditRecruitParams) => {
  const res = request({ method: 'post', endpoint: 'recruits', data });

  return res;
};

export const requestCloseRecruit = (params: ReqChangeRecruitStatusParmas) => {
  const res = request({
    method: 'put',
    endpoint: 'biz/recruits/status',
    params,
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const requestDeleteRecruit = (data: ReqDeleteRecruitsBody) => {
  const res = request({
    method: 'delete',
    endpoint: `recruits`,
    data,
  });

  return res;
};

export const requestRecruitFormData = async (recruitId: string) => {
  const res = await request({
    method: 'get',
    endpoint: `recruits/${recruitId}`,
  });

  return res;
};

export const requestEditRecruit = (data: ReqEditRecruitParams, recruitId: string) => {
  const res = request({
    method: 'put',
    endpoint: `biz/recruits?recruitId=${recruitId}`,
    data,
  });

  return res;
};

export const requestChangeEndDate = async ({ ids, endDate }: ReqChangeEndDateParams) => {
  const params = new URLSearchParams();
  ids.forEach(id => params.append('ids', id.toString()));
  params.append('endDate', endDate);

  const res = await request({
    method: 'put',
    endpoint: 'recruits/endDate',
    params,
  });

  return res;
};

export const requestPostFavorite = (id: number, favorite: boolean) => {
  return request({
    method: 'put',
    endpoint: `recruits/${id}/favorite`,
    params: { favorite: favorite },
  });
};
