<template>
  <div class="hx-card">
    <component :is="curComp" v-bind="$attrs" v-on="$listeners"></component>
  </div>
</template>
<script>
import Task from './task.vue';

export default {
  name: 'Card',
  props: {
    type: {
      type: String,
      default: 'task',
    },
  },
  data() {
    return {
      taskList: {
        task: Task,
      },
    };
  },
  computed: {
    curComp() {
      return this.taskList[this.type];
    },
  },
};

</script>
