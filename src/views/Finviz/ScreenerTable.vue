<script lang="ts">
import { type PropType } from 'vue';
import { NDataTable, type DataTableColumns } from 'naive-ui';
import type { FinvizScreenerItem } from '../../Request';

export default {
  props: {
    modelValue: {
      type: Array as PropType<FinvizScreenerItem[]>,
      required: true,
    }
  },
  setup() {
    const columns: DataTableColumns<FinvizScreenerItem> = [
      {
        title: 'Ticker',
        key: 'Ticker',
        width: 80,
      },
      {
        title: 'Company',
        key: 'Company',
        width: 150
      },
      {
        title: 'Sector/Industry',
        key: 'SectorIndustry',
        render: (row) => `${row.Sector} / ${row.Industry}`,
      },
      {
        title: 'Market Cap',
        key: 'MarketCap',
        render: (row) => row.MarketCap || 'N/A'
      },
      {
        title: 'P/E',
        key: 'PriceEarningsRatio',
        render: (row) => row.PriceEarningsRatio || 'N/A'
      },
      {
        title: 'Price',
        key: 'Price',
      },
      {
        title: 'Change',
        key: 'Change',
      },
      {
        title: 'Volume',
        key: 'Volume',
      }
    ];

    const pagination = {
      pageSize: 50,
      showSizePicker: true,
      pageSizes: [10, 20, 50],
      showQuickJumper: true
    };

    return { columns, pagination };
  }
};
</script>

<template>
  <n-data-table :columns="columns" :data="modelValue" :pagination="pagination" :bordered="false" :striped="true" />
</template>