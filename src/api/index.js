import axios from "axios";
import store from "/src/store"

const defaultConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
            ? localStorage.getItem('token')
            : null
    }
}

const loginConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
}

const DefaultApiInstance = axios.create(defaultConfig);
const LoginApiInstance = axios.create(loginConfig);

DefaultApiInstance.interceptors.response.use(
     (response) => {
        // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
        return response;
    },
    async (error) => {
        let originalRequest = error.config;
        originalRequest._isRetry = true;
        console.log(error)

        if (error.response.status === 401) {
            store.dispatch('refresh')
                .catch(() => {
                    store.dispatch('logout');
                })
                .then(() => {
                    originalRequest.headers['Authorization'] = localStorage.getItem('token');
                    return DefaultApiInstance.request(originalRequest).catch(response => console.log(response.data.message));
                })
        }

        return Promise.reject(error);
     }
);

export {DefaultApiInstance, LoginApiInstance};