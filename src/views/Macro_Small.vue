<script lang="js">
import { Akamai_Timestamp, Wallstreetcn_Calendar, FormatTime } from '../script/Other';

export default {
    data() {
        return {
            timestamp: null,
            timer: null,
            macro_list: [],
            hint_macro_list: []
        }
    },
    mounted() {
        Akamai_Timestamp().then(text => {
            this.timestamp = parseInt(text);
            this.startTimer();
        }).catch(error => {
            console.error('获取时间戳失败:', error);
            this.timestamp = Math.floor(Date.now() / 1000);
            this.startTimer();
        });

        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const timestamp = date.getTime() / 1000;
        Wallstreetcn_Calendar(timestamp, timestamp + 86399).then(text => {
            const json = JSON.parse(text);
            this.macro_list = json.data.items;
        })
    },
    methods: {
        FormatTime,
        startTimer() {
            if (this.timer) clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.timestamp++;
                this.hint_macro_list = [];
                if ((this.timestamp + 28800) % 86400 === 0) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
                for (const item of this.macro_list) {
                    if (item.country_id === 'US' && item.public_date < (this.timestamp + 300) && this.timestamp < item.public_date) {
                        this.hint_macro_list.push(item);
                    }
                }
            }, 1000);
        },
        maxImportance() {
            let importance = 0;
            for (const item of this.hint_macro_list) {
                if (item.importance > importance) {
                    importance = item.importance;
                }
            }
            let icon = '';
            for (let index = 0; index < importance; index++) {
                icon += '★';
            }
            return icon;
        }
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
}
</script>

<template>
    <n-space vertical>
        <n-space justify="center">
            <n-gradient-text>
                {{ FormatTime(this.timestamp, 'hh:MM:ss') }}
            </n-gradient-text>
        </n-space>
        <n-space justify="center">
            <n-alert v-show="hint_macro_list.length != 0" type="warning">
                将要有{{ hint_macro_list.length }}条宏观数据,最大影响力 {{ maxImportance() }}
            </n-alert>
        </n-space>
    </n-space>
</template>