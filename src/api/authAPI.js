import {LoginApiInstance} from "@/api/index";

export const authAPI = {
    login(email, password)
    {
        console.log('data', email)
        return LoginApiInstance.post('/login_check', {
            'email': email,
            'password': password
        });
    }
}