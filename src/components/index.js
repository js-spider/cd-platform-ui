import Card from './card/index.vue';
import PageButton from './page-button/index.vue';

const components = [
  Card,
  PageButton,
];


const install = (Vue) => {
  if (install.installed) return;
  components.forEach((Comp) => {
    Vue.component(Comp.name, Comp);
  });
};

// export const Card = Card


export default {
  install,
  Card,
  PageButton,
};
