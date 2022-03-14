<template>
  <div>
    <Container>
      <Pj text="测试跳转链接1" to="http://www.baidu.com"></Pj><Br/>
      <Pj  text="刷新"  :to="0" ></Pj><Br/>
      <Pj text=" < 返回上一页" tooltip="这是一个测试跳转链接的案例" :to="-1"></Pj><Br/>
      <Pj  text="slot"  :to="0" >
        <template #text>
          <Icon type="loading-3-quarters" />
        </template>
      </Pj><Br/>
      <Pj tooltip="这是一个测试跳转链接的案例" :to="-1" :disabled="true"> << 返回上一页 </Pj><Br/>
      <Pj type="button" text="测试跳转链接1" to="http://www.baidu.com"></Pj><Br/>
      <Pj  type="button" text="刷新"  :to="0" ></Pj><Br/>
      <Pj type="button" text=" < 返回上一页" tooltip="这是一个测试跳转链接的案例" :to="-1"></Pj><Br/>
      <Pj type="button" text="当前tab 指定页面" :blank="false" to="http://www.baidu.com" ></Pj><Br/>
      <Pj type="button" btnType="danger" text="当前tab 指定页面" :blank="false" to="http://www.baidu.com" ></Pj><Br/>
      <Pj  type="button" text="刷新"  :to="0" :disabled="true"></Pj>
    </Container>
  </div>


</template>
<script>
import Pj from '@/components/page-button';
import { Icon } from 'ant-design-vue';
import { Container, Br } from '@/test/components';

export default {
  components: {
    Pj, Icon, Br, Container,
  },
};
</script>
