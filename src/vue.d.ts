import { ComponentCustomProperties } from 'vue'
import type { DiscreteApi } from 'naive-ui'
import type { AppConfig } from './Config'

declare module 'vue' {
    interface ComponentCustomProperties {
        $Config: () => AppConfig,
        $SaveConfig: () => Promise<boolean>,
        $ResetConfig: () => Promise<boolean>,
        $DiscreteApi: () => DiscreteApi,
    }
}