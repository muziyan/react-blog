import axios from "axios"
import {message} from "antd";
// import {BrowserRouter as Router} from "react-router-dom"
// import {message} from 'antd';


const http = axios.create({
    baseURL:"http://localhost:7001/api/admin",
})

http.interceptors.request.use(config =>{
    if (localStorage.token){
        config.headers.Authorization = localStorage.token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

http.interceptors.response.use(res=>{
    return res;
},err =>{
    let errStatus = err.response.status;
    if (errStatus === 404){
        message.error("not found!")
    }
    if (errStatus === 422){
        message.error(err.response.data.message)
    }
    if (errStatus === 500){
        message.error("server error!")
    }
    return Promise.reject(err)
})

export default http;