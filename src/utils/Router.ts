import { useI18n } from 'vue-i18n';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const Finviz: RouteRecordRaw[] = [
    {
        path: '/finviz_screener',
        name: 'Screener',
        meta: {
            title: () => useI18n().t('screener'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../router/FinvizScreener.vue')
    },
    {
        path: '/finviz_analysis',
        name: 'Analysis',
        meta: {
            title: () => useI18n().t('analysis'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../router/FinvizAnalysis.vue')
    }
];

const Calendar: RouteRecordRaw[] = [
    {
        path: '/macro_calendar',
        name: 'Macro',
        meta: {
            title: () => useI18n().t('macro'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../router/MacroCalendar.vue')
    },
    {
        path: '/spac_calendar',
        name: 'SPAC',
        meta: {
            title: () => useI18n().t('spac'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../router/SPACCalendar.vue')
    },
    {
        path: '/ipo_calendar',
        name: 'IPO',
        meta: {
            title: () => useI18n().t('ipo'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../router/IPOCalendar.vue')
    },
];

const Viewer: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: () => useI18n().t('home'),
            menu_enable: false,
            standalone: false
        },
        component: () => import('../router/Home.vue')
    },
    {
        path: '/cboe_book_viewer',
        name: 'Cboe Book Viewer',
        meta: {
            title: () => useI18n().t('cboe_book_viewer'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../router/CboeBookViewer.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: () => useI18n().t('about'),
            menu_enable: false,
            standalone: false
        },
        component: () => import('../router/About.vue')
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            title: () => useI18n().t('settings'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../router/Settings.vue')
    },
    {
        path: '/macro_small',
        name: 'Macro Small',
        meta: {
            title: () => useI18n().t('macro_small'),
            menu_enable: false,
            standalone: true
        },
        component: () => import('../router/MacroSmall.vue')
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
            label: () => useI18n().t('finviz'),
            key: 'finviz',
            children: Finviz.filter(r => r.meta?.menu_enable).map(r => ({
                title: r.meta?.title,
                key: r.name,
                path: r.path,
                standalone: r.meta?.standalone
            }))
        },
        {
            label: () => useI18n().t('calendar'),
            key: 'calendar',
            children: Calendar.filter(r => r.meta?.menu_enable).map(r => ({
                title: r.meta?.title,
                key: r.name,
                path: r.path,
                standalone: r.meta?.standalone
            }))
        },
        ...Viewer.filter(r => r.meta?.menu_enable).map(r => ({
            title: r.meta?.title,
            key: r.name,
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