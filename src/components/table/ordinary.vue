<template>
  <Table
    class="virtual-team-table"
    :pagination="false"
    :columns="columns"
    :data-source="dataSource"
  >
  </Table>
</template>
<script>
import { Table } from 'ant-design-vue';


export default {
  components: { Table },
  props: {
    columns: Array,
    dataSource: Array,
  },
  data() {
    return {
      scrollY: 800,
    };
  },
  computed: {
    scroll() {
      const scroll = {};
      if (this.scrollY) {
        scroll.y = this.scrollY;
      }
      return scroll;
    },
  },
  mounted() {
    // this.setHeight();
    // this.windowResize();
  },
  methods: {
    setHeight() {
      setTimeout(() => {
        const container = document.querySelector('.virtual-team-container');
        this.scrollY = container.clientHeight - 160;
      }, 0);
    },
    windowResize() {
      window.addEventListener('resize', () => {
        this.setHeight();
      });
    },
  },
};
</script>
<style lang="less" scoped>
  .virtual-team-table{
    height: 100%;
  }
</style>
