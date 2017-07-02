import axios from 'axios';

// --- axios ---
export const HTTP = axios.create({
  baseURL: "http://localhost:3000/"
});
HTTP.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    console.log(error);
    return Promise.reject(error);
  });
