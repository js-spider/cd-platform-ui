const glob = require('glob');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const componentList = {
  '.': './src/components/index.js',
};

async function getVueList() {
  const files = await glob.sync('src/components/**/index.vue');
  files.forEach((file) => {
    const comp = file.split(/[/.]/)[2];
    componentList[comp] = `./${file}`;
  });
}

getVueList('src/components');


function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: 'development',
  entry: componentList,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/index.js',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
