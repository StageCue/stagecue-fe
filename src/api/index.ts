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
  const url = `/v1/${endpoint}`;

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

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
      return error;
    });
};

export default request;
