<script lang="ts">
import { type PropType } from 'vue';
import StockNews from '../Futu/StockNews.vue';
import Futu from '../Futu'
import type { FinvizScreenerItem } from '../../api/Type';

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
            StockNews: Futu.StockNews
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
        thumbnail(symbol: string) {
            return `https://charts-node.finviz.com/chart.ashx?&t=${symbol}&tf=${this.interval}&ct=candle_stick`;
        },
        handleImageLoad(symbol: string) {
            this.loadedImages[symbol] = true;
        },
        handleImageError(symbol: string) {
            this.loadedImages[symbol] = true;
        },
        ignore_value() {
            const ignoreList = this.$Config().finviz.ignore;
            this.value = this.value.filter(item => !ignoreList.includes(item.Symbol));
        },
        add_ignore(symbol: string) {
            this.$Config().finviz.ignore.push(symbol);
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
                newLoaded[item.Symbol] = false;
            });
            this.loadedImages = newLoaded;
        }
    }
}
</script>

<template>
    <div>
        <n-space justify="center">
            <NCard v-for="item in currentPageData" :key="item.Symbol">
                <n-skeleton v-if="!loadedImages[item.Symbol]" height="180px" :width="widths[interval]" :sharp="false" />
                <n-image @contextmenu.prevent="StockNews($Config(), item)" v-show="loadedImages[item.Symbol]"
                    :src="thumbnail(item.Symbol)" @load="handleImageLoad(item.Symbol)"
                    @error="handleImageError(item.Symbol)" />

                <template #footer>
                    <n-ellipsis :style="{ maxWidth: widths[interval] + 'px' }">
                        {{ item.Company }}
                    </n-ellipsis>
                </template>
                <template #action>
                    <NButton size="small" @click="add_ignore(item.Symbol)">Ignore</NButton>
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