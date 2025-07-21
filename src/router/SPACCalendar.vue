<script lang="ts">
import { Document, CheckmarkCircle, Calendar, Warning } from '@vicons/ionicons5'
import { Spac_Research_Calendar, type SPACItem } from '../utils/Request';

interface GroupedItem {
    date: string | undefined;
    array: SPACItem[];
}

export default {
    components: {
        Document,
        CheckmarkCircle,
        Calendar,
        Warning
    },
    data() {
        return {
            calendar_data: [] as GroupedItem[],
            isLoading: true,
        }
    },
    mounted() {
        Spac_Research_Calendar().then((array: SPACItem[]) => {
            const groupedData = array.reduce((acc: GroupedItem[], current: SPACItem) => {
                const existingGroup = acc.find(item => item.date === current.date);

                if (existingGroup) {
                    existingGroup.array.push(current);
                } else {
                    acc.push({
                        date: current.date,
                        array: [current]
                    });
                }

                return acc;
            }, []);

            this.calendar_data = groupedData;
            this.isLoading = false;
        }).catch(error => {
            console.error('Error fetching calendar data:', error);
            this.isLoading = false;
        });
    },
    methods: {
        getButtonType(eventType: string | undefined) {
            if (!eventType) return 'default';
            const typeMap: Record<string, string> = {
                'amendment-vote': 'warning',
                'approval-vote': 'success',
                'ipo-date': 'info',
                'liq-deadline': 'error'
            }
            return typeMap[eventType] || 'default'
        },
        getEventIcon(eventType: string | undefined) {
            if (!eventType) return Document;
            const iconMap: Record<string, any> = {
                'amendment-vote': Document,
                'approval-vote': CheckmarkCircle,
                'ipo-date': Calendar,
                'liq-deadline': Warning
            }
            return iconMap[eventType] || Document
        }
    }
}
</script>

<template>
    <n-flex vertical>
        <n-space justify="center">
            <n-button strong secondary block size="small" type="warning">
                <template #icon>
                    <n-icon>
                        <Document />
                    </n-icon>
                </template>
                修正案投票
            </n-button>

            <n-button strong secondary block size="small" type="success">
                <template #icon>
                    <n-icon>
                        <CheckmarkCircle />
                    </n-icon>
                </template>
                合并批准投票
            </n-button>

            <n-button strong secondary block size="small" type="info">
                <template #icon>
                    <n-icon>
                        <Calendar />
                    </n-icon>
                </template>
                上市日
            </n-button>

            <n-button strong secondary block size="small" type="error">
                <template #icon>
                    <n-icon>
                        <Warning />
                    </n-icon>
                </template>
                清算截止日
            </n-button>
        </n-space>
        <n-spin :show="isLoading">
            <n-flex justify="center">
                <n-card v-for="item in calendar_data" :key="item.date" :title="`Date: ${item.date}`"
                    style="width: 230px;height: 200px;">
                    <template #header-extra>
                        <n-tag :bordered="false" type="info" size="small">
                            {{ item.array.length }} Item{{ item.array.length > 1 ? 's' : '' }}
                        </n-tag>
                    </template>
                    <n-flex justify="center">
                        <NButton style="width: 80px;" v-for="spac_item in item.array" :key="spac_item.href" strong
                            secondary size="small" block :type="getButtonType(spac_item.eventType)">
                            {{ spac_item.href }}
                        </NButton>
                    </n-flex>
                </n-card>
            </n-flex>
        </n-spin>
    </n-flex>
</template>

<style scoped>
.empty-state {
    text-align: center;
    padding: 20px;
    color: #999;
}
</style>