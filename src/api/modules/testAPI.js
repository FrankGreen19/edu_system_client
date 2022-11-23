import {DefaultApiInstance} from "@/api";
import {test_utils} from "@/utils/testUtils";

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
    },

    getTestsByAuthor()
    {
        return DefaultApiInstance.get('/test/authored');
    },

    updateTest(test)
    {
        test = test_utils.toTestFormat(test);
        return DefaultApiInstance.put('/test', {...test});
    },

    getTestByCode(code)
    {
        return DefaultApiInstance.get(`/test/test-by-code/${code}`);
    },

    postUserTest(user)
    {
        return DefaultApiInstance.post('/user/test', user);
    },

    putUserTest(test)
    {
        return DefaultApiInstance.put('/user/test', test);
    },

    postQuestionAnswer(answer)
    {
        return DefaultApiInstance.post('/user/question/answer', answer);
    },
}