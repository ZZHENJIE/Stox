type Finviz_Refresh_Time = 10000 | 60000;
type Language = 'zh-CN' | 'en-US';

export interface FinvizScreenerParameterItem {
    label: string,
    value: string
}

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