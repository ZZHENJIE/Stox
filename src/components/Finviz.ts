import { h, reactive } from "vue";
import type { FinvizScreenerItem } from "../api/Type";
import { NDataTable, NEllipsis, type DataTableColumns } from "naive-ui";
import { useI18n } from "vue-i18n";
import FutuComponent from "./Futu";
import Discrete from "./Discrete";

function ScreenerTable(array: FinvizScreenerItem[]) {

    const ellipsis = (text: string) => h(NEllipsis, { lineClamp: 1 }, () => text);

    const renderChange = (value: number) => {
        const color = value > 0 ? '#90EE90' : '#DB7093';
        return h(NEllipsis, {
            style: {
                color: color
            },
            lineClamp: 1
        }, () => value + '%');
    };

    const columns: DataTableColumns<FinvizScreenerItem> = [
        {
            title: () => ellipsis(useI18n().t('Symbol')),
            key: 'Ticker',
            width: '80px',
            render: (row) => ellipsis(row.Symbol)
        },
        {
            title: () => ellipsis(useI18n().t('Company')),
            key: 'Company',
            render: (row) => ellipsis(row.Company)
        },
        {
            title: () => ellipsis(`${useI18n().t('Sector')}/${useI18n().t('Industry')}`),
            key: 'SectorIndustry',
            render: (row) => ellipsis(`${row.Sector} / ${row.Industry}`)
        },
        {
            title: () => ellipsis(useI18n().t('Market_Cap')),
            key: 'MarketCap',
            width: '100px',
            render: (row) => ellipsis(row.MarketCap || 'N/A'),
        },
        {
            title: () => ellipsis(useI18n().t('PriceEarningsRatio')),
            key: 'PriceEarningsRatio',
            width: '100px',
            render: (row) => ellipsis(row.PriceEarningsRatio || 'N/A'),
        },
        {
            title: () => ellipsis(useI18n().t('Price')),
            key: 'Price',
            width: '100px',
            render: (row) => ellipsis(row.Price),
        },
        {
            title: () => ellipsis(useI18n().t('Change')),
            key: 'Change',
            width: '100px',
            render: (row) => renderChange(parseFloat(row.Change)),
        },
        {
            title: () => ellipsis(useI18n().t('Volume')),
            key: 'Volume',
            width: '100px',
            render: (row) => ellipsis(row.Volume)
        }
    ];

    const paginationReactive = reactive({
        page: 1,
        pageSize: 20,
        showSizePicker: true,
        pageSizes: [20, 40, 60],
        onChange: (page: number) => {
            paginationReactive.page = page
        },
        onUpdatePageSize: (pageSize: number) => {
            paginationReactive.pageSize = pageSize
            paginationReactive.page = 1
        }
    })

    return h(NDataTable, {
        columns,
        data: array,
        pagination: paginationReactive,
    });
}

function ScreenerCharts(array: FinvizScreenerItem[]) {
    FutuComponent.StockNews('NVDA').then((result) => {
        Discrete.Modal({
            content: () => result
        })
    });
    return h('div', 'Hello')
}

export default {
    ScreenerTable,
    ScreenerCharts
}

