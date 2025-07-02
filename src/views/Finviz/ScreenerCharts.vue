<script lang="ts">
import { type PropType } from 'vue';
import type { FinvizScreenerItem } from '../../Request';

const PAGE_SIZE = 36;

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
                    value: 'd'
                },
                {
                    label: '1 Minute',
                    value: 'i1'
                },
                {
                    label: '3 Minute',
                    value: 'i3'
                },
                {
                    label: '5 Minute',
                    value: 'i5'
                }
            ],
            interval: 'd'
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.modelValue.length / PAGE_SIZE);
        },
        currentPageData() {
            const start = (this.page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            return this.modelValue.slice(start, end);
        }
    },
    methods: {
        thumbnail(ticker: string) {
            return `https://charts-node.finviz.com/chart.ashx?&t=${ticker}&tf=${this.interval}&ct=candle_stick`;
        }
    }
}
</script>

<template>
    <NSpace justify="center">
        <NCard v-for="item in currentPageData" :key="item.Ticker">
            <NTooltip trigger="hover">
                <template #trigger>
                    <n-image :src="thumbnail(item.Ticker)" style="width: 50%;" />
                </template>
                公司: {{ item.Company }}
                <br />
                国家: {{ item.Country }}
            </NTooltip>
        </NCard>
    </NSpace>
    <NSpace justify="center" style="margin-top: 8px;">
        <NPagination size="large" v-model:page="page" :page-count="pageCount" simple />
        <NSelect v-model:value="interval" :options="interval_list" style="width: 130px;"></NSelect>
    </NSpace>
</template>