import { h } from "vue";
import type { FinvizScreenerItem } from "../api/Type";

function ScreenerTable(array: FinvizScreenerItem[]) {
    return h('div', "ScreenerTable");
}

function ScreenerCharts(array: FinvizScreenerItem[]) {
    return h('div', "ScreenerCharts");
}

export default {
    ScreenerTable,
    ScreenerCharts
}

