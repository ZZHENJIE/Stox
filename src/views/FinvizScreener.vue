<script lang="ts">
import { AddCircle } from '@vicons/ionicons5';
import ScreenerTable from '../components/Finviz/ScreenerTable.vue';
import ScreenerCharts from '../components/Finviz/ScreenerCharts.vue';
import Finviz from '../api/Finviz';
import type { FinvizScreenerItem } from '../api/Type';

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
            is_auto_refresh: false,
            refresh: 10000,
            refresh_timeout_id: 0,
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
        update_data() {
            this.isLoading = true;
            Finviz.Export_Screener(this.parameter, this.token).then(data => {
                this.data = data;
                this.isLoading = false;
                if (this.is_auto_refresh) {
                    this.refresh_timeout_id = setTimeout(() => {
                        this.update_data();
                    }, this.refresh);
                }
            });
        },
        refresh_switch_update(value: boolean) {
            if (value) {
                this.update_data();
            } else {
                if (this.refresh_timeout_id) {
                    clearTimeout(this.refresh_timeout_id);
                }
            }
        },
        confirm() {
            this.update_data();
        },
    },
    mounted() {
        this.parameter = this.parameter_list[0].value;
    },
}
</script>

<!-- <template>
    <n-flex vertical>
        <n-flex>
            <NSelect style="width: 240px;" v-model:value="parameter" :options="parameter_list"></NSelect>
            <NButton @click="confirm">Confirm</NButton>
            <NTooltip>
                <template #trigger>
                    <NSwitch v-model:onUpdateValue="refresh_switch_update" style="padding-top: 4px;" size="large"
                        v-model:value="is_auto_refresh" />
                </template>
                Auto Refresh
            </NTooltip>
            <NSelect v-show="is_auto_refresh" style="width: 100px;" v-model:value="refresh" :options="refresh_options">
            </NSelect>
        </n-flex>
        <n-spin :show="isLoading">
            <n-tabs type="segment" animated>
                <n-tab-pane name="table" tab="Table">
                    <ScreenerTable v-model="data"></ScreenerTable>
                </n-tab-pane>
                <n-tab-pane name="Charts" tab="Charts">
                    <ScreenerCharts v-model="data"></ScreenerCharts>
                </n-tab-pane>
            </n-tabs>
        </n-spin>
        <NBackTop :right="50" :bottom="50" />
    </n-flex>
</template> -->