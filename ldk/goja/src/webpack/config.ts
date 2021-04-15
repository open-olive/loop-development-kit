import * as webpack from 'webpack';
import Terser from 'terser-webpack-plugin';
import { generateBanner } from './generate-banner';

const config: webpack.Configuration = {
  entry: ['core-js/fn/promise'],
  target: ['web', 'es5'],
  mode: 'production',
  plugins: [
    new webpack.BannerPlugin({
      banner: generateBanner(),
      raw: true
    }),
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
    extensions: ['.ts', '.ts', '.js'],
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
