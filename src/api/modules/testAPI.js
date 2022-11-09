import {DefaultApiInstance} from "@/api";

export const testAPI = {
    getTestTypes()
    {
        return DefaultApiInstance.get('/test-type');
    },

    getQuestionCategories(catType) {
        return DefaultApiInstance.get(`/question-category/${catType}`)
    },
}