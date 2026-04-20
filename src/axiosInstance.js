import axios from "axios";
import { baseLink, baseUrl } from "./config/config";
import { toast } from "react-toastify";
import { AXIOS_APIKEY } from "./config/config";

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
