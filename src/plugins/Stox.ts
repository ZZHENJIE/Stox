import { reactive, watch, type App } from 'vue'
import { DEFAULT_CONFIG, Get_Config, Save_Config } from '../utils/Config'

declare module 'vue' {
    interface ComponentCustomProperties {
        $Config: () => import('../utils/ConfigType').AppConfig,
        $ResetConfig: () => boolean,
    }
}

export default {
    install(app: App) {
        const config = reactive(Get_Config())

        app.config.globalProperties.$Config = () => config
        app.config.globalProperties.$ResetConfig = () => Save_Config(DEFAULT_CONFIG)

        watch(
            () => config,
            (newConfig) => {
                Save_Config(newConfig)
            },
            { deep: true }
        )
    }
}