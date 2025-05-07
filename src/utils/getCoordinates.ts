export const getCoordinates = async (address: string): Promise<{ lng: number; lat: number }> => {
  const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
  const secretId = import.meta.env.VITE_NAVER_SECRET_ID;
  const url = `/naver-geocode/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': secretId,
      },
    });

    const data = await response?.json();

    if (data?.addresses?.length > 0) {
      const { x: lng, y: lat } = data.addresses[0];

      return { lng, lat };
    } else {
      throw new Error('주소를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('Geocoding 에러:', error);
    throw error;
  }
};
