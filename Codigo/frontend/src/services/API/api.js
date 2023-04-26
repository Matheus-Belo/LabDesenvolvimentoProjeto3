import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9999"
});

const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI1NTIxNzUsImlhdCI6MTY4MjUzNDE3NX0.FUYHaCiJgucF8e0Q-JseK2iYw2MRFA2XVX1IPEButFZ96JRT1QqsvoLuFY5FPq9JCjYqobYoCQAuFHj0_CSL7Q";

api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

export default api;