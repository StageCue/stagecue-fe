import { ReqEditTroupe, TroupePreviewResponse, TroupeResponse } from '@/api/adapters/types';
import { TroupeInfo } from '@/pages/biz/components/manageTroupe';
import { EditTroupeInputs } from '@/pages/biz/components/manageTroupe/components/editTroupe/hooks/useEditTroupe';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toApiPostTroupe = (viewData: EditTroupeInputs): ReqEditTroupe => {
  return {
    troupeName: viewData.name,
    websiteUrl: viewData.website,
    bgImage: viewData.coverImg,
    managerName: viewData.picName,
    managerPhone: viewData.picCell,
    managerEmail: viewData.email,
    description: viewData.description,
    address: viewData.address,
    addressDetail: viewData.addressDetail,
    businessNumber: viewData.registrationNumber,
    businessFile: viewData.registrationFile,
    logoImage: viewData.logoImg,
    publishDate: formatDate(viewData.publishDate),
    managerCell: viewData.picCell,
    followerCount: 0,
    verifyNumber: '',
    verifyFile: '',
  };
};

export const toViewTroupe = (apiData: TroupeResponse): EditTroupeInputs => {
  const { result } = apiData;
  return {
    name: result.troupeName,
    website: result.websiteUrl,
    coverImg: result.bgImage,
    picName: result.managerName,
    picCell: result.managerCell,
    email: '',
    description: result.description,
    address: result.address,
    addressDetail: result.addressDetail,
    registrationNumber: result.verifyNumber,
    registrationFile: result.verifyFile,
    logoImg: result.logoImage,
    publishDate: result.publishDate,
  };
};

export const toViewTroupePreview = (apiData: TroupePreviewResponse): TroupeInfo => {
  const { result } = apiData;
  return {
    name: result.troupeName,
    description: result.description,
    logoImg: result.logoImage,
    coverImg: result.bgImage,
    followerCount: result.followerCount,
    publishDate: result.publishDate,
    website: result.websiteUrl,
    address: result.address,
    email: '',
    picName: result.managerName,
    picCell: result.managerCell,
  };
};
