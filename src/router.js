import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Home',
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
        name: 'SPACCalendar',
        meta: {
            title: 'SPAC Calendar',
            standalone: false
        },
        component: () => import('./views/SPACCalendar.vue')
    },
    {
        path: '/cboe_book_viewer',
        name: 'CboeBookViewer',
        meta: {
            title: 'Cboe Book Viewer',
            standalone: false
        },
        component: () => import('./views/CboeBookViewer.vue')
    },
    {
        path: '/macro',
        name: 'Macro',
        meta: {
            title: 'Macro',
            standalone: false
        },
        component: () => import('./views/Macro.vue')
    },
    {
        path: '/macro_small',
        name: 'MacroSmall',
        meta: {
            title: 'Macro Small',
            standalone: true
        },
        component: () => import('./views/MacroSmall.vue')
    },
    {
        path: '/futu',
        name: 'Futu',
        meta: {
            title: 'Futu',
            standalone: false
        },
        component: () => import('./views/Futu.vue')
    },
    {
        path: '/futu_new',
        name: 'FutuNew',
        meta: {
            title: 'Futu New',
            standalone: false
        },
        component: () => import('./views/FutuNew.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: 'About',
            standalone: false
        },
        component: () => import('./views/About.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            title: 'Settings',
            standalone: false
        },
        component: () => import('./views/Settings.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router