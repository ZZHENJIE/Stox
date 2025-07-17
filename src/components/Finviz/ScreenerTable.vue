<script lang="ts">
import { h, type PropType } from 'vue';
import { NDataTable, type DataTableColumns, NTooltip } from 'naive-ui';
import type { FinvizScreenerItem } from '../../Request';

export default {
  props: {
    modelValue: {
      type: Array as PropType<FinvizScreenerItem[]>,
      required: true,
    }
  },
  setup() {
    const renderEllipsis = (text: string, width: string = '150px') => {
      return h('div', {
        style: {
          width: width,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, [
        h(NTooltip, {
          trigger: 'hover'
        }, {
          trigger: () => text,
          default: () => text
        })
      ]);
    };
    const renderChange = (value: number) => {
      const color = value > 0 ? '#90EE90' : '#DB7093';
      return h('span', {
        style: {
          color: color
        }
      }, value + '%');
    };

    const columns: DataTableColumns<FinvizScreenerItem> = [
      {
        title: 'Ticker',
        key: 'Ticker',
        width: 80,
      },
      {
        title: 'Company',
        key: 'Company',
        width: 150,
        render: (row) => renderEllipsis(row.Company, '150px')
      },
      {
        title: 'Sector/Industry',
        key: 'SectorIndustry',
        width: 200,
        render: (row) => renderEllipsis(`${row.Sector} / ${row.Industry}`, '200px')
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
        render: (row) => renderChange(parseFloat(row.Change))
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
  <n-data-table :columns="columns" :data="modelValue" :pagination="pagination" />
</template>