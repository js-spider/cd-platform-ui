<template>
  <component :is="currentType" :columns="formatColumns" :data-source="dataSource"></component>
</template>

<script>
import Ordinary from './ordinary.vue';
import { formatColumns } from './tableTool';

const tables = {
  ordinary: Ordinary,
};


export default {
  props: {
    type: {
      type: String,
      default: 'ordinary',
    },
    columns: Array,
    dataSource: Array,
  },
  data() {
    const columns = formatColumns(this.columns);
    return {
      formatColumns: columns,
    };
  },
  computed: {
    currentType() {
      return tables[this.type];
    },
  },
};
</script>
