const path = require('path');
const merge = require('webpack-merge');
const ldkConfig = require('@oliveai/ldk/dist/webpack/config');

const merged = merge.merge(ldkConfig.default, {
  entry: [
    path.resolve(__dirname, './src/index.ts'),
    'core-js/features/symbol',
  ],
});

module.exports = merged;
