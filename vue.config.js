const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

const port = 9000;
const needAnalyzer = false;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  publicPath: '/',
  devServer: {
    open: false, // 自动打开浏览器
    hot: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack: (config) => {
    if (needAnalyzer) {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
    }
  },
};
