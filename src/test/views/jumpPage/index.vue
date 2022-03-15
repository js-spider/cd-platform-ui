<template>
  <div>
    <Container>
      <PageButton text="测试跳转链接1" to="http://www.baidu.com"></PageButton><Br/>
      <PageButton  text="刷新"  :to="0" ></PageButton><Br/>
      <PageButton text=" < 返回上一页" tooltip="这是一个测试跳转链接的案例" :to="-1"></PageButton><Br/>
      <PageButton :to="0" >
        <template #text>
          <Icon type="loading-3-quarters" />
        </template>
      </PageButton><Br/>
      <PageButton tooltip="这是一个测试跳转链接的案例" :to="-1" :disabled="true"> << 返回上一页 </PageButton><Br/>
      <PageButton type="button" text="测试跳转链接1" to="http://www.baidu.com"></PageButton><Br/>
      <PageButton  type="button" text="刷新"  :to="0" ></PageButton><Br/>
      <PageButton type="button" text=" < 返回上一页" tooltip="这是一个测试跳转链接的案例" :to="-1"></PageButton><Br/>
      <PageButton type="button" text="当前tab 指定页面" :blank="false" to="http://www.baidu.com" ></PageButton><Br/>
      <PageButton type="button" btnType="danger" text="当前tab 指定页面" :blank="false" to="http://www.baidu.com" ></PageButton><Br/>
      <PageButton  type="button" text="刷新"  :to="0" :disabled="true"></PageButton>
    </Container>
  </div>


</template>
<script>
import PageButton from '@/components/page-button';
import { Icon } from 'ant-design-vue';
import { Container, Br } from '@/test/components';

export default {
  components: {
    PageButton, Icon, Br, Container,
  },
};
</script>
