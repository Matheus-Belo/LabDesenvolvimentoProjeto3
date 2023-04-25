import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:9999"
});

api.interceptors.request.use(async config => {
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI0ODQ1NDEsImlhdCI6MTY4MjQ2NjU0MX0.RthoHRyZob6TEV_LG4GY1qlsBBY06f7Ktxw7_AvnCWwuT0XJlx8YjZaUCnvr_cEug-sMymqHct_l-ozZbXNkdQ";
  if (token) {
    config.headers.authorization = `Bearer ` + token;
    console.log("API")
  }
  return config;
});

export default api;