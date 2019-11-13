'use strict';

const path = require('path');
const SLASH_REGEX = /[\\]+/g;

const config = require('./env');

const ENTRY_NAME = {
  APP: 'main',
  VENDORS: 'vendors',
  RUNTIME: 'runtime',
  APP_JS: 'main.js',
  VENDORS_JS: 'vendors.js',
  RUNTIME_JS: 'runtime.js',
};

exports.ENTRY_NAME = ENTRY_NAME;

exports.getName = function getName(chunkName, ext, hashName, DEV_MODE) {
  return (
    chunkName +
    (DEV_MODE ? '.' : '-[' + (hashName ? hashName : 'contenthash') + ':9].') +
    ext
  );
};

exports.getResourceName = function getResourceName(DEV_MODE) {
  return exports.getName('[path][name]', '[ext]', 'hash', DEV_MODE);
};

exports.getStyleLoaders = function getStyleLoaders() {
  const lastArg = arguments[arguments.length - 1];
  const isLastArgBoolean = typeof lastArg === 'boolean';
  const DEV_MODE = isLastArgBoolean ? lastArg : true;
  const temp = [];
  for (
    let i = 0,
      length = isLastArgBoolean ? arguments.length - 1 : arguments.length;
    i < length;
    i++
  ) {
    const tempLoader = {
      loader: arguments[i],
      options: {},
    };
    if (String(arguments[i]).startsWith('sass')) {
      tempLoader.options.outputStyle = 'compressed';
    }
    if (DEV_MODE) {
      tempLoader.options.sourceMap = true;
    }
    temp.push(tempLoader);
  }
  return temp;
};

exports.resolve = function resolve(dir) {
  return path.join(__dirname, '..', dir);
};

exports.CONTENT_PATH = exports.APP_PATH = exports.resolve('src');

exports.APP_BUILD_PATH = exports.resolve('build/app');

exports.normalizePublicPath = function normalizePublicPath(publicPath) {
  return publicPath === '.' ? '' : publicPath;
};
exports.normalizeTailSlash = function normalizeTailSlash(
  publicPath,
  withSlash
) {
  if (publicPath.endsWith('/')) {
    publicPath = withSlash
      ? publicPath
      : publicPath.substring(0, publicPath.length - 1);
  } else {
    publicPath = withSlash ? publicPath + '/' : publicPath;
  }
  if (exports.isWindows()) {
    publicPath = exports.replaceBackwardSlash(publicPath);
  }
  return publicPath;
};
exports.normalizePath = function normalizePath(publicPath, withSlash) {
  return exports.normalizeTailSlash(
    exports.normalizePublicPath(publicPath),
    withSlash
  );
};
exports.getPublicPath = function() {
  return exports.normalizeTailSlash(
    exports.normalizePublicPath(
      path.join(config.getAppPrefix(), config.getStaticPrefix())
    ),
    config.isPrefixTailSlashEnabled()
  );
};
exports.isWindows = function isWindows() {
  return process.platform === 'win32';
};
exports.replaceBackwardSlash = function replaceBackwardSlash(str) {
  return str.replace(SLASH_REGEX, '/');
};
