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
    <n-space>
        <n-card v-for="item in new_list" :title="item.stockSymbol">
            {{ item.title }}
            <template #action>
                {{ item.source }} {{ FormatTime(item.time, 'yyyy-mm-dd hh:MM:ss') }}
            </template>
        </n-card>
    </n-space>
</template>