'use strict';

const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const baseWebpackConfig = require('./webpack.config.base');
const config = require('./env');
const utils = require('./utils');

const isHMREnabled = config.isHMREnabled();

const webpackConfig = webpackMerge(baseWebpackConfig, {
  output: {
    publicPath: isHMREnabled ? '/' : utils.getPublicPath(),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isHMREnabled
            ? 'vue-style-loader?sourceMap=true'
            : MiniCssExtractPlugin.loader,
          'css-loader?sourceMap=true',
          'postcss-loader?sourceMap=true',
          'sass-loader?sourceMap=true&outputStyle=compressed',
        ],
      },
    ],
  },
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new VueLoaderPlugin()],
});

if (!isHMREnabled) {
  webpackConfig.optimization = {
    namedModules: true,
    runtimeChunk: 'single',
  };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  );
}
// console.log(webpackConfig.plugins);
module.exports = webpackConfig;
