<script lang="ts">
import { Format_Time } from '../Miscellaneous';
import { Akamai_Timestamp, Wallstreetcn_Calendar } from '../Request';

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
        getComplementaryColor(hexColor: string) {
            // 如果是类似 'red' 的颜色名，先转换成 HEX
            if (!hexColor.startsWith('#')) {
                const ctx = document.createElement('canvas').getContext('2d');
                if (ctx) {
                    ctx.fillStyle = hexColor;
                    hexColor = ctx.fillStyle;
                }
            }

            // 计算补色（反转 RGB）
            const r = (255 - parseInt(hexColor.slice(1, 3), 16)).toString(16).padStart(2, '0');
            const g = (255 - parseInt(hexColor.slice(3, 5), 16)).toString(16).padStart(2, '0');
            const b = (255 - parseInt(hexColor.slice(5, 7), 16)).toString(16).padStart(2, '0');

            return `#${r}${g}${b}`;
        }
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
                <n-gradient-text :class="{ 'animated-gradient': hint_macro_list.length != 0 }"
                    :size="$Config().macro_small.time_font_size" :style="{
                        'color': $Config().macro_small.time_font_color,
                        '--gradient-start': $Config().macro_small.time_font_color,
                        '--gradient-end': getComplementaryColor($Config().macro_small.time_font_color)
                    }">
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
.animated-gradient {
    animation: gradientShift 2s ease infinite;
    background-size: 200% auto;
    background-image: linear-gradient(to right, var(--gradient-start), var(--gradient-end));
}

@keyframes gradientShift {
    0% {
        background-position: 0% center;
    }

    50% {
        background-position: 100% center;
    }

    100% {
        background-position: 0% center;
    }
}
</style>