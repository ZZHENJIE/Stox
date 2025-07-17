<script lang="ts">
import { Format_Time } from '../../Miscellaneous';
import { Futu_Flash_News } from '../../Request';

export default {
    data() {
        return {
            news_data: [] as any[],
            timeoutId: 0,
            isMounted: false,
            level: ['default', 'warning', 'error']
        };
    },
    methods: {
        Format_Time,
        update() {
            Futu_Flash_News()
                .then(text => {
                    if (this.isMounted) {
                        this.news_data = JSON.parse(text).data.data.news;
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