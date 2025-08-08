import { createI18n } from "vue-i18n";
import enUS from '../assets/locales/en-us.json'
import zhCN from '../assets/locales/zh-cn.json'

type MessageSchema = typeof enUS | typeof zhCN

export const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-CN'>({
    legacy: false,
    messages: {
        'en-US': enUS,
        'zh-CN': zhCN
    }
})
