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

export const loginApi = (data) => {
  return new Promise((resolve, reject) => {
    const url = "/auth/login";
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

export const forgotPass = (data) => {
  return new Promise((resolve, reject) => {
    const url = "/auth/forgot-password";
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const resetPass = (data, token) => {
  return new Promise((resolve, reject) => {
    const url = `/auth/reset-password?token=${token}`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getVisitor = () => {
  return new Promise((resolve, reject) => {
    const url = `/visitor`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getTeamData = () => {
  return new Promise((resolve, reject) => {
    const url = `/users`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getOneUser = (id) => {
  return new Promise((resolve, reject) => {
    const url = `/users/${id}`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const url = `/users/${id}`;
    Axios.put(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getIpDetails = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/auth/getip`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
