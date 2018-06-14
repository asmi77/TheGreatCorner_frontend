import axios from "axios";
// Create an axios wrapper to be used in express as an express module
let http = axios.create({
  // baseURL: "http://localhost:8090/"
  baseURL: "https://thegreatcornerbackend.herokuapp.com/"
  
});

http.interceptors.request.use(config => {
  config.headers.token = localStorage.getItem("Token");
  config.headers.Authorization = "Bearer " + localStorage.getItem("Token");
  console.log("request interceptor", config);
  return config;
});

export default http;
