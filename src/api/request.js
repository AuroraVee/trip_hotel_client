//对axios进行封装
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { message } from "antd";

//引入样式文件
//start()方法进度条开始启动
//done()进度条结束

//创建一个axios实例，自行配置参数
const requests = axios.create({
  baseURL: "/api", //基础路径，在发送请求时会默认带上该路径
  timeout: 10000, //请求超时时间
});

requests.interceptors.request.use((config) => {
  //请求之前
  nprogress.start();

  return config;
});

requests.interceptors.response.use(
  (res) => {
    //数据返回后拦截器可以检测，可以做一些事情
    nprogress.done();

    return res.data;
  },
  (error) => {
    message.error(error.message);
    //return Promise.reject(new Error("fail"));
  }
);

export default requests;
