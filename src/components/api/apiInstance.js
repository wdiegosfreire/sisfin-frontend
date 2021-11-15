const axios = require("axios");

const axiosInstance = axios.create({
   baseURL: (process.env.VUE_APP_ENVIRONMENT == "heroku" ? "https://sisfin.herokuapp.com/resource" : "http://localhost:8080")
});

export default axiosInstance;