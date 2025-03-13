const daysArrayToDecimal = (daysArray: string[]): number => {
  const binaryString = daysArray.join('');
  return parseInt(binaryString, 2);
};

export default daysArrayToDecimal;
