<script lang="js">

import Moomoo from '../script/Moomoo';
import { FormatTime } from '../script/Other';

export default {
    data() {
        return {
            new_list: []
        }
    },
    methods: {
        FormatTime
    },
    mounted() {
        this.new_list = [];
        Moomoo.get_news_list(this.$route.query.stock_id).then(text => {
            const json = JSON.parse(text);
            this.new_list = json.data.list;
        })
    }
}

</script>

<template>
    <n-grid :x-gap="10" :y-gap="10" :cols="3">
        <n-grid-item v-for="item in new_list">
            <n-card :title="item.stockSymbol">
                <n-ellipsis expand-trigger="click" line-clamp="2">
                    {{ item.title }}
                </n-ellipsis>
                <template #action>
                    {{ item.source }} {{ FormatTime(item.time, 'yyyy-mm-dd hh:MM:ss') }}
                </template>
            </n-card>
        </n-grid-item>
    </n-grid>
</template>