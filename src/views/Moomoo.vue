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
        <n-space justify="center">
            <n-table v-show="search_result.length != 0">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Operate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in search_result">
                        <td>{{ item.stockSymbol }}</td>
                        <td>{{ item.stockName }}</td>
                        <td>
                            <n-button @click="$router.push({
                                path: '/moomoo_new',
                                query: {
                                    stock_id: item.stockId
                                }
                            })">资讯</n-button>
                        </td>
                    </tr>
                </tbody>
            </n-table>
        </n-space>
    </n-space>
</template>