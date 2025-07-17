import { reactive, watch, type App } from "vue";
import { Get_Config, Reset_Config, Save_Config } from "./Config";
import { createDiscreteApi } from "naive-ui";

export default {
    async install(app: App) {
        const Config = reactive(await Get_Config());
        app.config.globalProperties.$Config = () => Config;
        watch(() => Config, (value) => {
            Save_Config(value);
        }, { deep: true });

        app.config.globalProperties.$ResetConfig = () => {
            return Reset_Config();
        }

        app.config.globalProperties.$DiscreteApi = () => {
            return createDiscreteApi(['dialog', 'loadingBar', 'message', 'modal', 'notification'], {
                configProviderProps: {
                    theme: app.config.globalProperties.$Config().theme
                }
            });
        };
    }
}