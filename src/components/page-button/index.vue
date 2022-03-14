<template>
  <span @click="jumpTo" :style="{ cursor : this.disabled ? 'not-allowed' : 'pointer' }">
    <Tooltip v-if="tooltip">
      <template slot="title">
        {{tooltip}}
      </template>
      <slot name="text">
        <component :is="curType" v-bind="dynamicComponent"></component>
      </slot>
    </Tooltip>
    <span v-else>
      <slot name="text" >
        <component :is="curType"  v-bind="dynamicComponent"></component>
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
    text: [String, undefined],
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
    curText() {
      const { text, $slots } = this;
      if (text) {
        return text;
      } if (Array.isArray($slots.default) && $slots.default.length > 0) {
        return this.$slots.default[0].text;
      }
      return '';
    },
    dynamicComponent() {
      return {
        curText: this.curText,
        disabled: this.disabled,
        ...this.$attrs,
      };
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
