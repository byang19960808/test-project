import axios from 'axios';
const instance = axios.create();
instance.interceptors.request.use(function (config) {
    console.log(config.path)
    let whireArr = ['/user/login'];
    if(whireArr.includes(config.path)){
        return config 
    }
    // 在发送请求之前做些什么
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
    return Promise.reject(error);
});

export default {
    get(url, params) {
        return instance.get(url, { params })
    },
    post(url, params) {
        return instance.post(url, params)
    }
}
