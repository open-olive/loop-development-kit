/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge');
const ldkConfig = require('@oliveai/ldk/dist/webpack/config');
/* eslint-disable */

const merged = merge.merge(ldkConfig.default, {
  entry: [path.resolve(__dirname, './src/index.ts')],
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules/react'),
    },
  },
});

module.exports = merged;
