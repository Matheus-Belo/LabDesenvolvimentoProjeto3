import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9999"
});

const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI1Njk1OTAsI" +
    "mlhdCI6MTY4MjU1MTU5MH0.BBu7RvchIyu0nJlNrp6RHxMe26844fuAB-_ggVP-dlgGRNR_jg3Df_QPRhuJoSRtx29pu_N8TN9J9ERMf0kwSA";

api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

export default api;