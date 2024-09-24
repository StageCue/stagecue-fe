import axios from "axios";

export const requestStaticMap = async ({ lat, lng }) => {
  return await axios({
    method: "get",
    url: `https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=${lat},${lng}&level=16`,
    headers: {
      "X-NCP-APIGW-API-KEY-ID": "7sn0mkl4n4",
      "X-NCP-APIGW-API-KE": "qC9hAvnS4L9rk6eenbPoLjU87qniDE0h6R8EgLnN",
    },
  });
};
