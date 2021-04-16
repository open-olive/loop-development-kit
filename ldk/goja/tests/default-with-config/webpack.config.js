const path = require('path');
const merge = require('webpack-merge');
const ldkConfig = require('@oliveai/ldk/dist/webpack/config');

const merged = merge.merge(ldkConfig.default, {
  entry: [path.resolve(__dirname, './index.js')],
});

module.exports = merged;
