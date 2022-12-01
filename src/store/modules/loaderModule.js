export default {
    state: {
        loaderVisible: false,
    },

    mutations: {
        setLoaderVisible(state, bool)
        {
            state.loaderVisible = bool;
        },
    },

    getters: {
        isLoaderVisible(state) {
            return state.loaderVisible;
        },
    }
}