const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: (process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT == "default" ? "http://localhost:8080" : process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT)
});

export default axiosInstance;
