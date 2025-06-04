<script lang="js">

import Moomoo from '../script/Moomoo';

export default {
    data() {
        return {
            new_list: []
        }
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
                {{ item.source }} {{ $formatTime(item.time) }}
            </template>
        </n-card>
    </n-space>
</template>