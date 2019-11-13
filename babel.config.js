module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {},
          useBuiltIns: 'entry',
          modules: false,
          corejs: 3,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-modules-commonjs',
      'lodash',
      'transform-vue-jsx',
    ],
  };
};
