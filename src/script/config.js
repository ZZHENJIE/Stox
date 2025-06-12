import { darkTheme } from "naive-ui";

const APP_NAME = 'Stox';
const CONFIG_KEY = `${APP_NAME}_config`;

const DEFAULT_CONFIG = {
    theme: darkTheme,
    mainWindow: {
        width: 800,
        height: 600,
        x: 400,
        y: 400
    }
};

export async function Get_Config() {
    try {
        const configStr = localStorage.getItem(CONFIG_KEY);
        if (!configStr) {
            // 如果没有配置，保存默认配置并返回
            await Save_Config(DEFAULT_CONFIG);
            return DEFAULT_CONFIG;
        }
        return JSON.parse(configStr);
    } catch (error) {
        console.error('Failed to get config:', error);
        // 出错时返回默认配置
        return DEFAULT_CONFIG;
    }
}

export async function Save_Config(config) {
    try {
        // 合并传入的配置与默认配置，确保所有字段都有值
        const currentConfig = await Get_Config();
        const mergedConfig = {
            ...DEFAULT_CONFIG,
            ...currentConfig,
            ...config,
            windowState: {
                ...DEFAULT_CONFIG.windowState,
                ...(currentConfig?.windowState || {}),
                ...(config?.windowState || {})
            }
        };

        localStorage.setItem(CONFIG_KEY, JSON.stringify(mergedConfig));
        return true;
    } catch (error) {
        console.error('Failed to save config:', error);
        return false;
    }
}

export async function Reset_Config() {
    try {
        // 直接保存默认配置
        localStorage.setItem(CONFIG_KEY, JSON.stringify(DEFAULT_CONFIG));
        return true;
    } catch (error) {
        console.error('Failed to reset config:', error);
        return false;
    }
}

export default {
    Get_Config,
    Save_Config,
    Reset_Config
}