<script lang="ts">

import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { Wallstreetcn_Calendar } from '../../Request';
import { Format_Time } from '../../Miscellaneous';

export default {
    data() {
        return {
            small_window: null as any,
            isLoading: true,
            macro_list: [] as any[]
        }
    },
    mounted() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const timestamp = date.getTime() / 1000;
        this.update_data(timestamp, timestamp + 86399);
    },
    methods: {
        Format_Time,
        show_small_window() {
            this.small_window = new WebviewWindow('macro_small', {
                title: '宏观',
                url: '/macro_small',
                width: 400,
                height: 150,
                alwaysOnTop: true
            });
        },
        update_data(start: number, end: number) {
            Wallstreetcn_Calendar(start, end).then(text => {
                const json = JSON.parse(text);
                this.macro_list = json.data.items;
                this.isLoading = false;
            })
        },
        select_date(value: number) {
            const timestamp = value / 1000;
            this.update_data(timestamp, timestamp + 86399);
        },
        importance_icon(importance: number) {
            let icon = '';
            for (let index = 0; index < importance; index++) {
                icon += '★';
            }
            return icon;
        }
    }
}

</script>

<template>
    <n-flex vertical>
        <n-flex>
            <n-date-picker @update:value="select_date" :default-value="Date.now()" type="date" />
            <n-button @click="show_small_window">小窗口显示</n-button>
        </n-flex>
        <n-spin :show="isLoading">
            <n-table>
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>国家</th>
                        <th>事件</th>
                        <th>重要性</th>
                        <th>今值</th>
                        <th>预期</th>
                        <th>前值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in macro_list">
                        <td>{{ Format_Time(item.public_date, 'hh:MM:ss') }}</td>
                        <td>
                            <n-image :src="item.flag_uri"></n-image>
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ importance_icon(item.importance) }}</td>
                        <td>{{ item.actual === '' ? '--' : item.actual + item.unit }}</td>
                        <td>{{ item.forecast === '' ? '--' : item.forecast + item.unit }}</td>
                        <td>{{ item.previous === '' ? '--' : item.previous + item.unit }}</td>
                    </tr>
                </tbody>
            </n-table>
        </n-spin>
    </n-flex>
</template>