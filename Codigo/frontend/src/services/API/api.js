import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9999"
});

/** 
api.interceptors.request.use(async config => {
  // Declaramos um token manualmente para teste.
  const token = localStorage.getItem("token");

  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }else{
    api.defaults.headers.authorization = `'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, GET, OPTIONS',
    'Access-Control-Request-Method' : '*',
    'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/JSON'`;
  }

  return config;
});

*/
if(localStorage.getItem("token") != null){
  api.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;
}else{
  axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
}


export default api;