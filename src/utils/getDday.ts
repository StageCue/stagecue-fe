import dayjs from 'dayjs';

// dday 계산
// 날짜가 남았으면 + 날짜, 지났으면 - 날짜
export const getDday = (dateExpired: string): string => {
  const today = dayjs();
  const dday = dayjs(dateExpired).diff(today, 'day');

  return dday > 0 ? `-${dday}` : `+${Math.abs(dday)}`;
};
