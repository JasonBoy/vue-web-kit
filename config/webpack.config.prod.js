'use strict';

const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const { VueLoaderPlugin } = require('vue-loader');
const baseWebpackConfig = require('./webpack.config.base');
const config = require('./env');
const utils = require('./utils');

const isBundleAnalyzerEnabled = config.isBundleAnalyzerEnabled();

const webpackConfig = webpackMerge(baseWebpackConfig, {
  output: {
    publicPath: config.getStaticAssetsEndpoint() + utils.getPublicPath(),
    filename: utils.getName('[name]', 'js', '', false),
    chunkFilename: '[name]-[chunkhash].chunk.js',
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  mode: 'production',
  // devtool: 'hidden-source-map',
  stats: { children: false, warnings: false },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:9].css',
      chunkFilename: '[id]-[hash:9].css',
    }),
  ],
  optimization: {
    namedModules: false,
    runtimeChunk: 'single',
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true, //ModuleConcatenationPlugin
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            warnings: false,
            drop_console: true,
            dead_code: true,
            drop_debugger: true,
          },
          output: {
            comments: false,
            beautify: false,
          },
          mangle: true,
        },
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
});

if (isBundleAnalyzerEnabled) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
