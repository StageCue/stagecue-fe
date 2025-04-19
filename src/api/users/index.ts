import request from '..';
import { queryParams as _queryParams } from '@/utils/queryParams';

interface ReqChangeUserTypeParams {
  userType: 'ADMIN' | 'PERFORMER' | 'TROUPE';
}

interface ReqScrapsParams {
  key?: number;
  size: number;
}

interface ReqAppliedCastsParams {
  key: number;
  size?: number;
  applyStatuses:
    | 'APPLY' // 지원완료
    | 'OPEN' // 열람
    | 'PASS' // 서류통과
    | 'WIN' // 합격
    | 'LOSE' // 불합격
    | 'CANCELED'; // 지원취소
}

interface ReqChangeProfileData {
  id?: string;
  birthDay: string;
  age: number;
  name: string;
  height: number;
  weight: number;
  phoneNumber: string;
  email: string;
  title: string;
  introduce: string;
  thumbnail: string;
  images: string[];
  experiences: {
    artworkName: string;
    artworkPart: string;
    troupeName: string;
    startDate: string;
    endDate: string;
  }[];
}

interface ReqCreateProfileData {
  birthDay: string;
  age: number;
  name: string;
  height: number;
  weight: number;
  phoneNumber: string;
  email: string;
  title: string;
  introduce: string;
  thumbnail: string;
  images: string[];
  experiences: {
    artworkName: string;
    artworkPart: string;
    troupeName: string;
    startDate: string;
    endDate: string;
  }[];
}

export const requestCastsStatus = async () => {
  const res = await request({
    method: 'get',
    endpoint: `applies/status`,
  });

  return res;
};

export const requestChangeUserType = async (data: ReqChangeUserTypeParams) => {
  const res = await request({
    method: 'put',
    endpoint: 'users/type',
    data,
  });

  return res;
};

export const requestScraps = async (data: ReqScrapsParams) => {
  const queryParams = _queryParams(data);

  const res = await request({
    method: 'get',
    endpoint: `recruits/scrap?${queryParams}`,
  });

  return res;
};

export const requestAppliedCasts = async (data: ReqAppliedCastsParams) => {
  const queryParams = _queryParams(data);

  const res = await request({
    method: 'get',
    endpoint: `applies?${queryParams}`,
  });

  return res;
};

export const requestCancelApply = async (applyId: number) => {
  const res = await request({
    method: 'put',
    endpoint: `users/recruits?applyId=${applyId}`,
  });

  return res;
};

export const requestProfileList = async () => {
  const res = await request({
    method: 'get',
    endpoint: 'profiles',
  });

  return res;
};

export const requestProfileDetail = async (profileId: string) => {
  const res = await request({
    method: 'get',
    endpoint: `profiles/${profileId}`,
  });

  return res;
};

export const requestSaveProfile = async (data: ReqChangeProfileData) => {
  const res = await request({
    method: 'put',
    endpoint: `profiles`,
    data,
  });

  return res;
};

export const requestChangeEmailToken = async ({ changeEmail }: { changeEmail: string }) => {
  const queryParams = _queryParams({ changeEmail });

  const res = await request({
    method: 'post',
    endpoint: `user/email/change/request?${queryParams}`,
  });

  return res;
};

export const requestVerifyEmailToken = async (changeEmail: string, token: string) => {
  const queryParams = _queryParams({ changeEmail, token });

  const res = await request({
    method: 'post',
    endpoint: `user/email/change/verify?${queryParams}`,
  });

  return res;
};

export const requestChangeEmail = async (data: { email: string; token: string }) => {
  const queryParams = _queryParams(data);

  const res = await request({
    method: 'put',
    endpoint: `user/email/change?${queryParams}`,
  });

  return res;
};

export const requestChangePhoneToken = async ({
  changePhoneNumber,
}: {
  changePhoneNumber: string;
}) => {
  const queryParams = _queryParams({ changePhoneNumber });

  const res = await request({
    method: 'post',
    endpoint: `user/phone-number/change/request?${queryParams}`,
  });

  return res;
};

export const requestVerifyPhoneToken = async (changePhoneNumber: string, token: string) => {
  const queryParams = _queryParams({ changePhoneNumber, token });

  const res = await request({
    method: 'post',
    endpoint: `user/phone-number/change/verify?${queryParams}`,
  });

  return res;
};

export const requestChangePhone = async (data: { phoneNumber: string; token: string }) => {
  const queryParams = _queryParams(data);

  const res = await request({
    method: 'put',
    endpoint: `user/phone-number/change?${queryParams}`,
  });

  return res;
};

confirm;
export const requestConfirmCurrentPassword = async (password: string) => {
  const queryParams = _queryParams({ password });

  const res = await request({
    method: 'post',
    endpoint: `user/password/check?${queryParams}`,
  });

  return res;
};

export const requestChangePassword = async (password: string, token: string) => {
  const queryParams = _queryParams({ password, token });

  const res = await request({
    method: 'put',
    endpoint: `user/password/change?${queryParams}`,
  });
  return res;
};

export const requestDeleteAccountToken = async () => {
  const res = await request({
    method: 'post',
    endpoint: `user/withdraw/request`,
  });

  return res;
};

export const requestVerifyDeleteAccount = async (token: string) => {
  const queryParams = _queryParams({ token });

  const res = await request({
    method: 'post',
    endpoint: `user/withdraw/verify?${queryParams}`,
  });

  return res;
};

export const requestDeleteAccount = async (token: string) => {
  const queryParams = _queryParams({ token });

  const res = await request({
    method: 'delete',
    endpoint: `user/withdraw?${queryParams}`,
  });

  return res;
};

export const requestCreateProfile = async (data: ReqCreateProfileData) => {
  const res = await request({
    method: 'post',
    endpoint: `profiles`,
    data,
  });

  return res;
};

export const requestProfileDefault = async (profileId: string) => {
  const res = await request({
    method: 'put',
    endpoint: `profiles/${profileId}/default`,
  });

  return res;
};

export const requestDeleteProfile = async (profileId: string | number) => {
  const res = await request({
    method: 'delete',
    endpoint: `profiles/${profileId}`,
  });

  return res;
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

export const requestUploadThumbnail = async (data: FormData) => {
  const res = await request({
    method: 'put',
    endpoint: 'profiles/thumbnail',
    data,
    header: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res;
};
