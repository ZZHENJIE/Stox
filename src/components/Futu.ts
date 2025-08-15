import { NAlert, NCard, NEllipsis, NFlex, NHighlight, NScrollbar } from "naive-ui";
import FutuApi from "../api/Futu";
import { defineComponent, h, onMounted, onUnmounted, ref, type VNode } from "vue";
import Tool from "../utils/Tool";
import { invoke } from "@tauri-apps/api/core";

async function StockNews(symbol: string, patterns: string[] = []) {
    const stock_id = await invoke('get_id_by_symbol', { symbol });
    const stock_news = await FutuApi.Stock_News(stock_id as string);
    const items: VNode[] = [];

    for (const item of stock_news.data.list) {
        const ellipsis = h(NEllipsis, {
            expandTrigger: 'click',
            lineClamp: 2
        }, () => h(NHighlight, {
            text: item.title,
            patterns: patterns
        }));

        items.push(h(NCard, {
            action: () => `${item.source} ${Tool.Format_Time(item.time, 'yyyy-mm-dd hh:MM:ss')}`
        }, () => ellipsis));
    }

    return h(NScrollbar, {
        style: {
            'max-height': '500px'
        }
    }, () => h(NFlex, {
        vertical: true
    }, () => items))
}

function FlashNews() {
    return defineComponent({
        name: 'FlashNews',
        setup() {

            const data = ref([]);
            const timeout_id = ref(0);
            const is_mounted = ref(true);
            const level: Array<'default' | 'warning' | 'error' | 'info' | 'success'> = ['default', 'warning', 'error'];

            const update_data = () => {
                FutuApi.Flash_News().then(object => {
                    data.value = object.data.data.news;
                    setTimeout(() => is_mounted.value ? update_data() : {}, 10000);
                });
            }

            onMounted(() => update_data());
            onUnmounted(() => {
                is_mounted.value = false;
                clearTimeout(timeout_id.value);
            });

            const cards = () => {
                const result: VNode[] = [];

                for (const item of data.value as any[]) {
                    const alert = () => h(NAlert, {
                        showIcon: false,
                        type: level[item.level]
                    }, () => item.content);

                    result.push(h(NCard, {
                        title: item.title,
                        action: () => Tool.Format_Time(item.time, 'hh:MM:ss')
                    }, () => alert()))
                }

                return result;
            }

            const render = () => h(NFlex, {
                vertical: true
            }, () => cards());

            return () => render();
        }
    })
}

export default {
    StockNews,
    FlashNews
}


