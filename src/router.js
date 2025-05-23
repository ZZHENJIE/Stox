import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./views/About.vue')
    },
    {
        path: '/new',
        name: 'New',
        component: () => import('./views/New.vue')
    },
    {
        path: '/spac_calendar',
        name: 'SPAC_Calendar',
        component: () => import('./views/SPAC_Calendar.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router