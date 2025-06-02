const calculateKoreanAge = (birthday: string) => {
  if (!birthday) return;

  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // 생일이 아직 지나지 않은 경우 1을 빼줍니다
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return `${birthDate.getFullYear()}년생 (${age}세)`;
};

export default calculateKoreanAge;
