import axios from "axios";

interface RequestPrams {
  method: "get" | "post" | "put" | "delete";
  endpoint: string;
  data?: object;
  header?: object;
}

const request = async ({
  method,
  endpoint,
  data,
  header = {},
}: RequestPrams) => {
  const url = `https://stag-api.stagecue.co.kr/${endpoint}`;
  return await axios({
    method,
    url,
    data,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      ...header,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default request;
