export interface FinvizScreenerParameterItem {
    label: string,
    value: string
}

type Finviz_Refresh_Time = 10000 | 60000;
type Language = 'zh-CN' | 'en-US';

export interface AppConfig {
    is_dark_theme: boolean;
    main_menu_collapsed: boolean,
    keywords: string[],
    language: Language,
    finviz: {
        token: string,
        refresh_time: Finviz_Refresh_Time,
        ignore: string[],
        screener_parameter_list: FinvizScreenerParameterItem[],
    },
    kimi: {
        login_status: object | null,
        is_show_button: boolean,
    },
    macro_small: {
        time_font_size: number,
        time_font_color: string
    }
}

export const DEFAULT_CONFIG: AppConfig = {
    is_dark_theme: true,
    main_menu_collapsed: false,
    keywords: [],
    language: 'en-US',
    finviz: {
        token: '1e3ab083-4d40-48cd-9218-ea042376b56e',
        refresh_time: 10000,
        ignore: [],
        screener_parameter_list: [
            {
                label: '超0.7$交易量',
                value: '&f=sh_price_0.7to20,sh_curvol_o200&o=-volume'
            },
            {
                label: '异常交易量',
                value: '&s=ta_unusualvolume&f=sh_price_0.5to30,sh_curvol_o200&o=-volume'
            },
            {
                label: '10$手续费',
                value: '&f=ind_shellcompanies,sh_curvol_o200,sh_price_5to20&o=-volume'
            },
            {
                label: '稳票',
                value: '&f=sh_curvol_o200,sh_price_1to20,ta_change_-3to3&ft=4&o=-volume'
            }
        ],
    },
    kimi: {
        is_show_button: false,
        login_status: null
    },
    macro_small: {
        time_font_size: 30,
        time_font_color: '#6495ED'
    }
};

const APP_NAME = 'Stox';
const CONFIG_KEY = `${APP_NAME}_config`;

export function Get_Config(): AppConfig {
    try {
        const configStr = localStorage.getItem(CONFIG_KEY);
        if (!configStr) {
            Save_Config(DEFAULT_CONFIG); // 同步保存默认配置
            return { ...DEFAULT_CONFIG };
        }

        const parsed = JSON.parse(configStr);
        return {
            ...DEFAULT_CONFIG,
            ...parsed, // 合并默认值和存储值
        };
    } catch (error) {
        console.error('Failed to get config:', error);
        return { ...DEFAULT_CONFIG };
    }
}

export function Save_Config(config: AppConfig): boolean {
    try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
        return true;
    } catch (error) {
        console.error('Failed to save config:', error);
        return false;
    }
}

export default {
    DEFAULT_CONFIG,
    Get_Config,
    Save_Config
};