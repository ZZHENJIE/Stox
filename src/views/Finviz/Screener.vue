<script lang="ts">
import { AddCircle } from '@vicons/ionicons5';
import { Get_Config, Save_Config, type FinvizScreenerParameterItem } from '../../Config';
import { Finviz_Export_Screener, type FinvizScreenerItem } from '../../Request';
import ScreenerTable from './ScreenerTable.vue';
import ScreenerCharts from './ScreenerCharts.vue';
import { useMessage } from 'naive-ui';

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
            data: [] as FinvizScreenerItem[],
            showAddDialog: false,
            newParameter: {
                label: '',
                value: ''
            },
            message: useMessage()
        }
    },
    methods: {
        async confirm() {
            this.data = await Finviz_Export_Screener(this.parameter, this.token);
            //console.log(this.parameter_list);
            //const list = (await Get_Config()).finviz_screener_parameter_list;
            //console.log(list);
        },
        async add_parameter() {
            this.showAddDialog = true;
        },
        handleAddConfirm() {
            if (!this.newParameter.label.trim() || !this.newParameter.value.trim()) {
                this.message.warning('Please fill in both fields');
                return;
            }

            this.parameter_list.push({
                label: this.newParameter.label,
                value: this.newParameter.value
            });

            Save_Config({
                finviz_screener_parameter_list: this.parameter_list
            }).then(() => {
                this.message.success('Add Success');
            })

            this.newParameter = { label: '', value: '' };
            this.showAddDialog = false;
        },
        handleAddCancel() {
            this.newParameter = { label: '', value: '' };
            this.showAddDialog = false;
        }
    },
    async mounted() {
        const config = await Get_Config();
        this.parameter_list = config.finviz_screener_parameter_list;
        this.token = config.finviz_token;
        this.parameter = this.parameter_list[0].value;
    }
}
</script>

<template>
    <NSpace vertical>
        <NSpace>
            <NButton circle @click="add_parameter" type="success">
                <NIcon>
                    <AddCircle />
                </NIcon>
            </NButton>
            <NRadioGroup v-model:value="checkStrategy">
                <NRadioButton value="Table">
                    Table
                </NRadioButton>
                <NRadioButton value="Charts">
                    Charts
                </NRadioButton>
            </NRadioGroup>
            <NSelect style="width: 240px;" v-model:value="parameter" :options="parameter_list"></NSelect>
            <NButton @click="confirm">Confirm</NButton>
        </NSpace>
        <NSpace v-if="data.length != 0" justify="center">
            <ScreenerTable v-if="checkStrategy === 'Table'" v-model="data"></ScreenerTable>
            <ScreenerCharts v-else-if="checkStrategy === 'Charts'" v-model="data"></ScreenerCharts>
        </NSpace>

        <NModal v-model:show="showAddDialog">
            <NCard style="width: 600px" title="Add New Parameter" :bordered="false" size="huge" role="dialog"
                aria-modal="true">
                <NSpace vertical>
                    <NInput v-model:value="newParameter.label" placeholder="Enter Label" clearable />
                    <NInput v-model:value="newParameter.value" placeholder="Enter Value" clearable />
                </NSpace>

                <template #footer>
                    <NSpace justify="end">
                        <NButton @click="handleAddCancel">Cancel</NButton>
                        <NButton type="primary" @click="handleAddConfirm">Add</NButton>
                    </NSpace>
                </template>
            </NCard>
        </NModal>
        <NBackTop :right="100" :bottom="100" />
    </NSpace>
</template>
