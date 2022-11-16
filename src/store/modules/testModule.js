import {testAPI} from "@/api/modules/testAPI";

export default {
    state: {
        testTypes: [],
        questionCategories: {
            common: [],
            authored: [],
        },
        questions: [],
        tests: [],
    },

    mutations: {
        setTestTypes(state, testTypes)
        {
            state.testTypes = testTypes;
        },

        setCommonQuestionCategories(state, cats)
        {
            state.questionCategories.common = cats;
        },

        setAuthoredQuestionCategories(state, cats)
        {
            state.questionCategories.authored = cats;
        },

        setQuestions(state, questions)
        {
            state.questions = questions;
        },

        pushTest(state, test)
        {
            state.tests.push(test);
        }
    },

    getters: {
        getTestTypes(state)
        {
            return state.testTypes;
        },

        getCommonQuestionCategories(state)
        {
            return state.questionCategories.common;
        },

        getAuthoredQuestionCategories(state)
        {
            return state.questionCategories.authored;
        },

        getQuestions(state)
        {
            return state.questions;
        }
    },

    actions: {
        fetchTestTypes({commit})
        {
            testAPI.getTestTypes().then((response) => {
                commit('setTestTypes', response.data.testTypeResources)
            });
        },

        fetchQuestionCategories({commit})
        {
            return testAPI.getQuestionCategories('common').then((response) => {
                commit('setCommonQuestionCategories', response.data.questionCategoryResources)
            }).then(() => {
                testAPI.getQuestionCategories('authored').then((response) => {
                    commit('setAuthoredQuestionCategories', response.data.questionCategoryResources)
                });
            })
        },

        fetchQuestionsByCategory({commit}, question_category_id)
        {
            return testAPI.getQuestionsByCategoryId(question_category_id).then((response) => {
                commit('setQuestions', response.data.questionResources);
            });
        },

        createNewTest({commit}, test)
        {
            return testAPI.postNewTest(test).then((response) => {
                commit('pushTest', response.data.testResource);
            });
        }
    }
}