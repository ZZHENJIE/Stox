import { useI18n } from 'vue-i18n';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const Finviz: RouteRecordRaw[] = [
    {
        path: '/finviz_screener',
        name: 'FinvizScreener',
        meta: {
            title: () => useI18n().t('screener'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/FinvizScreener.tsx')
    },
    {
        path: '/finviz_analysis',
        name: 'FinvizAnalysis',
        meta: {
            title: () => useI18n().t('analysis'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/FinvizAnalysis.tsx')
    }
];

const Calendar: RouteRecordRaw[] = [
    {
        path: '/macro_calendar',
        name: 'MacroCalendar',
        meta: {
            title: () => useI18n().t('macro'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/MacroCalendar.tsx')
    },
    {
        path: '/spac_calendar',
        name: 'SPACCalendar',
        meta: {
            title: () => useI18n().t('spac'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/SPACCalendar.tsx')
    },
    {
        path: '/ipo_calendar',
        name: 'IPOCalendar',
        meta: {
            title: () => useI18n().t('ipo'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/IPOCalendar.tsx')
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
        component: () => import('../views/Home.tsx')
    },
    {
        path: '/cboe_book_viewer',
        name: 'CboeBookViewer',
        meta: {
            title: () => useI18n().t('cboe_book_viewer'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/CboeBookViewer.tsx')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: () => useI18n().t('about'),
            menu_enable: false,
            standalone: false
        },
        component: () => import('../views/About.tsx')
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            title: () => useI18n().t('settings'),
            menu_enable: false,
            standalone: false
        },
        component: () => import('../views/Settings.tsx')
    },
    {
        path: '/time',
        name: 'Time',
        meta: {
            title: () => useI18n().t('time'),
            menu_enable: false,
            standalone: true
        },
        component: () => import('../views/Time.tsx')
    },
];

export const Router = createRouter({
    history: createWebHistory(),
    routes: [
        ...Viewer,
        ...Finviz,
        ...Calendar
    ]
});

export default {
    Router,
    Finviz,
    Calendar,
    Viewer
};