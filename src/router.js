import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/pages/LoginPage";

Vue.use(VueRouter)

let router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            component: LoginPage
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
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
            // let user = JSON.parse(this.$store.getters.user)
            // if(to.matched.some(record => record.meta.is_admin)) {
            //     if(user.roles.ROLE_ADMIN){
            //         next()
            //     } else{
            //         next({ name: 'userboard'})
            //     }
            // }else {
            //     next()
            // }
            next()
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ path: '/'})
        }
    }else {
        next()
    }
})

export default router