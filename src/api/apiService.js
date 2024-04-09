// https://swarajyabackend-arwh.onrender.com/

import Axios from "./axiosInterCepter";

export const registerApi = (data) => {
  return new Promise((resolve, reject) => {
    const url = "/visitor";
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const Login = (data) => {
  return new Promise((resolve, reject) => {
    const url = "/login";
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const approveReq = (data) => {
  return new Promise((resolve, reject) => {
    const url = "/login";
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
