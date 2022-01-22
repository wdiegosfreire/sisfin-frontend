const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: (process.env.VUE_APP_ENVIRONMENT == "heroku" ? "https://sisfin-transaction.herokuapp.com" : "http://localhost:8081")
});

export default axiosInstance;
