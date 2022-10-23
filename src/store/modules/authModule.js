import {authAPI} from "@/api/modules/authAPI";

export default {
    state: {
        credentials: {
            token: localStorage.getItem('token') || null,
        }
    },

    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token);
            state.credentials.token = token;
        }
    },

    actions: {
        login({commit}, {email, password}) {
            return authAPI.login(email, password).then((response) => {
                commit('setToken', response.data.token);
            })
        }
    }
}