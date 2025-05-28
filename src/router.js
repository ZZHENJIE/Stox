import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/finviz',
        name: 'Finviz',
        component: () => import('./views/Finviz.vue')
    },
    {
        path: '/spac_calendar',
        name: 'SPAC_Calendar',
        component: () => import('./views/SPAC_Calendar.vue')
    },
    {
        path: '/moomoo',
        name: 'Moomoo',
        component: () => import('./views/Moomoo.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./views/About.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router