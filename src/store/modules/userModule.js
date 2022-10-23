import {userAPI} from "@/api/userAPI";

export default {
    state: {
        user: null,
        authenticated: false,
        error: '',
    }, //данные
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },

        setAuthenticated(state, payload) {
            state.authenticated = payload
        },

        setError(state, payload) {
            state.error = payload
        },
    }, // функции, меняющие состояние
    getters: {
        getUser(state) {
            return state.user
        },

        isAuthenticated(state) {
            return state.authenticated
        },

        getError(state) {
            return state.error
        }
    }, // аналоги computed свойств
    actions: {
        getUser({commit})
        {
            return userAPI.getUser().then((response) => {
                console.log(response.data)
                commit('setUser', response.data.user);
                commit('setAuthenticated', true);
            })
        },
    }, // функции, работающие с апи
}