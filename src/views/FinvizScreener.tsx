import { defineComponent, h, onUnmounted, ref } from 'vue';
import Discrete from '../components/Discrete';
import { NFlex, NFloatButton, NIcon, NSelect, NTabPane, NTabs } from 'naive-ui';
import { PlayCircle, StopCircle } from '@vicons/ionicons5';
import { useI18n } from 'vue-i18n';
import Config from '../utils/Config';
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface';
import FinvizApi from '../api/Finviz';
import type { FinvizScreenerItem } from '../api/Type';
import FinvizComponent from '../components/Finviz';

interface ScreenerParameter {
    parameter: string,
    auto_refresh: number
}

export default defineComponent(() => {

    const { t } = useI18n();
    const loadingbar = Discrete.LoadingBar();
    const is_runing = ref(false);
    const config = Config.Get();
    const screener_parameter = ref<ScreenerParameter>();
    const screener_data = ref<FinvizScreenerItem[]>([]);
    const refresh_time_id = ref<number>();

    const parameter_form = () => {
        return new Promise<ScreenerParameter>((resolve, _) => {

            const parameter_list = config.finviz.screener_parameter_list;
            const parameter = ref(parameter_list[0].value);
            const parameter_select = () => h(NSelect, {
                placeholder: t('Please_Select'),
                options: parameter_list as SelectMixedOption[],
                value: parameter.value,
                onUpdateValue: (value) => parameter.value = value,
            });

            const auto_refresh_list = [
                {
                    label: '10秒',
                    value: 10 * 1000
                },
                {
                    label: '30秒',
                    value: 30 * 1000
                },
                {
                    label: '1分钟',
                    value: 60 * 1000
                },
                {
                    label: '3分钟',
                    value: 3 * 60 * 1000
                }
            ];
            const auto_refresh = ref(auto_refresh_list[0].value);

            const auto_refresh_select = () => h(NSelect, {
                placeholder: t('Please_Select'),
                options: auto_refresh_list as SelectMixedOption[],
                value: auto_refresh.value,
                onUpdateValue: (value) => auto_refresh.value = value,
            })

            const content = () => h(NFlex, {
                vertical: true
            }, () => [parameter_select(), auto_refresh_select()])

            Discrete.Modal({
                title: t('Parameter_Form'),
                style: {
                    height: '200px'
                },
                preset: 'dialog',
                showIcon: false,
                content,
                positiveText: t('Confirm'),
                onPositiveClick: () => {
                    resolve({
                        parameter: parameter.value,
                        auto_refresh: auto_refresh.value
                    });
                }
            })
        })
    }

    const manager_button_click = () => {
        if (is_runing.value) {
            is_runing.value = false;
            clearTimeout(refresh_time_id.value);
        } else {
            parameter_form().then((data) => {
                screener_parameter.value = data;
                is_runing.value = true;
                screener_data_update();
            })
        }
    }

    const screener_data_update = () => {
        const parameter = screener_parameter.value;
        if (parameter) {
            loadingbar.start();
            FinvizApi.Export_Screener(parameter.parameter, config.finviz.token).then((data) => {
                screener_data.value = data;
                loadingbar.finish();
                refresh_time_id.value = setTimeout(() => screener_data_update(), parameter.auto_refresh);
            })
        }
    };

    onUnmounted(() => {
        loadingbar.finish();
        clearTimeout(refresh_time_id.value);
    });

    const manager_button = () => {
        const icon = () => h(NIcon, null, () => is_runing.value ? h(StopCircle) : h(PlayCircle));
        return h(NFloatButton, {
            top: '50px',
            right: '50px',
            onClick: () => manager_button_click()
        }, () => icon())
    }

    const screener_table = () => h(NTabPane, {
        name: 'table',
        tab: t('Table')
    }, () => FinvizComponent.ScreenerTable(screener_data.value));

    const screener_charts = () => h(NTabPane, {
        name: 'charts',
        tab: t('Charts')
    }, () => FinvizComponent.ScreenerCharts(screener_data.value));

    const content = () => h(NTabs, {
        type: 'segment',
        animated: true,
        defaultValue: 'table',
    }, () => [screener_table(), screener_charts()])
    const render = () => h(NFlex, {
        vertical: true
    }, () => [content(), manager_button()]);

    return render;
});