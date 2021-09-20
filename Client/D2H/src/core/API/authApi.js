import axiosClient from "./axiosClient";

const authURL = "/auth";
const authApi = {
  register(data) {
    const uri = `${authURL}/register`;
    return axiosClient.post(uri, data);
  },
  loginGetToken(data) {
    const uri = `${authURL}/login`;
    return axiosClient.post(uri, data);
  },
  loginGetUserInfo() {
    const uri = `/users`;
    return axiosClient.get(uri);
  }
  //api getToken, api get user
};

export default authApi;
