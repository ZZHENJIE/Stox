<script lang="ts">
import { h, type PropType } from 'vue';
import { NDataTable, type DataTableColumns, NEllipsis } from 'naive-ui';
import type { FinvizScreenerItem } from '../../api/Type';


export default {
  props: {
    modelValue: {
      type: Array as PropType<FinvizScreenerItem[]>,
      required: true,
    }
  },
  setup() {
    const renderChange = (value: number) => {
      const color = value > 0 ? '#90EE90' : '#DB7093';
      return h(NEllipsis, {
        style: {
          color: color
        },
        lineClamp: 1
      }, () => value + '%');
    };

    const columns: DataTableColumns<FinvizScreenerItem> = [
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'Ticker'),
        key: 'Ticker',
        width: '80px',
        render: (row) => h(NEllipsis, { lineClamp: 1 }, () => row.Symbol)
      },
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'Company'),
        key: 'Company',
        render: (row) => h(NEllipsis, { lineClamp: 1 }, () => row.Company)
      },
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'Sector/Industry'),
        key: 'SectorIndustry',
        render: (row) => h(NEllipsis, { lineClamp: 1 }, () => `${row.Sector} / ${row.Industry}`)
      },
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'Market Cap'),
        key: 'MarketCap',
        width: '100px',
        render: (row) => h(NEllipsis, { lineClamp: 1 }, () => row.MarketCap || 'N/A'),
      },
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'P/E'),
        key: 'PriceEarningsRatio',
        width: '100px',
        render: (row) => h(NEllipsis, { lineClamp: 1 }, () => row.PriceEarningsRatio || 'N/A'),
      },
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'Price'),
        key: 'Price',
        width: '100px',
        render: (row) => h(NEllipsis, { lineClamp: 1 }, () => row.Price),
      },
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'Change'),
        key: 'Change',
        width: '100px',
        render: (row) => renderChange(parseFloat(row.Change)),
      },
      {
        title: () => h(NEllipsis, { lineClamp: 1 }, () => 'Volume'),
        key: 'Volume',
        width: '100px',
        render: (row) => h(NEllipsis, { lineClamp: 1 }, () => row.Volume)
      }
    ];

    const pagination = {
      pageSize: 50,
      pageSizes: [10, 20, 50],
      showSizePicker: true,
      showQuickJumper: true
    };

    return { columns, pagination };
  }
};
</script>

<template>
  <NDataTable :columns="columns" :data="modelValue" :pagination="pagination" />
</template>