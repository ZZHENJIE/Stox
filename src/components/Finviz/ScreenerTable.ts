import { NDataTable, NEllipsis, NPopover, type DataTableColumns } from "naive-ui";
import type { FinvizScreenerItem } from "../../api/Type";
import { h, reactive } from "vue";
import { useI18n } from "vue-i18n";
import Components from "../Components";
import FinvizApi, { type ThumbnailType } from "../../api/Finviz";

export default (array: FinvizScreenerItem[], thumbnail_type: ThumbnailType = 'd') => {

    const Ellipsis = (text: string) => h(NEllipsis, { lineClamp: 1 }, () => text);

    const renderChange = (value: number) => {
        const color = value > 0 ? '#90EE90' : '#DB7093';
        return h(NEllipsis, {
            style: {
                color: color
            },
            lineClamp: 1
        }, () => value + '%');
    };

    const thumbnail_dimensions = FinvizApi.Get_Thumbnail_Image_Dimensions(thumbnail_type);

    const columns: DataTableColumns<FinvizScreenerItem> = [
        {
            title: () => Ellipsis(useI18n().t('Symbol')),
            key: 'Symbol',
            width: '80px',
            render: (row) => h(NPopover, {
                trigger: 'hover',
                placement: 'bottom-start',
            }, {
                trigger: () => row.Symbol,
                default: () => h(Components.LoadImage({
                    width: thumbnail_dimensions.width,
                    height: thumbnail_dimensions.height,
                    previewDisabled: true,
                    src: FinvizApi.Thumbnail_Image_Url(row.Symbol, thumbnail_type)
                })),
            })
        },
        {
            title: () => Ellipsis(useI18n().t('Company')),
            key: 'Company',
            render: (row) => Ellipsis(row.Company)
        },
        {
            title: () => Ellipsis(`${useI18n().t('Sector')}/${useI18n().t('Industry')}`),
            key: 'SectorIndustry',
            render: (row) => Ellipsis(`${row.Sector} / ${row.Industry}`)
        },
        {
            title: () => Ellipsis(useI18n().t('Market_Cap')),
            key: 'MarketCap',
            width: '100px',
            render: (row) => Ellipsis(row.MarketCap || 'N/A'),
        },
        {
            title: () => Ellipsis(useI18n().t('PriceEarningsRatio')),
            key: 'PriceEarningsRatio',
            width: '100px',
            render: (row) => Ellipsis(row.PriceEarningsRatio || 'N/A'),
        },
        {
            title: () => Ellipsis(useI18n().t('Price')),
            key: 'Price',
            width: '100px',
            render: (row) => Ellipsis(row.Price),
        },
        {
            title: () => Ellipsis(useI18n().t('Change')),
            key: 'Change',
            width: '100px',
            render: (row) => renderChange(parseFloat(row.Change)),
        },
        {
            title: () => Ellipsis(useI18n().t('Volume')),
            key: 'Volume',
            width: '100px',
            render: (row) => Ellipsis(row.Volume)
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