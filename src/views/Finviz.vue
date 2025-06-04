<script lang="js">

import { export_screener } from '../script/Finviz'
import { search, get_news_list } from '../script/Moomoo'

export default {
    data() {
        return {
            current_select: '',
            select_options: [
                {
                    value: 'f=sh_price_o1&o=-volume',
                    label: '大于1$成交量排行榜'
                },
                {
                    value: 's=ta_unusualvolume&o=-volume',
                    label: '异常成交量排行榜'
                },
            ],
            page_size: 20,
            screener_data: [],
            current_page_data: []
        }
    },
    mounted() {
        this.current_select = this.select_options[this.select_options.length - 1].value;
    },
    methods: {
        get_data(parameter) {
            export_screener(parameter)
                .then(csvData => {
                    this.parseCSV(csvData.replace(/"/g, ''));
                });
        },
        current_change(currentPage) {
            console.log(currentPage);

            const begin = (currentPage - 1) * this.page_size;
            this.current_page_data = [];
            for (let index = 0; index < this.page_size; index++) {
                if (begin + index > this.screener_data.length - 1) {
                    break;
                }
                this.current_page_data.push(this.screener_data[begin + index])
            }
        },
        parseCSV(csvText) {
            const lines = csvText.split('\n');
            lines.pop();
            const headers = lines[0].split(',');
            this.screener_data = [];

            lines.slice(1).map(line => {
                const values = line.split(',');
                this.screener_data.push({
                    Number: values[0],
                    Ticker: values[1],
                    Company: values[2],
                    Sector: values[3],
                    Industry: values[4],
                    Country: values[5],
                    Market_Cap: values[6],
                    P_E: values[7],
                    Price: values[8],
                    Change: values[9],
                    Volume: values[10],
                })
            });

            this.current_change(1);
        },
        thumbnail(ticker) {
            return 'https://charts-node.finviz.com/chart.ashx?&t=' + ticker + '&tf=d&ct=candle_stick';
        },
        click_thumbnail(data) {
            search(data.Ticker).then(text => {
                const json = JSON.parse(text);
                for (const item of json.data.stock) {
                    if (item.market === "us") {
                        get_news_list(item.stockId).then(text => {
                            const json = JSON.parse(text);
                            console.log(json);
                        });
                        break;
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
            <n-select v-model:value="current_select" :options="select_options"></n-select>
            <n-button @click="get_data(current_select)">确认</n-button>
        </n-space>

        <n-space justify="center">
            <n-tooltip v-for="item in current_page_data" trigger="hover">
                <template #trigger>
                    <n-image @click="click_thumbnail(item)" :src="thumbnail(item.Ticker)"></n-image>
                </template>
                公司:{{ item.Company }}
                国家:{{ item.Country }}
            </n-tooltip>
        </n-space>

        <n-space justify="center">
            <n-pagination @on-update:page="current_change" v-show="screener_data.length != 0"
                :page-count="screener_data.length" :page-size="page_size">
            </n-pagination>
        </n-space>
        <n-back-top :right="100" />
    </n-space>
</template>