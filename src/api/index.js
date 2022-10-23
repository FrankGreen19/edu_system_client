import axios from "axios";

const defaultConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

const token = localStorage.getItem('token')
if (token) {
    defaultConfig.headers['Authorization'] = `Bearer ${token}`
}

const loginConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const DefaultApiInstance = axios.create(defaultConfig);
export const LoginApiInstance = axios.create(loginConfig);