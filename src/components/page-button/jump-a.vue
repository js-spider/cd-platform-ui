<template>
  <a>{{curText}}</a>
</template>
<script>
export default {
  props: {
    curText: {
      type: String,
      default: '',
    },
  },
};
</script>
