export interface RecruitDetail {
  id: number;
  troupeName: string;
  title: string;
  recruitIntroduce: string;
  artworkName: string;
  monthlyFee: number;
  theatreAddress: string;
  theatreAddressDetail: string;
  theatreStartDate: string;
  theatreEndDate: string;
  theatreLocationLat: number;
  theatreLocationLng: number;
  practiceAddress: string;
  practiceAddressDetail: string;
  practiceStartDate: string;
  practiceEndDate: string;
  practiceLocationLat: number;
  practiceLocationLng: number;
  practiceDay: string[];
  recruitStartDate: string;
  recruitEndDate: string;
  recruitingParts: string[];
  recruitImages: string[];
  recruitStatus: string;
  isScrapping: boolean;
  isApplied: boolean;
}
