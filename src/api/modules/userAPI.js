import {DefaultApiInstance} from "@/api";

export const userAPI = {
    getUser()
    {
        return DefaultApiInstance.get('/user');
    }
}