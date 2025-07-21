<script lang="ts">
import { Iposcoop_Calendar, type IPOItem } from '../utils/Request';

export default {
    data() {
        return {
            is_loading: true,
            calendar_data: [] as IPOItem[]
        }
    },
    mounted() {
        Iposcoop_Calendar().then(data => {
            this.calendar_data = data;
            this.is_loading = false;
        })
    },
}

</script>

<template>
    <n-flex justify="center">
        <NSpin :show="is_loading">
            <n-table :single-line="false">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Symbol</th>
                        <th>Managers</th>
                        <th>Shares (Millions)</th>
                        <th>Price Low</th>
                        <th>Price High</th>
                        <th>Estimated Dollar Volume</th>
                        <th>Expected Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in calendar_data">
                        <td>
                            <n-ellipsis :line-clamp="1">
                                {{ item.Company }}
                            </n-ellipsis>
                        </td>
                        <td>{{ item.Symbol }}</td>
                        <td>
                            <n-ellipsis :line-clamp="1">
                                {{ item.Managers }}
                            </n-ellipsis>
                        </td>
                        <td>{{ item.Shares_Millions }}</td>
                        <td>{{ item.Price_Low }}</td>
                        <td>{{ item.Price_High }}</td>
                        <td>{{ item.Estimated_Dollar_Volume }}</td>
                        <td>
                            <n-ellipsis :line-clamp="1">
                                {{ item.Expected_Date }}
                            </n-ellipsis>
                        </td>
                    </tr>
                </tbody>
            </n-table>
        </NSpin>
    </n-flex>
</template>