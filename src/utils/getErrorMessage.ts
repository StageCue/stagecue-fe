// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any): string => {
  return error?.response?.data?.error?.element?.message?.resolved || '다시 시도해주세요.';
};
