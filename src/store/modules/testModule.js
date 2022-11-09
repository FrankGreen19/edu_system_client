import {testAPI} from "@/api/modules/testAPI";

export default {
    state: {
        testTypes: [],
        questionCategories: {
            common: [],
            authored: [],
        },
    },

    mutations: {
        setTestTypes(state, testTypes) {
            state.testTypes = testTypes;
        },

        setCommonQuestionCategories(state, cats) {
            state.questionCategories.common = cats;
        },

        setAuthoredQuestionCategories(state, cats) {
            state.questionCategories.authored = cats;
        },
    },

    getters: {
        getTestTypes(state) {
            return state.testTypes;
        },

        getCommonQuestionCategories(state) {
            console.log(state.questionCategories)
            return state.questionCategories.common;
        },

        getAuthoredQuestionCategories(state) {
            console.log(state.questionCategories)
            return state.questionCategories.authored;
        },
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
        }
    }
}