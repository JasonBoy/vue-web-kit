'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./env');
const utils = require('./utils');

const DEV_MODE = config.isDevMode();
const APP_PATH = utils.APP_PATH;
const CONTENT_PATH = APP_PATH;
const APP_BUILD_PATH = utils.APP_BUILD_PATH;

const appPrefix = utils.normalizeTailSlash(config.getAppPrefix(), config.isPrefixTailSlashEnabled());
const prefix = utils.normalizeTailSlash(
  utils.normalizePublicPath(
    path.join(config.getAppPrefix(), config.getStaticPrefix())
  ), config.isPrefixTailSlashEnabled());

module.exports = {
  entry: {
    vendors: [
      'vue',
      'vue-router',
      'whatwg-fetch',
      'url-parse',
      'lodash.isempty',
    ],
    app: path.join(APP_PATH, 'index.js'),
  },
  output: {
    path: APP_BUILD_PATH,
  },
  resolve: {
    modules: [
      APP_PATH,
      'node_modules',
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': APP_PATH,
      'components': utils.resolve('src/components'),
      'assets': utils.resolve('src/assets'),
      'modules': utils.resolve('src/modules'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              context: CONTENT_PATH,
              name: utils.getResourceName(DEV_MODE),
              limit: 1024,
            }
          },
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     bypassOnDebug: DEV_MODE,
          //   },
          // },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        options: {
          context: CONTENT_PATH,
          name: utils.getResourceName(DEV_MODE),
          limit: 5000,
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./build/app'], {root: process.cwd()}),
    new webpack.DefinePlugin({
      'process.env.DEV_MODE': DEV_MODE,
      'process.env.prefix': JSON.stringify(prefix),
      'process.env.appPrefix': JSON.stringify(appPrefix),
      'process.env.NODE_ENV': JSON.stringify(config.getNodeEnv()),
    }),
    new webpack.LoaderOptionsPlugin({
      debug: DEV_MODE,
      minimize: !DEV_MODE,
      options: {
        context: CONTENT_PATH,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: './views/index.html',
      filename: 'index.html',
      inject: 'body',
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      {
        from: utils.resolve('src/assets/static'),
        to: utils.resolve('build/app/assets/static'),
      },
    ]),
    new ManifestPlugin(),
  ],
};
