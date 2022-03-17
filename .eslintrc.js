module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'vue/no-parsing-error': 0,
    'no-restricted-exports': 0,
    'no-multiple-empty-lines': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'vue/multi-word-component-names': 0,
    'vuejs-accessibility/click-events-have-key-events': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
