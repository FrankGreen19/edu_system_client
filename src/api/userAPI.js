import {DefaultApiInstance} from "@/api/index";

export const userAPI = {
    getUser()
    {
        return DefaultApiInstance.get('/user');
    }
}