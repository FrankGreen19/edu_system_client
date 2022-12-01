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

LoginApiInstance.interceptors.request.use(
    (config) => {
        store.commit('setErrors', []);
        store.commit('setLoaderVisible', true);

        return config;
    },
);

LoginApiInstance.interceptors.response.use(
    (response) => {
        // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
        store.commit('setLoaderVisible', false);

        return response;
    },
    async (error) => {
        store.commit('setLoaderVisible', false);

        store.commit('setErrors', error.response.data.violations);

        return Promise.reject(error);
    }
);

DefaultApiInstance.interceptors.request.use(
    (config) => {
            store.commit('setErrors', []);
            store.commit('setLoaderVisible', true);

            return config;
        },
);

DefaultApiInstance.interceptors.response.use(
     (response) => {
        // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
         store.commit('setLoaderVisible', false);

         return response;
    },
    async (error) => {
        store.commit('setLoaderVisible', false);

        let originalRequest = error.config;
        originalRequest._isRetry = true;

        if (error.response.status === 401) {
            store.dispatch('refresh')
                .then(() => {
                    originalRequest.headers['Authorization'] = localStorage.getItem('token');
                    return DefaultApiInstance.request(originalRequest).catch(response => console.log(response.data.message));
                })
                .catch(() => {
                    store.dispatch('logout');
                })
        } else {
            store.commit('setErrors', error.response.data.violations);
        }

        return Promise.reject(error);
     }
);

export {DefaultApiInstance, LoginApiInstance};