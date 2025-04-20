export const daysArrayToDecimal = (daysArray: string[]): string[] | null => {
  if (daysArray?.every(day => day === '1')) {
    return null;
  }

  const numberDays = daysArray.map(day => Number(day));
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  return days.filter((day, index) => numberDays[index] && day);
};

export const weekdayStringsToBinary = (days: string[]): string[] => {
  const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  return dayOrder.map(day => (days.includes(day) ? '1' : '0'));
};
