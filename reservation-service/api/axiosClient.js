// reservation-service/api/axiosClient.js
const axios = require('axios');

const axiosClient = axios.create({
  timeout: 5000, // 5 secondes de timeout
});

module.exports = axiosClient;
