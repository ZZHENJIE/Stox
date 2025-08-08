<script lang="ts">
import { Format_Time } from '../utils/Miscellaneous';
import { Akamai_Timestamp, Wallstreetcn_Calendar } from '../api/Request';

export default {
    data() {
        return {
            timestamp: 0,
            timer: 0,
            macro_list: [] as any[],
            hint_macro_list: [] as any[],
            isLoading: true,
        }
    },
    mounted() {

        Akamai_Timestamp().then(text => {
            this.timestamp = parseInt(text);
            this.startTimer();
            this.isLoading = false;
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
        importance_icon(importance: number) {
            let icon = '';
            for (let index = 0; index < importance; index++) {
                icon += '★';
            }
            return icon;
        },
        hint_macro_list_title() {
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
            return `将要有${this.hint_macro_list.length}条宏观数据, 最大影响力${icon}`;
        },
    },
    beforeUnmount() {
        clearInterval(this.timer);
    }
}
</script>

<template>
    <n-flex vertical>
        <n-spin :show="isLoading">
            <n-flex justify="center">
                <n-gradient-text :class="{ 'breathing-element': hint_macro_list.length != 0 }"
                    :size="$Config().macro_small.time_font_size"
                    :style="{ 'color': $Config().macro_small.time_font_color }">
                    {{ Format_Time(timestamp, 'hh:MM:ss') }}
                </n-gradient-text>
            </n-flex>
            <n-flex justify="center">
                <n-card v-if="hint_macro_list.length != 0" :title="hint_macro_list_title">
                    <p v-for="item in hint_macro_list">
                        {{ Format_Time(item.public_date, 'hh:MM:ss') }} {{ item.title }} {{
                            importance_icon(item.importance) }}
                    </p>
                </n-card>
            </n-flex>
        </n-spin>
    </n-flex>
</template>


<style>
.breathing-element {
    animation: breathing 2s infinite ease-in-out;
}

@keyframes breathing {
    0% {
        transform: scale(0.9);
        opacity: 1;
        color: steelblue;
    }

    50% {
        transform: scale(1.1);
        opacity: 1.4;
        color: cadetblue;
    }

    100% {
        transform: scale(0.9);
        opacity: 1;
        color: slateblue;
    }
}
</style>