<script lang="js">

import { Cboe_Book_Viewer } from '../script/Other';
import { Cboe_Book_Viewer_Temp_Data } from '../script/Temp';

export default {
    data() {
        return {
            symbol: '',
            isWhile: true,
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

    },
    methods: {
        inputChange(value) {
            this.isWhile = false;
        },
        confirm() {
            this.isWhile = true;
            this.BZX_Get();
            this.BYX_Get();
            this.EDGX_Get();
            this.EDGA_Get();
        },
        BZX_Get() {
            Cboe_Book_Viewer(this.symbol, 'bzx').then(text => {
                this.Book_Data[0].Data = JSON.parse(text);
                if (this.isWhile) {
                    this.BZX_Get();
                }
            })
        },
        BYX_Get() {
            Cboe_Book_Viewer(this.symbol, 'byx').then(text => {
                this.Book_Data[1].Data = JSON.parse(text);
                if (this.isWhile) {
                    this.BYX_Get();
                }
            })
        },
        EDGX_Get() {
            Cboe_Book_Viewer(this.symbol, 'edgx').then(text => {
                this.Book_Data[2].Data = JSON.parse(text);
                if (this.isWhile) {
                    this.EDGX_Get();
                }
            })
        },
        EDGA_Get() {
            Cboe_Book_Viewer(this.symbol, 'edga').then(text => {
                this.Book_Data[3].Data = JSON.parse(text);
                if (this.isWhile) {
                    this.EDGA_Get();
                }
            })
        },
    }
}


</script>

<template>
    <n-space vertical>
        <n-space>
            <n-input maxlength="10" @input="inputChange" v-model:value="symbol" type="text" placeholder="Symbol" />
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