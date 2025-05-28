<script lang="js">

import { ElButton, ElCol, ElImage, ElOption, ElPagination, ElRow, ElSelect, ElSpace, ElTooltip } from 'element-plus'
import { export_screener } from '../script/finviz.js'
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
    <ElCol>
        <ElRow>
            <ElSpace :size="10">
                <ElSelect v-model="current_select" placeholder="Select" style="width: 240px">
                    <ElOption v-for="item in select_options" :key="item.value" :label="item.label" :value="item.value">
                    </ElOption>
                </ElSelect>
                <ElButton @click="get_data(current_select)">确认</ElButton>
            </ElSpace>
        </ElRow>
        <ElRow>
            <div class="grid-container">
                <ElTooltip v-for="item in current_page_data" effect="dark" placement="bottom">
                    <template #content>
                        <p>公司:{{ item.Company }}</p>
                        <p>国家:{{ item.Country }}</p>
                    </template>
                    <ElImage @click="click_thumbnail(item)" :key="item.Ticker" :src="thumbnail(item.Ticker)"
                        fit="contain" class="grid-image" />
                </ElTooltip>
            </div>
        </ElRow>
        <ElRow justify="center">
            <ElPagination @current-change="current_change" v-show="screener_data.length != 0" layout="prev, pager, next"
                :default-page-size="20" :total="screener_data.length">
            </ElPagination>
        </ElRow>
    </ElCol>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
    width: 100%;
}

.grid-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: contain;
    min-height: 200px;
}
</style>