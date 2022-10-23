import Vue from 'vue'
import Vuex from 'vuex'
import userModule from "@/store/modules/userModule";
import authModule from "@/store/modules/authModule";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // тут регистрируются модули
        userModule,
        authModule,
    }
})