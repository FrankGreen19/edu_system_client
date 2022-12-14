import Vue from 'vue'
import store from "/src/store"
import VueRouter from 'vue-router'
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import NewTestPage from "@/pages/NewTestPage";
import TestsPage from "@/pages/TestsPage";
import PassTestPage from "@/pages/PassTestPage";
import PupilTestsPage from "@/pages/PupilTestsPage";
import CategoryPage from "@/pages/CategoryPage";
import NewCategoryPage from "@/pages/NewCategoryPage";

Vue.use(VueRouter)

// const authenticated = localStorage.getItem('token');

// const authenticateGuard = function (to, from, next) {
//     if (!authenticated) {
//         next({path: '/login'})
//     } else {
//         next()
//     }
// }
//
// const authorizeGuard = function (to, from, next) {
//     authenticateGuard(to, from, next);
//
//     if (!authenticated) {
//         next({path: '/login'})
//     } else {
//         next()
//     }
// }

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
        {
            path: '/new-test',
            component: NewTestPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/authored-tests',
            component: TestsPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/pass-test',
            component: PassTestPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/passed-tests',
            component: PupilTestsPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/categories',
            component: CategoryPage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/new-category',
            component: NewCategoryPage,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        store.commit('setErrors', []);
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            // // ???????????????? ????????
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