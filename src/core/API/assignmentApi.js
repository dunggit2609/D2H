import axiosClient from "./axiosClient";
import {convertObjectCamelToSnake} from 'core/utils/object'
const url = "/test";
const assignmentApi = {
  create(data) {
    return axiosClient.post(`${url}/grade`, convertObjectCamelToSnake(data));
  },
  getAll(data) {
    return axiosClient.post(`/assignment?size=${data.size}&page=${data.page}`, data.filter);
  },
  getDetail(id) {
    return axiosClient.get(`${url}/get-test/${id}`);
  },
};

export default assignmentApi;
