<template>
  <span>
    <span v-if="theme === 'iconfont'">
      <svg class="icon" aria-hidden="true">
      <use v-bind:xlink:href="currentType"></use>
    </svg>
    </span>
    <span v-else>
      <AntIcon :type="type" :theme="theme"></AntIcon>
    </span>
  </span>
</template>
<script>

import '@/assets/iconfont/iconfont';
import { Icon as AntIcon } from 'ant-design-vue';

export default {
  components: { AntIcon },
  props: {
    type: String,
    theme: String,
  },
  computed: {
    currentType() {
      return `#icon-${this.type}`;
    },
  },
};
</script>
