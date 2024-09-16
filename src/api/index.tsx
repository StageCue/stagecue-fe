import axios from "axios";

interface RequestPrams {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  data?: object;
}

const request = async ({ method, endpoint, data }: RequestPrams) => {
  const url = `http://stag-api.stagecue.co.kr/${endpoint}`;
  return await axios({ method, url, data })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default request;
