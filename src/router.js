import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '主页',
            standalone: false
        },
        component: () => import('./views/Home.vue')
    },
    {
        path: '/finviz',
        name: 'Finviz',
        meta: {
            title: 'Finviz',
            standalone: false
        },
        component: () => import('./views/Finviz.vue')
    },
    {
        path: '/spac_calendar',
        name: 'SPAC_Calendar',
        meta: {
            title: 'SPAC 日历',
            standalone: false
        },
        component: () => import('./views/SPAC_Calendar.vue')
    },
    {
        path: '/macro',
        name: 'Macro',
        meta: {
            title: '宏观',
            standalone: false
        },
        component: () => import('./views/Macro.vue')
    },
    {
        path: '/macro_small',
        name: 'Macro_Small',
        meta: {
            title: '宏观小窗口',
            standalone: true
        },
        component: () => import('./views/Macro_Small.vue')
    },
    {
        path: '/moomoo',
        name: 'Moomoo',
        meta: {
            title: '富途牛牛',
            standalone: false
        },
        component: () => import('./views/Moomoo.vue')
    },
    {
        path: '/moomoo_new',
        name: 'Moomoo_new',
        meta: {
            title: '富途牛牛新闻',
            standalone: false
        },
        component: () => import('./views/Moomoo_New.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: '关于',
            standalone: false
        },
        component: () => import('./views/About.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router