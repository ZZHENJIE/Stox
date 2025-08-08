<script lang="ts">
import Tool from '../../api/Tool';
import Futu from '../../api/Futu';

export default {
    data() {
        return {
            news_data: [] as any[],
            timeoutId: 0,
            isMounted: false,
            level: ['default', 'warning', 'error'],
            Format_Time: Tool.Format_Time
        };
    },
    methods: {
        update() {
            Futu.Flash_News()
                .then(json => {
                    if (this.isMounted) {
                        this.news_data = json.data.data.news;
                        this.timeoutId = setTimeout(() => this.update(), 10000);
                    }
                })
        }
    },
    mounted() {
        this.isMounted = true;
        this.update();
    },
    unmounted() {
        this.isMounted = false;
        clearTimeout(this.timeoutId);
    },
};
</script>

<template>
    <n-flex vertical>
        <n-card v-for="item in news_data" :title="item.title">
            <n-alert :show-icon="false" :type="level[item.level]">
                {{ item.content }}
            </n-alert>
            <template #action>
                {{ Format_Time(item.time, 'hh:MM:ss') }}
            </template>
        </n-card>
    </n-flex>
</template>