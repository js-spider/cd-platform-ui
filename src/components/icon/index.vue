<template>
  <span>
    <span v-if="theme === 'iconfont'">
      <svg class="icon" aria-hidden="true">
      <use v-bind:xlink:href="currentType"></use>
    </svg>
    </span>
    <span v-else>
      <Icon :type="type" :theme="theme"></Icon>
    </span>
  </span>
</template>
<script>

import '@/assets/iconfont/iconfont';
import { Icon } from 'ant-design-vue';

export default {
  components: { Icon },
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
