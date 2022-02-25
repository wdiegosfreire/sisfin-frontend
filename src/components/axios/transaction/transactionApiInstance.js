const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: (process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT == "heroku" ? "https://sisfin-transaction.herokuapp.com" : "http://localhost:8081")
});

export default axiosInstance;
