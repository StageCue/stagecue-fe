import axios from "axios";

interface RequestPrams {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: object;
}

const request = async ({ method, url, data }: RequestPrams) => {
  return await axios({ method, url, data })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default request;
