
export interface FinvizScreenerParameterItem {
    label: string,
    value: string
}

export interface AppConfig {
    isLightTheme: boolean;
    finviz_token: string,
    finviz_screener_parameter_list: FinvizScreenerParameterItem[],
}

export const DEFAULT_CONFIG: AppConfig = {
    isLightTheme: false,
    finviz_token: '1e3ab083-4d40-48cd-9218-ea042376b56e',
    finviz_screener_parameter_list: [
        {
            label: '超0.7$交易量',
            value: '&f=sh_price_0.7to20&o=-volume'
        },
        {
            label: '异常交易量',
            value: '&s=ta_unusualvolume&f=sh_price_0.5to30&o=-volume'
        },
        {
            label: '10$手续费',
            value: '&f=ind_shellcompanies%2Csh_curvol_o200%2Csh_price_5to20&o=-volume'
        },
        {
            label: '稳票',
            value: '&f=sh_curvol_o200,sh_price_1to20,ta_change_-3to3&ft=4&o=-volume'
        }
    ]
};

const APP_NAME = 'Stox';
const CONFIG_KEY = `${APP_NAME}_config`;

/**
 * 获取配置（自动合并默认值）
 */
export async function Get_Config(): Promise<AppConfig> {
    try {
        const configStr = localStorage.getItem(CONFIG_KEY);
        if (!configStr) {
            await Save_Config(DEFAULT_CONFIG);
            return { ...DEFAULT_CONFIG };
        }

        const parsed = JSON.parse(configStr);
        return {
            ...DEFAULT_CONFIG,
            ...parsed,
        };
    } catch (error) {
        console.error('Failed to get config:', error);
        return { ...DEFAULT_CONFIG };
    }
}

/**
 * 保存配置（自动合并默认值）
 */
export async function Save_Config(config: Partial<AppConfig>): Promise<boolean> {
    try {
        const currentConfig = await Get_Config();
        const mergedConfig: AppConfig = {
            ...DEFAULT_CONFIG,
            ...currentConfig,
            ...config
        };

        localStorage.setItem(CONFIG_KEY, JSON.stringify(mergedConfig));
        return true;
    } catch (error) {
        console.error('Failed to save config:', error);
        return false;
    }
}

/**
 * 重置为默认配置
 */
export async function Reset_Config(): Promise<boolean> {
    try {
        localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
        return true;
    } catch (error) {
        console.error('Failed to reset config:', error);
        return false;
    }
}

export default {
    DEFAULT_CONFIG,
    Get_Config,
    Save_Config,
    Reset_Config
};