<script lang="ts">
import { Format_Time } from '../../Miscellaneous';
import { Futu_Stock_News } from '../../Request';

export default {
    props: {
        stockId: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            info_list: [] as any[]
        }
    },
    methods: {
        Format_Time
    },
    mounted() {
        Futu_Stock_News(this.stockId).then(text => {
            const json = JSON.parse(text);
            this.info_list = json.data.list;
        })
    }
}

</script>

<template>
    <n-list>
        <n-list-item v-for="item in info_list">
            <n-card :title="item.stockSymbol">
                <n-ellipsis expand-trigger="click" line-clamp="2">
                    {{ item.title }}
                </n-ellipsis>
                <template #action>
                    {{ item.source }} {{ Format_Time(item.time, 'yyyy-mm-dd hh:MM:ss') }}
                </template>
            </n-card>
        </n-list-item>
    </n-list>
</template>