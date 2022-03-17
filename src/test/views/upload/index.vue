<template>
  <Container>
    <FileUpload
      max-num="6"
      :asyncUpload="uploadFn"
      :file-list="fileList"
      @change="uploadChangeHandle"
    >
    </FileUpload>
  </Container>
</template>

<script>

import FileUpload from '@/components/upload';
import '@/components/upload/style/index.less';

export default {
  components: { FileUpload },
  data() {
    return {
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'yyy.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    };
  },
  methods: {
    uploadChangeHandle(uploader) {
      if (uploader.status === 'uploaded') {
        console.log('index.vue: 28 >>>>> ', uploader);
        this.fileList = uploader.data.fileList.map((item) =>
          /* item.status = 'done';
          item.url = 'http://www.baidu.com/xxx.png';
          item.response = {
            path: 'http://cd-platform.test-6.huobiapps.com/attachment/work-attachments/20220316/3fa764d6-a545-11ec-b654-fe5f21d6be31.xlsx',
          }; */
          item);
      }
    },
    uploadFn() {
      return new Promise((res) => {
        setTimeout(() => {
          res({
            code: 200,
            data: {
              path: Math.random(),
            },
          });
        }, 2000);
      });
    },
  },
};
</script>
