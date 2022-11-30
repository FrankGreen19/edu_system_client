import Vue from 'vue'
import Vuex from 'vuex'
import userModule from "@/store/modules/userModule";
import authModule from "@/store/modules/authModule";
import testModule from "@/store/modules/testModule";
import errorModule from "@/store/modules/errorModule";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // тут регистрируются модули
        userModule,
        authModule,
        testModule,
        errorModule,
    }
})