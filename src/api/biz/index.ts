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
