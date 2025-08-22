import { defineComponent, h, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { SpacResearchItem } from '../api/Type';
import { useDiscreteApi } from '../plugins/DTBox';
import SpacResearchApi from '../api/SpacResearch';
import { NDataTable, type DataTableColumns } from 'naive-ui';
import MEllipsis from '../components/MEllipsis';

export default defineComponent(() => {

    const { t } = useI18n();
    const calendar_data = ref<SpacResearchItem[]>();

    useDiscreteApi().loadingBar.start();
    SpacResearchApi.Calendar().then((data) => {
        calendar_data.value = data;
        useDiscreteApi().loadingBar.finish();
    })
    onUnmounted(() => useDiscreteApi().loadingBar.finish());

    const filter_options = [
        {
            label: t('Amendment_Vote'),
            value: 'amendment-vote'
        },
        {
            label: t('Approval_Vote'),
            value: 'approval-vote'
        },
        {
            label: t('IPO_Date'),
            value: 'ipo-date'
        },
        {
            label: t('Liquidation_Deadline'),
            value: 'liq-deadline'
        }
    ];

    const columns: DataTableColumns<SpacResearchItem> = [
        {
            title: () => MEllipsis(t('Symbol')),
            key: 'Symbol',
            render: (row) => MEllipsis(row.Symbol)
        },
        {
            title: () => MEllipsis(t('Date')),
            key: 'Date',
            render: (row) => MEllipsis(row.Date)
        },
        {
            title: () => MEllipsis(t('Event')),
            key: 'Event',
            defaultFilterOptionValues: ['ipo-date'],
            filterOptions: filter_options,
            filter: (value, row) => row.Event === value,
            render: (row) => filter_options.find(option => option.value === row.Event)?.label
        }
    ];

    return () => h(NDataTable, {
        columns: columns,
        data: calendar_data.value
    });
});