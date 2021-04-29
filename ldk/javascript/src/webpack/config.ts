import * as webpack from 'webpack';
import * as path from 'path';
import Terser from 'terser-webpack-plugin';
import { generateBanner } from './generate-banner';
import { LdkSettings } from './ldk-settings';

/* eslint-disable-next-line */ // Need to dynamically refer to Loop's package.json
const ldkSettings: LdkSettings = require(path.join(process.cwd(), '/package.json'));

const config: webpack.Configuration = {
  entry: ['core-js/fn/promise'],
  target: ['web', 'es5'],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'loop.js'
  },
  mode: 'production',
  plugins: [
    new webpack.BannerPlugin({
      banner: generateBanner(ldkSettings),
      raw: true
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new Terser({
        terserOptions: {
          format: {
            comments: /---BEGIN-LOOP-JSON-BASE64---/i,
          },
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
