import {authAPI} from "@/api/modules/authAPI";
import {DefaultApiInstance} from "@/api";

const getDefaultState = () => {
    return {
        credentials: {
            token: null
        }
    }
};

export default {
    state: {
        credentials: {
            token: localStorage.getItem('token') || null,
        }
    },

    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', `Bearer ${token}`);
            state.credentials.token = token;
        }
    },

    actions: {
        login({commit}, {email, password})
        {
            return authAPI.login(email, password)
                .then((response) => {
                    commit('setToken', response.data.token);
                    DefaultApiInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                })
        },

        refresh({commit})
        {
            return authAPI.refresh()
                .then((response) => {
                    DefaultApiInstance.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                    commit("setToken", response.data.token);

                })
        },

        logout(state)
        {
            return authAPI.logout()
                .then(() => {
                    localStorage.removeItem('token');
                    Object.assign(state, getDefaultState());
                })
        }
    }
}