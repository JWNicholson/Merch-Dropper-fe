import axios from "axios";

axios.interceptors.response.use((res) => {
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
});

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "http:/localhost:5032",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
};
