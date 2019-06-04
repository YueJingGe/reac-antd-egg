import axios from "axios";
import { notification } from "antd";
import baseDomain from "./config";

const axiosInstance = axios.create({
  xsrfCookieName: "xsrf-name",
  baseURL: baseDomain
});

axiosInstance.interceptors.response.use(
  function(response) {
    if (response.data.success) {
      return Promise.resolve(response.data);
    } else {
      notification["error"]({
        message: response.data.message
      });
      return Promise.reject(response.data.message);
    }
  },
  function(error) {
    try {
      notification["error"]({
        message: error.response.data.message || "系统异常"
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      }
    } catch (error) {
      notification["error"]({
        message: "系统异常，请稍后尝试！"
      });
    }
  }
);

export default axiosInstance;