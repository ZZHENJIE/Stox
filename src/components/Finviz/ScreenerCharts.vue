<script lang="ts">
import { type PropType } from 'vue';
import { Futu_Search, type FinvizScreenerItem } from '../../api/Request';
import StockNews from '../Futu/StockNews.vue';
import { NScrollbar } from 'naive-ui';
import { h } from 'vue';

const PAGE_SIZE = 12;

export default {
    props: {
        modelValue: {
            type: Array as PropType<FinvizScreenerItem[]>,
            required: true,
        }
    },
    data() {
        return {
            page: 1,
            interval_list: [
                {
                    label: 'Day',
                    value: 'd',
                    width: 324,
                },
                {
                    label: '1 Minute',
                    value: 'i1',
                    width: 844,
                },
                {
                    label: '3 Minute',
                    value: 'i3',
                    width: 584,
                },
                {
                    label: '5 Minute',
                    value: 'i5',
                    width: 376,
                }
            ],
            widths: {
                d: 324,
                i1: 844,
                i3: 584,
                i5: 376,
            },
            value: this.modelValue,
            interval: 'd' as 'd' | 'i1' | 'i3' | 'i5',
            loadedImages: {} as Record<string, boolean>,
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.value.length / PAGE_SIZE);
        },
        currentPageData() {
            const start = (this.page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            return this.value.slice(start, end);
        }
    },
    methods: {
        thumbnail(ticker: string) {
            return `https://charts-node.finviz.com/chart.ashx?&t=${ticker}&tf=${this.interval}&ct=candle_stick`;
        },
        handleImageLoad(ticker: string) {
            this.loadedImages[ticker] = true;
        },
        handleImageError(ticker: string) {
            this.loadedImages[ticker] = true;
        },
        click_thumbnail(item: FinvizScreenerItem) {
            Futu_Search(item.Ticker).then(text => {
                const json = JSON.parse(text);
                for (const i of json.data.stock) {
                    if (i.market === "us") {
                        this.$DiscreteApi().modal.create({
                            preset: 'card',
                            title: item.Company,
                            style: {
                                width: '800px',
                                height: '500px'
                            },
                            content: () => {
                                const stockPage = h(StockNews, {
                                    stockId: i.stockId,
                                    keywords: this.$Config().keywords
                                });
                                return h(NScrollbar, {
                                    style: {
                                        'max-height': '400px'
                                    }
                                }, () => [stockPage])
                            },
                        })
                        break;
                    }
                }
            })
        },
        ignore_value() {
            const ignoreList = this.$Config().finviz.ignore;
            this.value = this.value.filter(item => !ignoreList.includes(item.Ticker));
        },
        add_ignore(ticker: string) {
            this.$Config().finviz.ignore.push(ticker);
            this.ignore_value();
        }
    },
    mounted() {
        setTimeout(() => {
            this.ignore_value();
        });
    },
    watch: {
        interval() {
            this.loadedImages = {};
        },
        page() {
            const newLoaded: Record<string, boolean> = {};
            this.currentPageData.forEach(item => {
                newLoaded[item.Ticker] = false;
            });
            this.loadedImages = newLoaded;
        }
    }
}
</script>

<template>
    <div>
        <n-space justify="center">
            <NCard v-for="item in currentPageData" :key="item.Ticker">
                <n-skeleton v-if="!loadedImages[item.Ticker]" height="180px" :width="widths[interval]" :sharp="false" />
                <n-image @contextmenu.prevent="click_thumbnail(item)" v-show="loadedImages[item.Ticker]"
                    :src="thumbnail(item.Ticker)" @load="handleImageLoad(item.Ticker)"
                    @error="handleImageError(item.Ticker)" />

                <template #footer>
                    <n-ellipsis :style="{ maxWidth: widths[interval] + 'px' }">
                        {{ item.Company }}
                    </n-ellipsis>
                </template>
                <template #action>
                    <NButton size="small" @click="add_ignore(item.Ticker)">Ignore</NButton>
                    {{ item.Country }} {{ item.Volume }}
                </template>
            </NCard>
        </n-space>
        <n-flex justify="center" style="margin-top: 8px;">
            <NPagination size="large" v-model:page="page" :page-count="pageCount" simple />
            <NSelect v-model:value="interval" :options="interval_list" style="width: 130px;"></NSelect>
        </n-flex>
    </div>
</template>