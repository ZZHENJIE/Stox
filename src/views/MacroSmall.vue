<script lang="js">
import { Format_Time } from '../script/miscellaneous';
import { Akamai_Timestamp, Wallstreetcn_Calendar } from '../script/request';

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
        Format_Time,
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
            <n-gradient-text :class="{ 'animated-gradient': hint_macro_list.length != 0 }" :size="24">
                {{ Format_Time(this.timestamp, 'hh:MM:ss') }}
            </n-gradient-text>
        </n-space>
        <n-space justify="center">
            <n-alert v-show="hint_macro_list.length != 0" type="warning">
                将要有{{ hint_macro_list.length }}条宏观数据,最大影响力 {{ maxImportance() }}
            </n-alert>
        </n-space>
    </n-space>
</template>


<style>
.animated-gradient {
    animation: gradientShift 2s ease infinite;
    background-size: 200% auto;
}

@keyframes gradientShift {
    0% {
        background-image: linear-gradient(to right, #ff0000, #0000ff);
    }

    50% {
        background-image: linear-gradient(to right, #00ff00, #ff00ff);
    }

    100% {
        background-image: linear-gradient(to right, #ff0000, #0000ff);
    }
}
</style>