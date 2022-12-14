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
        userTest: {},
        testQuestionAnswers: [],
        userTests: [],
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

        setUserTest(state, test)
        {
            state.userTest = test;
        },

        pushQuestionAnswer(state, answer)
        {
            state.testQuestionAnswers.push(answer);
        },

        setTestQuestionAnswers(state, answers)
        {
            state.testQuestionAnswers = answers;
        },

        pushUserTest(state, test)
        {
            state.userTests.push(test);
        },

        setUserTests(state, tests)
        {
            state.userTests = tests;
        },

        pushAuthoredQuestionCategory(state, cat)
        {
            state.questionCategories.authored.push(cat);
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
        },

        getTests(state)
        {
            return state.tests;
        },

        getTestToPass(state)
        {
            return state.testToPass;
        },

        getUserTest(state)
        {
            return state.userTest;
        },

        getTestQuestionAnswers(state)
        {
            return state.testQuestionAnswers;
        },

        getUserTests(state)
        {
            return state.userTests;
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
        },

        createUserTest({commit}, user)
        {
            return testAPI.postUserTest(user)
                .then((res) => {
                    commit('setUserTest', res.data.userTestResource);
                });
        },

        updateUserTest({commit}, test)
        {
          return testAPI.putUserTest(test)
              .then((res) => {
                  commit('setUserTest', res.data.userTestResource);
              })
        },

        createQuestionAnswer({commit}, answer)
        {
            return testAPI.postQuestionAnswer(answer)
                .then((res) => {
                    commit('pushQuestionAnswer', res.data.userQuestionAnswerResource);
                })
                .catch((res) => {
                    console.error(res);
                });
        },

        fetchUsersTests({commit})
        {
            return testAPI.getUserTests()
                .then((res) => {
                    commit('setUserTests', res.data.userTestsResources);
                })
        },

        addQuestionCategory({commit}, test)
        {
            return testAPI.postQuestionCategory(test)
                .then((res) => {
                    commit('pushAuthoredQuestionCategory', res.data.questionCategoryResource);
                });
        }
    }
}