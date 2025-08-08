<script lang="ts">
import Futu from '../../api/Futu';
import Tool from '../../api/Tool';
import { ArrowBackCircle, ArrowForwardCircle } from '@vicons/ionicons5';

export default {
    components: {
        ArrowBackCircle,
        ArrowForwardCircle
    },
    data() {
        return {
            calendar_data: [] as any[],
            timestamp: 0,
            Format_Time: Tool.Format_Time
        }
    },
    methods: {
        change_timestamp(isNext: boolean) {
            this.timestamp = this.timestamp + (isNext ? +86400000 : -86400000);
        }
    },
    mounted() {
        this.timestamp = Date.now();
    },
    watch: {
        timestamp() {
            Futu.Financial_Calendar(this.timestamp).then(json => {
                this.calendar_data = json.data.list;
            });
        }
    }
}

</script>

<template>
    <n-flex vertical>
        <n-flex justify="center">
            <n-button @click="change_timestamp(false)" secondary>
                <n-icon size="25px">
                    <ArrowBackCircle />
                </n-icon>
            </n-button>
            <n-button @click="change_timestamp(true)" secondary>
                <n-icon size="25px">
                    <ArrowForwardCircle />
                </n-icon>
            </n-button>
            <n-button>{{ Format_Time(timestamp, 'yyyy-mm-dd') }}</n-button>
        </n-flex>
        <n-table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Predict</th>
                    <th>Actual</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in calendar_data">
                    <td>
                        <n-flex>
                            {{ item.code }}
                        </n-flex>
                    </td>
                    <td>{{ item.predicativeValue }}</td>
                    <td>{{ item.actualValue }}</td>
                </tr>
            </tbody>
        </n-table>
    </n-flex>
</template>