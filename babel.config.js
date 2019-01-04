module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['> 0.5%', 'not ie 11', 'not op_mini all'],
          },
          loose: true,
          useBuiltIns: 'usage',
          modules: false,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      'lodash',
      'transform-vue-jsx',
    ],
  };
};
