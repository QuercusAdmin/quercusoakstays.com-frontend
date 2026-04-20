import axios from "axios";
import { baseLink, baseUrl,AXIOS_APIKEY } from "./config/configuration.js";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: baseUrl, 
});
let timer;


axiosInstance.interceptors.request.use(
  (config) => {
    
    const accessToken = JSON.parse(localStorage.getItem("token"));
    config.headers['x-api-key'] = AXIOS_APIKEY; 
    if (accessToken) {
      if (config.headers) {
        config.headers.token = accessToken;
    }
  }
    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);


export default axiosInstance;
