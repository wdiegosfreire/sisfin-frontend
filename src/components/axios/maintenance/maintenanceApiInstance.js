const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: (process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT == "default" ? "http://localhost:8080" : "http://172.31.32.253:8080")
});

export default axiosInstance;
