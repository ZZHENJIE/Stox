<script lang="js">

import { Spac_Research_Calendar } from '../request'

export default {
    data() {
        return {
            data: {},
            eventType: {
                'amendment-vote': 'warning',
                'liq-deadline': 'error',
                'approval-vote': 'info',
                'ipo-date': 'success',
            }
        }
    },
    mounted() {
        this.data = {};
        Spac_Research_Calendar().then(array => {
            for (const item of array) {
                const date = item.date;

                if (!this.data[date]) {
                    this.data[date] = [];
                }

                this.data[date].push({
                    eventType: item.eventType,
                    href: item.href,
                });
            }
        });
    }
}
</script>

<template>
    <n-calendar #="{ year, month, date }" panel="false">
        <n-space justify="center">
            <n-tooltip trigger="hover" v-for="item in data[date]">
                <template #trigger>
                    <n-button strong secondary round :type="eventType[item.eventType]">
                        {{ item.href }}
                    </n-button>
                </template>
                {{ item.eventType }}
            </n-tooltip>
        </n-space>
    </n-calendar>
</template>