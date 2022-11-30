export default {
    state: {
        errors: []
    },

    mutations: {
        setErrors(state, violations) {
            state.errors = violations;
        },
    },

    getters: {
        getErrors(state) {
            return state.errors;
        }
    },
}