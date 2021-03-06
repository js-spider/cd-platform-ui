import Card from './card/index.vue';
import PageButton from './page-button/index.vue';
import Upload from './upload/index.vue';

const components = [
  Card,
  PageButton,
  Upload,
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
  ...components,
};
