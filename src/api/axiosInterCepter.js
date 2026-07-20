import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "https://swarajyabackend-arwh.onrender.com/v1", // deploy
  // baseURL: "http://localhost:3000/v1", // local server
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token"); // access token
    const refresh_token = localStorage.getItem("refresh_token"); // refresh token

    if (access_token) {
      const { exp } = jwtDecode(access_token);
      console.log(exp, "expry");
      if (Date.now() >= exp * 1000) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("swarajya-user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");

        const isAuthRoute =
          window.location.pathname === "/login" ||
          window.location.pathname === "/sign-in";

        if (refresh_token && !isAuthRoute) {
          window.location.href = "/login";
        }
      } else {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Handle any errors from the response
    if (error.response && error.response.status === 401) {
      // Redirect to login page if user is not authorized)
      // window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
