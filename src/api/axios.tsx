import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: baseURL
});

api.interceptors.request.use(
    async(config:any) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = 'Bearer '+token
        }
        return config;
    }
)

api.interceptors.response.use(resp => {
    return resp;
}, error => {
    return Promise.reject(error.response.data);
});

export default api;