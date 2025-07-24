<script lang="ts">
import type { PropType } from 'vue';
import { Format_Time } from '../../utils/Miscellaneous';
import { Futu_Stock_News } from '../../utils/Request';

export default {
    props: {
        stockId: {
            type: String,
            required: true,
        },
        keywords: {
            type: Array as PropType<String[]>,
            required: false,
        }
    },
    data() {
        return {
            info_list: [] as any[]
        }
    },
    methods: {
        Format_Time
    },
    mounted() {
        Futu_Stock_News(this.stockId).then(text => {
            const json = JSON.parse(text);
            this.info_list = json.data.list;
        })
    }
}

</script>

<template>
    <n-list>
        <n-list-item v-for="item in info_list">
            <n-card :title="item.stockSymbol">
                <n-ellipsis expand-trigger="click" line-clamp="2">
                    <n-highlight :text="item.title" :patterns="keywords" />
                </n-ellipsis>
                <template #action>
                    {{ item.source }}
                    {{ Format_Time(item.time, 'yyyy-mm-dd hh:MM:ss') }}
                </template>
            </n-card>
        </n-list-item>
    </n-list>
</template>