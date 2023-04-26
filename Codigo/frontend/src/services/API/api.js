import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9999"
});

const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI1NjI0MTgsImlhdCI6" +
    "MTY4MjU0NDQxOH0.Y3_tENtmoFzBr5Fc35Dm6EFO3Q-CWK6e8sfiav49wHxJVrqDH9TMMOUKAHkefLhao31yJ0e92cg9VgAfrI8-RQ";

api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

export default api;