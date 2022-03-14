<template>
  <span @click="jumpTo">
    <Tooltip v-if="tooltip">
      <template slot="title">
        {{tooltip}}
      </template>
      <slot name="text">
        <component v-if="curType" :is="curType" v-bind="$attrs" :disabled="disabled"></component>
      </slot>
    </Tooltip>
    <span v-else>
      <slot name="text" >
        <component  :is="curType" v-bind="$attrs" :disabled="disabled"></component>
      </slot>
    </span>
  </span>
</template>
<script>
import { Tooltip } from 'ant-design-vue';
import A from './jump-a.vue';
import B from './jump-button.vue';

const typeMap = { A, B };
export default {
  components: { Tooltip },
  props: {
    type: {
      type: String,
      default: 'a',
    },
    to: [String, Number],
    tooltip: String,
    blank: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    curType() {
      const TYPE = this.type.toUpperCase();
      let cur = null;
      switch (TYPE) {
        case 'A': cur = typeMap.A; break;
        case 'BUTTON': cur = typeMap.B; break;
        default: cur = typeMap.A;
      }
      return cur;
    },
  },
  methods: {
    jumpTo() {
      const { to, disabled } = this;
      if (disabled) return;
      if (typeof to === 'string') {
        window.open(to, this.blank ? '_blank' : '_self');
      } else if (typeof to === 'number') {
        window.history.go(to);
      }
    },
  },
};
</script>
