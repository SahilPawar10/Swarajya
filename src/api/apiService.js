// https://swarajyabackend-arwh.onrender.com/

import Axios from "./axiosInterCepter";

export const adminRoles = ["admin", "operator"];
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

export const sendNotice = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/auth/send-notice`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const changeProfile = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/users/changeProfile`;
    Axios.put(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const sendGreetings = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/auth/send-greetings`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllMessage = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/chat/getMsg`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const sendMessage = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/chat/sendMsg`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getContacts = (id) => {
  return new Promise((resolve, reject) => {
    const url = `/chat/contacts/${id}`;
    Axios.post(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const dashBoarReport = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/dashBoardData`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllCreditsRecord = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/credits`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllDebitsRecord = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/debits`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllInstallment = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/installment`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getActiveLoans = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/get-summary`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createCreditEntry = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/credits`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createDebitEntry = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/debits`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createInstallmentEntry = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/installment`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createLoanEntry = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/create-entry`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const createMonthlyEntry = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/get-summary`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getLoanRequest = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/loan-req`;
    Axios.get(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getUserWithoutPhoto = () => {
  return new Promise((resolve, reject) => {
    const url = `/users/user-without-photo`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getLoanByMember = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/loanby-member`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateLoanLoanStatus = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/update-loan-status`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const addMonthlyEntry = (data) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/monthly`;
    Axios.post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const updateLoanRequest = (id) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/loan-req`;
    Axios.post(url, id)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const downloadSampleMonthlyFile = () => {
  return Axios.get("/loan/export-monthly", {
    responseType: "blob", // ← This tells Axios to treat response as binary
  });
};

export const importMonthlyFile = (formData) => {
  return new Promise((resolve, reject) => {
    const url = `/loan/import-monthly`;
    Axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getAllMonthlyData = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/monthly`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const getContributionData = () => {
  return new Promise((resolve, reject) => {
    const url = `/loan/contribution`;
    Axios.get(url)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
