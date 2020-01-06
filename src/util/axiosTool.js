import axios from "axios"
const httpHtatusCode = require('../config/httpstatuscode.json');
const {
  Notification
} = require("element-ui")
const instance = axios.create();

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let writeArr = ['/api/user/login']
  if (!writeArr.includes(config.url)) {
    config.headers.authorization = window.sessionStorage.getItem('authorization');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么 
  const errorText = httpHtatusCode[`${error.response.status}`];
  Notification.success({
    title: error.response.status,
    message: errorText,
    showClose: false,
    duration: 5000
  });

  return Promise.reject(error);
});

export default {
  get(url, params) {
    return instance.get(url, {
      params
    })
  },
  post(url, params) {
    return instance.post(url, params)
  }
}