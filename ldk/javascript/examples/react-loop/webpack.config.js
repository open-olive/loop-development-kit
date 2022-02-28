// webpack.config.js
const path = require('path');
const merge = require('webpack-merge');
const ldkConfig = require('@oliveai/ldk/dist/webpack/config');

const merged = merge.merge(ldkConfig.default, {
  entry: [path.resolve(__dirname, './src/index.js')],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
    },
  },
});

module.exports = merged;