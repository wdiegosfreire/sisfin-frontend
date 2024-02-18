const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: process.env.VUE_APP_SISFIN_BACKEND_URL_MAINTENANCE
});

export default axiosInstance;
