import { darkTheme, lightTheme, NButton, NConfigProvider, NFlex, NIcon, NLayout, NLayoutContent, NLayoutSider, NMenu } from "naive-ui";
import { defineComponent, getCurrentInstance, h, ref } from "vue";
import Config from "./utils/Config";
import { ArrowBackCircle, Home, SettingsSharp } from "@vicons/ionicons5";
import { Menu } from "./plugins/Router";
import { RouterView } from "vue-router";

export default defineComponent(() => {
    const properties = getCurrentInstance()?.appContext.config.globalProperties;

    const route = properties?.$route;
    const router = properties?.$router;
    if (!router || !route) {
        console.error("Router or Route is not available");
        return () => h("div", "Router not initialized");
    }

    const config = ref(Config.Get_Config());

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
                options: Menu(),
                'onUpdate:value': (value) => router.push({ name: value })
            })

            return h(NLayoutSider, {
                nativeScrollbar: false,
                width: '200px',
                collapsed: config.value.main_menu_collapsed,
                onUpdateCollapsed: (collapsed: boolean) => config.value.main_menu_collapsed = collapsed,
                showTrigger: true,
                style: {
                    'padding-top': '5px'
                }
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

    return render;
});