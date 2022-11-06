import {LoginApiInstance} from "@/api";

export const authAPI = {
    login(email, password)
    {
        return LoginApiInstance.post('/token/get', {
            'email': email,
            'password': password
        });
    },

    refresh()
    {
        LoginApiInstance.defaults.withCredentials = true;
        return LoginApiInstance.get('/token/refresh');
    },

    logout()
    {
        return LoginApiInstance.get('/token/invalidate');
    }
}