import Container from './container';
import Br from './cus-br';

const components = [
  Container,
  Br,
];
const install = (Vue) => {
  components.forEach((item) => {
    Vue.component(item.name, item);
  });
};

export default {
  install,
  Container,
  Br,
};

