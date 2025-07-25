import { createI18n } from "vue-i18n";

export const i18n = createI18n({
    legacy: false,
    messages: {
        en: {
            message: {
                router: {
                    screener: 'Screener',
                    analysis: 'Analysis',
                    macro: 'Macro',
                },
                about: 'About'
            }
        },
        zh: {
            message: {
                about: '关于'
            }
        }
    }
})
