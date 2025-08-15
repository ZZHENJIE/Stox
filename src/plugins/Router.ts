import { useI18n } from 'vue-i18n';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const Finviz: RouteRecordRaw[] = [
    {
        path: '/finviz_screener',
        name: 'FinvizScreener',
        meta: {
            title: () => useI18n().t('Screener'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/FinvizScreener.tsx')
    },
    {
        path: '/finviz_analysis',
        name: 'FinvizAnalysis',
        meta: {
            title: () => useI18n().t('Analysis'),
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
            title: () => useI18n().t('Macro'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/MacroCalendar.tsx')
    },
    {
        path: '/spac_calendar',
        name: 'SPACCalendar',
        meta: {
            title: () => useI18n().t('SPAC'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/SPACCalendar.tsx')
    },
    {
        path: '/ipo_calendar',
        name: 'IPOCalendar',
        meta: {
            title: () => useI18n().t('IPO'),
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
            title: () => useI18n().t('Home'),
            menu_enable: false,
            standalone: false
        },
        component: () => import('../views/Home.tsx')
    },
    {
        path: '/cboe_book_viewer',
        name: 'CboeBookViewer',
        meta: {
            title: () => useI18n().t('Cboe_Book_Viewer'),
            menu_enable: true,
            standalone: false
        },
        component: () => import('../views/CboeBookViewer.tsx')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: () => useI18n().t('About'),
            menu_enable: false,
            standalone: false
        },
        component: () => import('../views/About.tsx')
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: {
            title: () => useI18n().t('Settings'),
            menu_enable: false,
            standalone: false
        },
        component: () => import('../views/Settings.tsx')
    },
    {
        path: '/time',
        name: 'Time',
        meta: {
            title: () => useI18n().t('Time'),
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