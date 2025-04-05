const calculateKoreanAge = (birthDateString: string) => {
  if (!birthDateString) return;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();
  const [birthYear, birthMonth, birthDay] = birthDateString.split('-').map(Number);

  let koreanAge = currentYear - birthYear + 1;

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    koreanAge--;
  }

  return `${birthYear}년생 (${koreanAge}세)`;
};

export default calculateKoreanAge;
