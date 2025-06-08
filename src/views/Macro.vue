<script lang="js">

import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { Wallstreetcn_Calendar, FormatTime } from '../script/Other'

export default {
    data() {
        return {
            small_window: null,
            macro_list: []
        }
    },
    mounted() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const timestamp = date.getTime() / 1000;
        this.update_data(timestamp, timestamp + 86399);
    },
    methods: {
        FormatTime,
        show_small_window() {
            this.small_window = new WebviewWindow('macro_small_window', {
                title: '宏观',
                url: '/macro_small',
                width: 400,
                height: 200,
            });
        },
        update_data(start, end) {
            Wallstreetcn_Calendar(start, end).then(text => {
                const json = JSON.parse(text);
                this.macro_list = json.data.items;
            })
        },
        select_date(value) {
            const timestamp = value / 1000;
            this.update_data(timestamp, timestamp + 86399);
        },
        importance_icon(importance) {
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
    <n-space vertical>
        <n-space>
            <n-date-picker @update:value="select_date" :default-value="Date.now()" type="date" />
            <n-button @click="show_small_window">小窗口显示</n-button>
        </n-space>
        <n-space justify="center">
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
                        <td>{{ FormatTime(item.public_date, 'hh:MM:ss') }}</td>
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
        </n-space>
    </n-space>
</template>