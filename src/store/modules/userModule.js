import {userAPI} from "@/api/modules/userAPI";

export default {
    state: {
        user: null,
        authenticated: false,
        error: '',
    }, //данные
    mutations: {
        setUser(state, payload) {
            state.user = payload;
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
        fetchUser(store)
        {
            return userAPI.getUser().then((res) => {
                    return store.commit('setUser', res.data.user.userResource)
                })
                .then(() => {
                    localStorage.setItem('roles', JSON.stringify(store.getters.getUser.roles));

                    return store.commit('setAuthenticated', true);
                });
        },
    }, // функции, работающие с апи
}