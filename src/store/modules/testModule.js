import {testAPI} from "@/api/modules/testAPI";
import router from "@/router";

export default {
    state: {
        testTypes: [],
        questionCategories: {
            common: [],
            authored: [],
        },
        questions: [],
        tests: new Map(),
        testToPass: {},
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
            state.tests.set(test.id, test);
        },

        setTestToPass(state, test)
        {
            state.testToPass = test;
        },
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
        },

        getTests(state)
        {
            return state.tests;
        },

        getTestToPass(state)
        {
            return state.testToPass;
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
                router.push('/authored-tests')
            });
        },

        fetchTestsByAuthor({commit})
        {
            return testAPI.getTestsByAuthor()
                .then((response) => {
                    response.data.testResources.forEach(test => {
                        commit("pushTest", test)
                    });
                });
        },

        putTest({commit}, test)
        {
            return testAPI.updateTest(test)
                .then((res) => {
                    commit('pushTest', res.data.testResource);

                    return res.data.testResource;
                })
                .catch((res) => {
                    console.log(res.data);
                    return null;
                })
        },

        fetchTestByCode({commit}, code)
        {
            return testAPI.getTestByCode(code)
                .then((res) => {
                    commit('setTestToPass', res.data.testResource);

                    router.push('/pass-test')
                })
                .catch((res) => {
                    console.log(res.data);
                })
        }
    }
}