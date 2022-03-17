<template>
  <component
    :is="current"
    :attributes="attributes"
    v-bind="$attrs"
    @change="propHandleChange"
  >
    <span v-if="type === 'file'" @click="clickHandle">
      <span v-if="!$slots.default">
        <Button><Icon type="upload" /> 点击上传 </Button>
        <span v-if="!$slots.tip && tip" class="color-red ml8 font-mini">
           {{ `单个文件最大 ${maxSize} M,最多上传 ${maxNum} 个文件`}}
        </span>
        <span v-else>
          <slot name="tip"></slot>
        </span>
      </span>
      <span v-else>
        <slot></slot>
      </span>
    </span>
  </component>
</template>

<script>
import {
  Button, Icon, message, Modal,
} from 'ant-design-vue';
import File from './file.vue';
import Image from './image.vue';

const { confirm } = Modal;

export default {
  name: 'Upload',
  components: { Button, Icon },
  props: {
    type: {
      type: String,
      default: 'file',
    },
    name: {
      type: String,
      default: 'file',
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    fileList: {
      type: Array,
      default() {
        return [];
      },
    },
    maxSize: {
      type: [Number, String],
      default: 100,
    },
    maxNum: {
      type: [Number, String],
      default: 10,
    },
    tip: {
      type: Boolean,
      default: true,
    },
    accept: Array,
    asyncUpload: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
  data() {
    return {
      status: '',
      currentFileList: [],
      fileListNum: 0,
      checkResult: true,
      errorMess: '',
      hasShowError: false,
    };
  },
  computed: {
    current() {
      return this.type === 'file' ? File : Image;
    },
    attributes() {
      const {
        name, multiple, currentFileList,
      } = this;
      return {
        name,
        multiple,
        fileList: currentFileList,
        showUploadList: {
          showDownloadIcon: true,
          showRemoveIcon: true,
        },
      };
    },
    acceptTypes() {
      const { type, accept } = this;
      if (Array.isArray(accept) && accept.length > 0) {
        return accept;
      } if (type === 'file') {
        return ['image/png'];
      }
      return [];
    },
  },
  watch: {
    fileList: {
      immediate: true,
      handler(val) {
        if (Array.isArray(val)) {
          this.currentFileList = val.map((item) => {
            item.status = 'done';
            item.older = true;
            return item;
          });
          this.fileListNum = val.length;
        }
      },
    },
  },
  methods: {
    propHandleChange(type, options) {
      if (this[type]) {
        this[type](options);
      } else {
        throw new Error(`upload 子组件 $emit: ${type} 事件异常`);
      }
    },
    clickHandle() {
      this.fileListNum = this.fileList.length;
      this.currentFileList = this.fileList;
      this.checkResult = true;
      this.errorMess = '';
      this.hasShowError = false;
    },
    beforeUpload({ file, fileList }) {
      const { checkResult } = this;
      if (!checkResult) return;
      this.fileListNum = this.fileList.length + fileList.length;
      const { flag, errorMess } = this.checkFailed(file);
      this.checkResult = flag;
      this.errorMess = errorMess;
    },
    checkFailed(file) {
      let flag = true;
      let errorMess = '';
      const {
        maxNum, maxSize, accept, fileListNum,
      } = this;
      if (fileListNum > maxNum) {
        errorMess = `最多上传${maxNum}个文件!`;
        flag = false;
      }
      if (file.size > 1024 * 1024 * maxSize) {
        errorMess = `${file.name}单个文件超过最大${maxSize}M`;
        flag = false;
      }
      // 暂时先不设置
      if (accept && !accept.includes(file.type)) {
        errorMess = `${file.name} 文件类型不符合 ${accept}`;
      }
      return {
        flag,
        errorMess,
      };
    },
    showMess(mes) {
      message.error(mes);
    },
    handleChange(info) {
      if (this.checkResult) {
        const { file, fileList } = info;
        if (file.status === 'uploading') {
          this.currentFileList = fileList;
        } else if (['done', 'error'].includes(file.status)) {
          if (this.fileListNum === info.fileList.length) {
            const uploading = info.fileList.filter((item) => item.status === 'uploading');
            if (uploading.length === 0) {
              const successList = this.fileList;
              const
                errorList = [];
              info.fileList.forEach((item) => {
                const newItem = this.formatResData(item);
                if (item.status === 'done' && !item.older) successList.push(newItem);
                if (item.status === 'error' && !item.older) errorList.push(newItem);
              });
              this.cycleLife('uploaded', {
                fileList: successList,
                errorList,
              });
            }
          }
        } else if (file.status === 'removed') {
          confirm({
            text: '删除确认',
            content: '是否要删除该文件？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
              this.currentFileList = fileList;
              this.cycleLife('removed', {
                file: info,
                fileList: info.fileList.map((item) => this.formatResData(item)),
              });
            },
          });
        }
      }
    },
    formatResData(item) {
      item.response = item.response || {};
      const newItem = {
        ...item,
        ...item.response,
      };
      return newItem;
    },
    cycleLife(lifeStatus, data) {
      const { status } = this;
      if (lifeStatus === 'uploading' && status === lifeStatus) return;
      this.status = lifeStatus;
      this.$emit('change', {
        type: 'cycleLife',
        status: lifeStatus,
        data,
      });
    },
    customRequest(options) {
      if (this.checkResult) {
        const { file, onSuccess, onError } = options;
        this.cycleLife('uploading');
        const formData = new FormData();
        formData.append('files', file);
        this.dmdUpload({
          formData, onSuccess, onError, file,
        });
      } else if (!this.hasShowError) {
        this.showMess(this.errorMess);
        this.hasShowError = true;
      }
    },
    dmdUpload({
      formData, onSuccess, onError, file,
    }) {
      const { asyncUpload } = this;
      if (asyncUpload) {
        Promise.resolve().then(() => asyncUpload(formData)).then(({ code, data }) => {
          if (code === 200) {
            onSuccess(data);
          } else {
            message.error(`${file.name}上传失败 ${data.message || ''}`);
            onError(data);
          }
        });
      }
    },
  },
};
</script>
