import request from "..";

interface requestApplicationsParams {
  limit: string;
  offset: string;
  gender?: string;
  status?: string;
  isFavorite?: boolean;
  sortBy?: string;
  orderBy?: string;
  query?: string;
}

export const requestApplications = ({
  limit,
  offset,
}: requestApplicationsParams) => {
  const res = request({
    method: "get",
    endpoint: `biz/recruits/applications?limit=${limit}&offset=${offset}`,
  });
  return res;
};

// export const requestChangingApplyState = () => {
//   const res = request({

//   })
// }
