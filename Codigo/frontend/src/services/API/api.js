import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9999"
});

const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI0ODQ1NDEsImlhdCI6MTY4MjQ2NjU0MX0.RthoHRyZob6TEV_LG4GY1qlsBBY06f7Ktxw7_AvnCWwuT0XJlx8YjZaUCnvr_cEug-sMymqHct_l-ozZbXNkdQ";

api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

export default api;