<template>
  <Upload
    v-bind="attributes"
    :before-upload="beforeUpload"
    :customRequest="customRequest"
    @change="handleChange"
    @download="handleDownload"
  >
    <slot></slot>
  </Upload>
</template>
<script>
import { Upload } from 'ant-design-vue';
import { handleDownload } from '@/utils/tools.js';

export default {
  components: { Upload },
  props: {
    attributes: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    handleDownload,
    customRequest(options) {
      this.$emit('change', 'customRequest', options);
    },
    handleChange(options) {
      this.$emit('change', 'handleChange', options);
    },
    beforeUpload(file, fileList) {
      this.$emit('change', 'beforeUpload', {
        file, fileList,
      });
    },
  },
};
</script>
