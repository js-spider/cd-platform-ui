<template>
  <Container style="height: 100%;">
    <Table :columns="columns" :data-source="dataSource"></Table>
  </Container>
</template>
<script>
import Table from '@/components/table';

export default {
  components: { Table },
  data() {
    const columns = this.getColumns();
    const dataSource = this.getSource();
    return {
      columns,
      dataSource,
    };
  },
  methods: {
    getColumns() {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          click: (text, record) => {
            console.log('index.vue: 27 >>>>> ', text, record);
            window.open('http://www.baidu.com', '_blank');
          },
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'status',
          dataIndex: 'status',
          key: 'status',
          colors: {
            success: 'green',
            failed: 'red',
          },
        },
        {
          title: '状态',
          dataIndex: 'statusText',
          key: 'statusText',
          width: 80,
          link: 'status',
          pointColors: {
            success: 'success',
            failed: 'error',
          },
        },
        {
          title: '属性',
          dataIndex: 'attribute',
          key: 'attribute',
          width: 80,
          map: [[true, '私有'], [false, '公开']],
        },
        {
          title: '时间（fromNow）',
          dataIndex: 'date',
          key: 'date',
          ellipsis: true,
          fromNow: true,
          // format: 'YYYY-MM-DD',
        },
        {
          title: '时间',
          dataIndex: 'date2',
          key: 'date2',
          format: 'YYYY-MM-DD',
        },
        {
          title: 'Long Column Long Column',
          dataIndex: 'address',
          key: 'address 3',
          ellipsis: true,
        },
        {
          title: 'Long Column',
          dataIndex: 'address',
          key: 'address 4',
          ellipsis: true,
        },
      ];
    },
    getSource() {
      return [
        {
          key: `${Math.random()}1`,
          name: 'John Brown',
          status: 'success',
          age: 32,
          attribute: true,
          statusText: '成功',
          date: '2022-03-18 15:20:00',
          date2: '2022-03-18 15:20:00',
          address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: `${Math.random()}1`,
          name: 'John Brown',
          status: 'failed',
          statusText: '失败',
          age: 32,
          attribute: true,
          date: '2022-03-18 15:20:00',
          date2: '2022-03-18 15:20:00',
          tags: ['nice', 'developer'],
        },
        {
          key: `${Math.random()}1`,
          name: 'John Brown',
          status: 'failed',
          statusText: '失败',
          age: 32,
          attribute: false,
          date: '2022-03-17 8:20:00',
          date2: '2022-03-17 8:20:00',
          tags: ['nice', 'developer'],
        },
        {
          key: `${Math.random()}1`,
          name: 'John Brown',
          status: 'success',
          statusText: '成功',
          age: 32,
          attribute: false,
          date: '2022-03-18 15:20:00',
          date2: '2022-03-18 15:20:00',
          tags: ['nice', 'developer'],
        },
      ];
    },
  },
};
</script>
