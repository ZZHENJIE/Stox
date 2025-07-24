import { reactive, watch, type App } from "vue";
import { DEFAULT_CONFIG, Get_Config, Save_Config } from "./Config";
import { createDiscreteApi, darkTheme, lightTheme } from "naive-ui";

export default {
    async install(app: App) {
        const Config = reactive(await Get_Config());
        app.config.globalProperties.$Config = () => Config;
        watch(() => Config, (value) => {
            Save_Config(value);
        }, { deep: true });

        app.config.globalProperties.$ResetConfig = () => Save_Config(DEFAULT_CONFIG);

        app.config.globalProperties.$DiscreteApi = () => {
            return createDiscreteApi(['dialog', 'loadingBar', 'message', 'modal', 'notification'], {
                configProviderProps: {
                    theme: app.config.globalProperties.$Config().is_dark_theme ? darkTheme : lightTheme
                }
            });
        };
    }
}