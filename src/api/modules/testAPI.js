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
    }
}