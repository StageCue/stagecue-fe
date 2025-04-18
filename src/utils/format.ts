export const formatPhoneNumber = (value: string) => {
  const cleaned = ('' + value).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return value;
};

export const formatDateWithDots = (dateString: string): string => {
  return dateString.replace(/-/g, '.');
};

export const decimalToBinaryArray = (decimal: number) => {
  const binary = decimal?.toString(2).padStart(7, '0');

  return binary.split('');
};
