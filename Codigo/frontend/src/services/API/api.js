import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:9999"
});

api.interceptors.request.use(async config => {
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODI0NTgwNTIsImlhdCI6MTY4MjQ0MDA1Mn0.LNHCt7Jre3AT8Ux-zkU4vJyVZnYw_U58-NR55MIdzRUeFqbTWhLXt1YLpLH2iRYkiLKBHEa_bKqqVIadQNp3cg";
  if (token) {
    config.headers.authorization = `Bearer ` + token;
    console.log("API")
  }
  return config;
});

export default api;