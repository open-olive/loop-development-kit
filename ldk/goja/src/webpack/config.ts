import * as webpack from 'webpack';

const config: webpack.Configuration = {
  entry: ['core-js/fn/promise', './src/index.js'],
  target: ['web', 'es5'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceType: 'unambiguous',
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-destructuring', '@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  externals: {
    oliveHelps: '_',
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default config;