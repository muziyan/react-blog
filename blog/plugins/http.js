import axios from  "axios"

const http = axios.create({
    baseURL:"http://localhost:7001/api/web",
    timeout:3000
})

http.interceptors.request.use(config =>{
    if (config.url.includes("/article/search")){
        config.url = encodeURI(config.url)
        return config;
    }
    return config;
},err=>{
    return Promise.reject(err)
})

export default http;

