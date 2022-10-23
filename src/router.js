import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";

Vue.use(VueRouter)

let router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            component: MainPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: LoginPage
        },
        // {
        //     path: '/medical-test/:id',
        //     component: NewMedicalTestPage,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            // // проверка роли
            // let user = JSON.parse(this.$store.getters.user)
            //
            // if (to.matched.some(record => record.meta.is_admin)) {
            //     if(user.roles.ROLE_ADMIN){
            //         next()
            //     } else{
            //         next({ name: 'userboard'})
            //     }
            // } else {
            //     next()
            // }
            next()
        }
    } else {
        next()
    }
})

export default router