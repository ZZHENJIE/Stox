<script lang="ts">
import { AddCircle } from '@vicons/ionicons5';
import { Finviz_Export_Screener, type FinvizScreenerItem } from '../utils/Request';
import ScreenerTable from '../components/Finviz/ScreenerTable.vue';
import ScreenerCharts from '../components/Finviz/ScreenerCharts.vue';
import { h } from 'vue';
import { NButton, NFlex, NInput } from 'naive-ui';

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
            newParameter: {
                label: '',
                value: ''
            },
            isLoading: false
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
        handleAddConfirm() {
            if (!this.newParameter.label.trim() || !this.newParameter.value.trim()) {
                this.$DiscreteApi().message.warning('Please fill in both fields');
                return;
            }
            this.parameter_list.push({
                label: this.newParameter.label,
                value: this.newParameter.value
            });

            this.newParameter = { label: '', value: '' };
        },
        add_parameter() {
            this.$DiscreteApi().modal.create({
                preset: 'card',
                title: 'Add New Parameter',
                style: {
                    maxWidth: '600px'
                },
                onBeforeLeave: () => {
                    this.newParameter = { label: '', value: '' };
                },
                content: () => {
                    const labelInput = h(NInput, {
                        onUpdateValue: (value: string) => {
                            this.newParameter.label = value;
                        },
                        placeholder: 'Enter Label',
                        clearable: true
                    });
                    const valueInput = h(NInput, {
                        onUpdateValue: (value: string) => {
                            this.newParameter.value = value;
                        },
                        placeholder: 'Enter Value',
                        clearable: true
                    });
                    return h(NFlex, { vertical: true }, () => [
                        labelInput, valueInput
                    ])
                },
                action: () => {
                    return h(NButton, {
                        type: 'primary',
                        onClick: () => this.handleAddConfirm()
                    }, () => 'Confirm')
                },
            })
        },
    },
    async mounted() {
        this.parameter = this.parameter_list[0].value;
    }
}
</script>

<template>
    <n-flex vertical>
        <n-flex>
            <NButton circle @click="add_parameter" type="success">
                <NIcon>
                    <AddCircle />
                </NIcon>
            </NButton>
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