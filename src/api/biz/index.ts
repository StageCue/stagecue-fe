import { EditTroupeInputs } from '@/pages/biz/components/manageTroupe/components/editTroupe/hooks/useEditTroupe';
import request from '..';
import { toApiPostTroupe, toViewTroupe, toViewTroupePreview } from '../adapters/troupe';

interface ReqApplicationsParams {
  number?: number;
  size?: number;
  key?: number;
  gender?: 'MALE' | 'FEMALE';
  applyStatus?: 'APPLY' | 'OPEN' | 'CANCELED' | 'PASS' | 'WIN' | 'LOSE';
  sort?: 'AGE' | 'NAME';
  sortDirection?: 'ASC' | 'DESC';
  term?: string;
}

interface ReqChangingApplyState {
  applyIds: string;
  applyStatus: 'DOCUMENT_PASSED' | 'FINAL_ACCEPTED' | 'REJECTED';
}

interface ReqRecruitsParams {
  limit: number;
  offset: number;
  status?: 'TEMP' | 'RECRUIT' | 'CLOSED' | '';
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
  recruitStatus: 'DRAFT' | 'OPEN' | 'CLOSED';
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

interface ReqChangeRecruitStatusBody {
  recruitIds: number[];
  status: 'TEMP' | 'RECRUIT' | 'CLOSED';
}

interface ReqChangeEndDateBody {
  recruitIds: number[];
  endDate: string;
}

export const requestApplications = (params: ReqApplicationsParams) => {
  const res = request({
    method: 'get',
    endpoint: `troupes/applies`,
    params: params,
  });
  return res;
};

export const requestChangingApplyState = ({ applyIds, applyStatus }: ReqChangingApplyState) => {
  const res = request({
    method: 'put',
    endpoint: `biz/recruits/applications?applyIds=${applyIds}&applyStatus=${applyStatus}`,
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
    endpoint: 'biz/troupes/info/upload-registration',
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

export const requestRecruits = ({ limit, offset, status }: ReqRecruitsParams) => {
  const res = request({
    method: 'get',
    endpoint: `biz/recruits?limit=${limit}&offset=${offset}&status=${status}`,
  });

  return res;
};

export const requestUploadRecruitImage = (data: FormData) => {
  const res = request({
    method: 'put',
    endpoint: 'biz/recruits/images',
    data,
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};

export const requestCreateRecruit = (data: ReqEditRecruitParams) => {
  const res = request({ method: 'post', endpoint: 'recruits', data });

  return res;
};

export const requestCloseRecruit = (data: ReqChangeRecruitStatusBody) => {
  const res = request({
    method: 'put',
    endpoint: 'biz/recruits/status',
    data,
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

export const requestChangeEndDate = async (data: ReqChangeEndDateBody) => {
  const res = await request({
    method: 'put',
    endpoint: 'recruits/endDate',
    data,
  });

  return res;
};
