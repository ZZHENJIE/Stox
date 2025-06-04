<script lang="js">

import Moomoo from '../script/Moomoo'

export default {
    data() {
        return {
            input_value: '',
            search_result: []
        }
    },
    methods: {
        search() {
            this.search_result = [];
            Moomoo.search(this.input_value).then(text => {
                const json = JSON.parse(text);
                if (json.data.stock.length != 0) {
                    for (const item of json.data.stock) {
                        if (item.market === 'us') {
                            this.search_result.push(item);
                        }
                    }
                }
            })
        }
    }
}

</script>

<template>
    <n-space vertical>
        <n-space>
            <n-input v-model:value="input_value" type="text" placeholder="Symbol" />
            <n-button @click="search">搜索</n-button>
        </n-space>
        <n-space>
            <n-card v-for="item in search_result" :title="item.stockSymbol">
                {{ item.stockName }}
                <template #action>
                    <n-button @click="$router.push({
                        path: '/moomoo_new',
                        query: {
                            stock_id: item.stockId
                        }
                    })">资讯</n-button>
                </template>
            </n-card>
        </n-space>
    </n-space>
</template>