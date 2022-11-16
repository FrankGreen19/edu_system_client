import {DefaultApiInstance} from "@/api";

export const testAPI = {
    getTestTypes()
    {
        return DefaultApiInstance.get('/test-type');
    },

    getQuestionCategories(catType)
    {
        return DefaultApiInstance.get(`/question-category/${catType}`)
    },

    getQuestionsByCategoryId(catId)
    {
        return DefaultApiInstance.post('/question', {
            questionCategoryId: catId
        });
    },

    postNewTest(testData)
    {
        return DefaultApiInstance.post('/test', testData);
    }
}