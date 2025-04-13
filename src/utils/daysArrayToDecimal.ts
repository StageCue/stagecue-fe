const daysArrayToDecimal = (daysArray: string[]): string[] => {
  const numberDays = daysArray.map(day => Number(day));
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  return days.filter((day, index) => numberDays[index] && day);
};

export default daysArrayToDecimal;
