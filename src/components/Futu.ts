import { NCard, NEllipsis, NHighlight, NList, NListItem, NScrollbar } from "naive-ui";
import FutuApi from "../api/Futu";
import type { AppConfig } from "../utils/ConfigType";
import Discrete from "./Discrete";
import { h, type VNode } from "vue";
import Tool from "../api/Tool";

function StockNews(config: AppConfig, symbol: string) {
    // FutuApi.Stock_News(stock_id).then((object) => {

    Discrete.Modal(config, {
        content: () => {
            const items: VNode[] = [];

            for (const item of object.data.list) {
                const ellipsis = h(NEllipsis, {
                    expandTrigger: 'click',
                    lineClamp: 2
                }, () => h(NHighlight, {
                    text: item.title,
                    patterns: config.keywords
                }));

                const card = h(NCard, {
                    action: () => `${item.source} ${Tool.Format_Time(item.time, 'yyyy-mm-dd hh:MM:ss')}`
                }, () => ellipsis);

                items.push(h(NListItem, null, () => card));
            }

            return h(NScrollbar, {
                style: {
                    'max-height': '500px'
                }
            }, () => h(NList, null, () => items))
        }
    })
})
}

export default {
    StockNews
}


