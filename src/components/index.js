import Card from './card/index.vue';
import PageButton from './page-button/index.vue';
import Upload from './upload/index.vue';
import Icon from './icon/index.vue';

const components = {
  Card,
  PageButton,
  Upload,
  Icon,
};


const install = (Vue) => {
  if (install.installed) return;
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key]);
  });
};

export { components };

export default {
  install,
};
