<template>
  <Button :type="btnType">{{ curText }}</Button>
</template>
<script>
import { Button } from 'ant-design-vue';

export default {
  components: { Button },
  props: {
    curText: {
      type: String,
      default: '',
    },
    btnType: {
      type: String,
      default: 'primary',
    },
  },
};
</script>
