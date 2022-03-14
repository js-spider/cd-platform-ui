<template>
  <Button :type="btnType">{{ text }}</Button>
</template>
<script>
import { Button } from 'ant-design-vue';

export default {
  components: { Button },
  props: {
    text: {
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
