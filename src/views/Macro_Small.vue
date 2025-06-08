<script lang="js">
import { Akamai_Timestamp, FormatTime } from '../script/Other';

export default {
    data() {
        return {
            timestamp: null,
            timer: null
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
    },
    methods: {
        FormatTime,
        startTimer() {
            if (this.timer) clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.timestamp++;
            }, 1000);
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
            <p>{{ FormatTime(this.timestamp, 'hh:MM:ss') }}</p>
        </n-space>
    </n-space>
</template>