export interface ReqEditTroupe {
  troupeName: string;
  description: string;
  address: string;
  addressDetail: string;
  websiteUrl: string;
  logoImage: string;
  bgImage: string;
  managerName: string;
  managerCell: string;
  email: string;
  followerCount: number;
  publishDate: string;
  verifyNumber: string;
  verifyFile: string;
}

export interface TroupeResponse {
  result: {
    id: number;
    troupeName: string;
    description: string;
    address: string;
    addressDetail: string;
    websiteUrl: string;
    logoImage: string;
    bgImage: string;
    managerName: string;
    managerCell: string;
    publishDate: string;
    verifyNumber: string;
    verifyFile: string;
  };
}

export interface TroupePreviewResponse {
  result: {
    id: number;
    userId: number;
    troupeName: string;
    description: string;
    address: string;
    addressDetail: string;
    addressLat: number;
    addressLng: number;
    websiteUrl: string;
    logoImage: string;
    bgImage: string;
    verified: boolean;
    managerName: string;
    managerCell: string;
    followerCount: number;
    publishDate: string;
    verifyNumber: string;
    verifyFile: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    isGeoNull: boolean;
  };
}
