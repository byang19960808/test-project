import axios from 'axios';
//const instance = axios.create();
import cookie from 'js-cookie';
import ErrorCode from './httpstatuscode.json'
import Router from '../router/index.js';
import { Notification } from 'element-ui';

if(process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = '/api'
}else if (process.env.NODE_ENV === 'test') {
    axios.defaults.baseURL = '/test'
}else if (process.env.NODE_ENV === 'producation') {
    axios.defaults.baseURL = '/pro'
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if(config.url !== '/user/login') {
        let token = cookie.get('token');
        if(!token){
            Router.replace = ('/login')
        }
        config.headers['authorization'] = token;
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {

    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    Notification({
        title: error.response.status,
        message: ErrorCode[error.response.status],
    })
    return Promise.reject(error);
});

export default {
    get(url, params) {
        return axios.get(url, { params })
    },
    post(url, params) {
        return axios.post(url, params)
    },
    delete(url, data){
        return axios.delete(url, {data})
    },
    put(url, params){
        return axios.put(url, params)
    }
}
