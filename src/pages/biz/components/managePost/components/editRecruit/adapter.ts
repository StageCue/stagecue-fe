import { ReqEditRecruitParams } from '@/api/biz';
import { EditRecruitInputs } from '.';

export const adaptEditRecruitInputsToDTO = (input: EditRecruitInputs): ReqEditRecruitParams => {
  return {
    title: input.title,
    recruitIntroduce: input.introduce,
    recruitStartDate: undefined,
    recruitEndDate: input.recruitEnd,
    recruitingParts: input.recruitingParts.map(part => part.value),
    monthlyFee: input.monthlyFee,
    artworkName: input.artworkName,
    recruitCategory: input.category,
    recruitStatus: input.recruitStatus,
    recruitImages: input.recruitImages,

    theatreAddress: input.stage.address,
    theatreAddressDetail: input.stage.addressDetail,
    theatreStartDate: input.stage.start,
    theatreEndDate: input.stage.end,

    practiceAddress: input.practice.address,
    practiceAddressDetail: input.practice.addressDetail,
    practiceStartDate: input.practice.start,
    practiceEndDate: input.practice.end,
    practiceDay: input.practice.dayOfWeek,
  };
};
