import Vue from 'vue';
import BaseTestComp from '@/test/components';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = false;


Vue.use(BaseTestComp);
new Vue({
  router,
  store,
  data() {
    return {
      $bus: new Vue(),
    };
  },
  render: (h) => h(App),
}).$mount('#app');
