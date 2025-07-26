<script lang="ts">
import { AddCircle } from '@vicons/ionicons5';
import { Finviz_Export_Screener, type FinvizScreenerItem } from '../utils/Request';
import ScreenerTable from '../components/Finviz/ScreenerTable.vue';
import ScreenerCharts from '../components/Finviz/ScreenerCharts.vue';
import { NButton, NFlex } from 'naive-ui';

export default {
    components: {
        AddCircle,
        ScreenerTable,
        ScreenerCharts
    },
    data() {
        return {
            parameter_list: this.$Config().finviz.screener_parameter_list,
            parameter: '',
            token: this.$Config().finviz.token,
            data: [] as FinvizScreenerItem[],
            isLoading: false,
            refresh_options: [
                {
                    label: '10秒',
                    value: 10000
                },
                {
                    label: '30秒',
                    value: 30000
                },
                {
                    label: '1分钟',
                    value: 60000
                },
                {
                    label: '3分钟',
                    value: 180000
                }
            ]
        }
    },
    methods: {
        confirm() {
            this.isLoading = true;
            Finviz_Export_Screener(this.parameter, this.token).then(data => {
                this.data = data;
                this.isLoading = false;
            });
        },
    },
    mounted() {
        this.parameter = this.parameter_list[0].value;
    }
}
</script>

<template>
    <n-flex vertical>
        <n-flex>
            <NSelect style="width: 240px;" v-model:value="parameter" :options="parameter_list"></NSelect>
            <NButton @click="confirm">Confirm</NButton>
        </n-flex>
        <n-spin :show="isLoading">
            <n-flex v-if="data.length != 0" justify="center">
                <n-tabs type="segment" animated>
                    <n-tab-pane name="table" tab="Table">
                        <ScreenerTable v-model="data"></ScreenerTable>
                    </n-tab-pane>
                    <n-tab-pane name="Charts" tab="Charts">
                        <ScreenerCharts v-model="data"></ScreenerCharts>
                    </n-tab-pane>
                </n-tabs>
            </n-flex>
            <NBackTop :right="50" :bottom="50" />
        </n-spin>
    </n-flex>
</template>