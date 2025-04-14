import request from '..';

interface ReqApplicationsParams {
  limit: string;
  offset: string;
  gender?: string;
  status?: string;
  isFavorite?: boolean;
  sortBy?: string;
  orderBy?: string;
  query?: string;
}

interface ReqChangingApplyState {
  applyIds: string;
  applyStatus: 'DOCUMENT_PASSED' | 'FINAL_ACCEPTED' | 'REJECTED';
}

interface ReqEditTroupeData {
  logoImg: string;
  coverImg: string;
  name: string;
  publishDate: string;
  description: string;
  address: string;
  addressDetail: string;
  registrationNumber: string;
  registrationFile: string;
  picName: string;
  picCell: string;
  email: string;
  website: string;
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

export const requestApplications = ({ limit, offset }: ReqApplicationsParams) => {
  const res = request({
    method: 'get',
    endpoint: `biz/recruits/applications?limit=${limit}&offset=${offset}`,
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
    endpoint: 'biz/troupes/info/upload-logo',
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
    endpoint: 'biz/troupes/info/upload-cover',
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

export const requestEditTroupe = (data: ReqEditTroupeData) => {
  const res = request({
    method: 'put',
    endpoint: 'biz/troupes/info',
    data,
  });

  return res;
};

export const requestCreateTroupe = (data: ReqEditTroupeData) => {
  const res = request({
    method: 'post',
    endpoint: 'biz/troupes/info',
    data,
  });

  return res;
};

export const requestTroupeInfo = () => {
  const res = request({
    method: 'get',
    endpoint: 'troupes/preview',
  });

  return res;
};

export const requestTroupeEditInfo = () => {
  const res = request({
    method: 'post',
    endpoint: 'troupes',
  });

  return res;
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
