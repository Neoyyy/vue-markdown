import axios from 'axios';
import conf from '../config/config.env';

axios.defaults.baseURL = conf.serverUrl;
axios.interceptors.request.use((config)=>{
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config
})
axios.interceptors.response.use((response) =>{
  const data = response.data;
  switch (data.code){
    case 200:
      return Promise.resolve(data.data);
    default:
      if (data.data){
        Promise.reject(JSON.stringify(data.msg) + JSON.stringify(data.data));
      }else{
        Promise.reject(data.msg);
      }

  }
  return Promise.reject(data)
},(err) =>{
  let errMsg = '';
  if(err && err.response){
    switch (err.response.status){
      case 400:
        errMsg = '请求错误';
        break;

      case 401:
        errMsg = '未授权，请登录';
        break;

      case 403:
        errMsg = '拒绝访问';
        break;

      case 404:
        errMsg = `请求地址出错: ${err.response.config.url}`;
        break;

      case 408:
        errMsg = '请求超时';
        break;

      case 500:
        errMsg = '服务器内部错误';
        break;

      case 501:
        errMsg = '服务未实现';
        break;

      case 502:
        errMsg = '网关错误';
        break;

      case 503:
        errMsg = '服务不可用';
        break;

      case 504:
        errMsg = '网关超时';
        break;

      case 505:
        errMsg = 'HTTP版本不受支持';
        break;

      default:
    }
  }
  return Promise.reject(errMsg)
})

export default axios;
