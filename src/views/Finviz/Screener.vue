<script lang="ts">

import { AddCircle } from '@vicons/ionicons5';
import { Get_Config, type FinvizScreenerParameterItem } from '../../Config';
import { Finviz_Export_Screener, type FinvizScreenerItem } from '../../Request';
import ScreenerTable from './ScreenerTable.vue';
import ScreenerCharts from './ScreenerCharts.vue';

const Finviz_Api_Token: string = '1e3ab083-4d40-48cd-9218-ea042376b56e';

export default {
    components: {
        AddCircle,
        ScreenerTable,
        ScreenerCharts
    },
    data() {
        return {
            parameter_list: [] as FinvizScreenerParameterItem[],
            parameter: '',
            token: '',
            checkStrategy: 'Table',
            data: [] as FinvizScreenerItem[]
        }
    },
    methods: {
        async confirm() {
            if (this.parameter != 'Select') {
                this.data = await Finviz_Export_Screener(this.parameter, Finviz_Api_Token);
            }
        }
    },
    async mounted() {
        const config = await Get_Config();
        this.parameter_list = config.finviz_screener_parameter_list;
        this.parameter = this.parameter_list[0].value;
        this.token = config.finviz_token;
    }
}

</script>

<template>
    <n-space vertical>
        <n-space>
            <n-button circle type="success">
                <n-icon>
                    <AddCircle />
                </n-icon>
            </n-button>
            <n-radio-group v-model:value="checkStrategy">
                <n-radio-button value="Table">
                    Table
                </n-radio-button>
                <n-radio-button value="Charts">
                    Charts
                </n-radio-button>
            </n-radio-group>
            <NSelect style="width: 240px;" v-model:value="parameter" :options="parameter_list"></NSelect>
            <NButton @click="confirm">Confirm</NButton>
        </n-space>
        <n-space v-if="data.length != 0" justify="center">
            <ScreenerTable v-if="checkStrategy === 'Table'" v-model="data"></ScreenerTable>
            <ScreenerCharts v-else-if="checkStrategy === 'Charts'" v-model="data"></ScreenerCharts>
        </n-space>
    </n-space>
</template>