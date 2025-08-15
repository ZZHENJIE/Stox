import { darkTheme, lightTheme, NButton, NConfigProvider, NFlex, NIcon, NLayout, NLayoutContent, NLayoutSider, NMenu, type MenuOption } from "naive-ui";
import { defineComponent, h, onMounted, ref } from 'vue';
import Config from "./utils/Config";
import { ArrowBackCircle, Home, SettingsSharp } from "@vicons/ionicons5";
import { RouterView, useRoute, useRouter } from "vue-router";
import Router from "./plugins/Router";
import { useI18n } from "vue-i18n";
import Discrete from "./components/Discrete";
import DTBox from "./plugins/DTBox";

const menu_options: MenuOption[] = [
    {
        label: () => useI18n().t('Finviz'),
        key: 'Finviz',
        children: Router.Finviz.filter(r => r.meta?.menu_enable)
            .map(r => ({
                label: r.meta?.title as () => string,
                key: r.name as string,
                path: r.path,
                standalone: r.meta?.standalone
            }))
    },
    {
        label: () => useI18n().t('Calendar'),
        key: 'Calendar',
        children: Router.Calendar.filter(r => r.meta?.menu_enable)
            .map(r => ({
                label: r.meta?.title as () => string,
                key: r.name as string,
                path: r.path,
                standalone: r.meta?.standalone
            }))
    },
    ...Router.Viewer.filter(r => r.meta?.menu_enable)
        .map(r => ({
            label: r.meta?.title as () => string,
            key: r.name as string,
            path: r.path,
            standalone: r.meta?.standalone
        }))
];

export default defineComponent(() => {
    const route = useRoute();
    const router = useRouter();
    const config = ref(Config.Get());

    useI18n().locale.value = 'zh-CN';
    // useI18n().locale.value = 'en-US';

    const layout_sider = () => {
        if (!route?.meta.standalone) {
            const home_button = () => h(NButton, {
                round: true,
                onClick: () => router.push({ name: 'Home' }),
                renderIcon: () => h(NIcon, null, () => h(Home))
            })

            const back_button = () => h(NButton, {
                round: true,
                onClick: () => router.back(),
                renderIcon: () => h(NIcon, null, () => h(ArrowBackCircle))
            })

            const settings_button = () => h(NButton, {
                round: true,
                onClick: () => router.push({ name: 'Settings' }),
                renderIcon: () => h(NIcon, null, () => h(SettingsSharp))
            })

            const menu = () => h(NMenu, {
                options: menu_options,
                value: route.name as string,
                'onUpdate:value': (value) => router.push({ name: value })
            })

            return h(NLayoutSider, {
                nativeScrollbar: false,
                width: '200px',
                collapsedWidth: 15,
                collapsed: config.value.main_menu_collapsed,
                onUpdateCollapsed: (collapsed: boolean) => config.value.main_menu_collapsed = collapsed,
                showTrigger: true,
                contentStyle: {
                    'padding-top': '5px'
                },
            }, () => h(NFlex, {
                justify: 'center'
            }, () => [home_button(), back_button(), settings_button(), menu()]))
        }
    }

    const kimi_button = () => h('div');

    const router_view = () => h('div', {
        style: {
            'padding': '5px'
        }
    }, h(RouterView))

    const layout_content = () => h(NLayoutContent, {
        nativeScrollbar: false,
    }, () => [router_view(), kimi_button()])

    const main_layout = () => h(NLayout, {
        position: 'absolute',
        hasSider: true
    }, () => [layout_sider(), layout_content()])

    const render = () => h(NConfigProvider, {
        theme: config.value.is_dark_theme ? darkTheme : lightTheme,
    }, () => main_layout())

    onMounted(() => {
        const init_notification = Discrete.Notification().create({
            closable: false,
            title: '正在初始化...',
        });

        DTBox.Init().then(() => init_notification.destroy());
    })

    return render;
});