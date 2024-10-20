import request from "..";

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
  applyStatus: string;
}

interface ReqUploadImage {
  file: string;
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
}

interface ReqEditRecruitParams {
  title: string;
  introduce: string;
  recruitEnd: string;
  recruitingParts: string[];
  monthlyFee: number;
  artworkName: string;
  category: string;
  recruitStatus: string;
  recruitImages: string[];
  practice: {
    start: string;
    end: string;
    dayOfWeek: number;
    address: string;
    addressDetail: string;
  };
  stage: {
    start: string;
    end: string;
    address: string;
    addressDetail: string;
  };
}

export const requestApplications = ({
  limit,
  offset,
}: ReqApplicationsParams) => {
  const res = request({
    method: "get",
    endpoint: `biz/recruits/applications?limit=${limit}&offset=${offset}`,
  });
  return res;
};

export const requestChangingApplyState = ({
  applyIds,
  applyStatus,
}: ReqChangingApplyState) => {
  const res = request({
    method: "put",
    endpoint: `biz/recruits/applications?applyIds=${applyIds}&applyStatus=${applyStatus}`,
  });
  return res;
};

export const requestUploadLogo = (data: ReqUploadImage) => {
  const res = request({
    method: "put",
    endpoint: "biz/troupes/info/upload-logo",
    data,
  });

  return res;
};

export const requestUploadCover = (data: ReqUploadImage) => {
  const res = request({
    method: "put",
    endpoint: "biz/troupes/info/upload-cover",
    data,
  });

  return res;
};

export const requestUploadRegistration = (data: ReqUploadImage) => {
  const res = request({
    method: "put",
    endpoint: "biz/troupes/info/upload-registration",
    data,
  });

  return res;
};

export const requestEditTroupe = (data: ReqEditTroupeData) => {
  const res = request({
    method: "put",
    endpoint: "biz/troupes/info",
    data,
  });

  return res;
};

export const requestTroupeInfo = () => {
  const res = request({
    method: "get",
    endpoint: "biz/troupes/info",
  });

  return res;
};

export const requestTroupeEditInfo = () => {
  const res = request({
    method: "get",
    endpoint: "biz/troupes/info/edit",
  });

  return res;
};

export const requestRecruits = ({ limit, offset }: ReqRecruitsParams) => {
  const res = request({
    method: "get",
    endpoint: `biz/recruits?limit=${limit}&offset=${offset}`,
  });

  return res;
};

export const requestEditRecruit = (
  data: ReqEditRecruitParams,
  recruitId: string
) => {
  const res = request({
    method: "put",
    endpoint: `biz/recruits?recruitId=${recruitId}`,
    data,
  });

  return res;
};

export const requestUploadRecruitImage = (data: ReqUploadImage) => {
  const res = request({
    method: "put",
    endpoint: "biz/recruits/images",
    data,
  });

  return res;
};

export const requestCreateRecruit = (data: ReqEditRecruitParams) => {
  const res = request({ method: "post", endpoint: "biz/recruits", data });

  return res;
};
