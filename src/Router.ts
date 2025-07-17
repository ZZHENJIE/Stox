import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const Finviz: RouteRecordRaw[] = [
    {
        path: '/finviz_screener',
        name: 'Screener',
        meta: {
            menu_enable: true,
            standalone: false
        },
        component: () => import('./components/Finviz/Screener.vue')
    },
    {
        path: '/finviz_analysis',
        name: 'Analysis',
        meta: {
            menu_enable: true,
            standalone: false
        },
        component: () => import('./components/Finviz/Analysis.vue')
    }
];

const Calendar: RouteRecordRaw[] = [
    {
        path: '/macro_calendar',
        name: 'Macro',
        meta: {
            menu_enable: true,
            standalone: false
        },
        component: () => import('./components/Calendar/MacroCalendar.vue')
    },
    {
        path: '/spac_calendar',
        name: 'SPAC',
        meta: {
            menu_enable: true,
            standalone: false
        },
        component: () => import('./components/Calendar/SPACCalendar.vue')
    },
    {
        path: '/ipo_calendar',
        name: 'IPO',
        meta: {
            menu_enable: true,
            standalone: false
        },
        component: () => import('./components/Calendar/IPOCalendar.vue')
    },
];

const Viewer: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        meta: {
            menu_enable: false,
            standalone: false
        },
        component: () => import('./components/Home.vue')
    },
    {
        path: '/cboe_book_viewer',
        name: 'Cboe Book Viewer',
        meta: {
            menu_enable: true,
            standalone: false
        },
        component: () => import('./components/CboeBookViewer.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            menu_enable: false,
            standalone: false
        },
        component: () => import('./components/About.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            menu_enable: true,
            standalone: false
        },
        component: () => import('./components/Settings.vue')
    },
    {
        path: '/macro_small',
        name: 'Macro Small',
        meta: {
            menu_enable: false,
            standalone: true
        },
        component: () => import('./components/MacroSmall.vue')
    },
];

const Routers: RouteRecordRaw[] = [
    ...Viewer,
    ...Finviz,
    ...Calendar
];

export function MenuData() {
    const Result = [
        {
            label: 'Finviz',
            key: 'finviz',
            children: Finviz.filter(r => r.meta?.menu_enable).map(r => ({
                label: r.name,
                key: r.name as string,
                path: r.path,
                standalone: r.meta?.standalone
            }))
        },
        {
            label: 'Calendar',
            key: 'calendar',
            children: Calendar.filter(r => r.meta?.menu_enable).map(r => ({
                label: r.name,
                key: r.name as string,
                path: r.path,
                standalone: r.meta?.standalone
            }))
        },
        ...Viewer.filter(r => r.meta?.menu_enable).map(r => ({
            label: r.name,
            key: r.name as string,
            path: r.path,
            standalone: r.meta?.standalone
        }))
    ];
    return Result
}

export const router = createRouter({
    history: createWebHistory(),
    routes: Routers
});

export default {
    MenuData,
    router,
};