const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: (process.env.VUE_APP_SISFIN_FRONTEND_ENVIROMENT == "heroku" ? "https://sisfin-maintenance.herokuapp.com" : "http://localhost:8080")
});

export default axiosInstance;
