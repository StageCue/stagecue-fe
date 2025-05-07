export const cleanAddress = (address: string): string => {
  return address
    .replace(/\(.*?\)/g, '')
    .replace(/\d+번 출구/g, '')
    .replace(/지하\s*/g, '')
    .replace(/지상\s*/g, '')
    .trim()
    .replace(/\s{2,}/g, ' ');
};
