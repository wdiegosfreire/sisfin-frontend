const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: (process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT == "default" ? "http://localhost:8081" : "http://172.31.32.253:8081")
});

export default axiosInstance;
