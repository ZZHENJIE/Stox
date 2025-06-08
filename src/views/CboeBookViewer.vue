<script lang="js">

import { Cboe_Book_Viewer } from '../script/Other';
import { Cboe_Book_Viewer_Temp_Data } from '../script/Temp';

export default {
    data() {
        return {
            symbol: '',
            Book_Data: [
                {
                    'Market': 'BZX',
                    'Data': Cboe_Book_Viewer_Temp_Data.Bzx
                },
                {
                    'Market': 'BYX',
                    'Data': Cboe_Book_Viewer_Temp_Data.Byx
                },
                {
                    'Market': 'EDGX',
                    'Data': Cboe_Book_Viewer_Temp_Data.Edgx
                },
                {
                    'Market': 'EDGA',
                    'Data': Cboe_Book_Viewer_Temp_Data.Edga
                }
            ]
        }
    },
    mounted() {
        // Cboe_Book_Viewer('NVDA', 'bzx').then(text => {

        // })
    },
    methods: {
        confirm() {

        }
    }
}


</script>

<template>
    <n-space vertical>
        <n-space>
            <n-input v-model:value="symbol" type="text" placeholder="Symbol" />
            <n-button @click="confirm">确认</n-button>
        </n-space>
        <n-space justify="center">
            <n-table>
                <thead>
                    <tr>
                        <th>Market</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Update Time</th>
                        <th>Market</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Deep</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in Book_Data">
                        <td>{{ item.Market }}</td>
                        <td>{{ item.Data.data.bids[0][1] }}</td>
                        <td>{{ item.Data.data.bids[0][0] }}</td>
                        <td>{{ item.Data.data.timestamp }}</td>
                        <td>{{ item.Market }}</td>
                        <td>{{ item.Data.data.asks[0][1] }}</td>
                        <td>{{ item.Data.data.asks[0][0] }}</td>
                        <td>
                            <n-tooltip trigger="hover">
                                <template #trigger>
                                    <n-button>Viewer</n-button>
                                </template>
                                <n-space>
                                    <n-table>
                                        <thead>
                                            <tr>
                                                <th>Price</th>
                                                <th>Size</th>
                                            </tr>
                                        </thead>
                <tbody>
                    <tr v-for="bids_item in item.Data.data.bids">
                        <td>{{ bids_item[1] }}</td>
                        <td>{{ bids_item[0] }}</td>
                    </tr>
                </tbody>
            </n-table>
            <n-table>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="asks_item in item.Data.data.asks">
                        <td>{{ asks_item[1] }}</td>
                        <td>{{ asks_item[0] }}</td>
                    </tr>
                </tbody>
            </n-table>
        </n-space>

        </n-tooltip>
        </td>
        </tr>
        </tbody>
        </n-table>
    </n-space>
    </n-space>
</template>