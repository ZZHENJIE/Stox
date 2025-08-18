import { h, ref, type VNode } from "vue";
import type { FinvizScreenerItem } from "../../api/Type";
import { NButton, NCard, NEllipsis, NEmpty, NFlex, NPagination, NSpace } from "naive-ui";
import Components from "../Components";
import FinvizApi, { type ThumbnailType } from "../../api/Finviz";

export default (array: FinvizScreenerItem[], thumbnail_type: ThumbnailType = 'd') => {
    const page = ref(1);
    const page_size = ref(12);

    const current_page_data = () => {
        const start = (page.value - 1) * page_size.value;
        const end = start + page_size.value;
        return array.slice(start, end);
    }

    const image_dimensions = FinvizApi.Get_Thumbnail_Image_Dimensions(thumbnail_type)

    const content = () => {
        const result: VNode[] = [];

        for (const item of current_page_data()) {
            result.push(h(NCard, {
                content: () => h(Components.LoadImage({
                    width: image_dimensions.width,
                    height: image_dimensions.height,
                    src: FinvizApi.Thumbnail_Image_Url(item.Symbol, thumbnail_type)
                })),
                footer: () => h(NEllipsis, { lineClamp: 1 }, () => item.Company),
                action: () => h('div', null, () => [h(NButton, {

                })])
            }))
        }

        return array.length != 0 ? h(NSpace, {
            justify: 'center'
        }, () => result) : h(NEmpty, {
            description: 'No Data'
        });
    }

    const pagination = () => h(NFlex, {
        justify: 'end'
    }, () => h(NPagination, {
        showSizePicker: true,
        pageSizes: [12, 24, 36],
        page: page.value,
        pageSize: page_size.value,
        pageCount: Math.ceil(array.length / page_size.value),
        onUpdatePage: (newPage) => page.value = newPage,
        onUpdatePageSize: (newPageSize) => page_size.value = newPageSize
    }));

    return h(NFlex, {
        vertical: true,
    }, () => [content(), pagination()])
}