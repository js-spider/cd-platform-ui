<template>
  <a>{{text}}</a>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>
