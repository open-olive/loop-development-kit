import * as webpack from 'webpack';
import Terser from 'terser-webpack-plugin';
import path from 'path';
import { LdkSettings } from './ldk-settings';
import { generateBanner } from './generate-banner';
import { buildBabelPlugins, buildBabelPreset } from './babel-config';
import { CheckWarningsAndErrorsPlugin } from './CheckWarningsAndErrorsPlugin';

export function buildBabelConfig(cache: boolean): webpack.RuleSetRule {
  return {
    loader: 'babel-loader',
    options: {
      sourceType: 'unambiguous',
      cacheDirectory: cache,
      presets: buildBabelPreset(),
      plugins: buildBabelPlugins(),
    },
  };
}

export function buildOptimization(minimize: boolean): webpack.Configuration['optimization'] {
  return {
    minimize,
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
  };
}

export function buildWebpackConfig(
  buildPath: string,
  baseBabelConfig: webpack.RuleSetRule,
  optimization: webpack.Configuration['optimization'],
  ldkSettings: LdkSettings,
): webpack.Configuration {
  return {
    target: ['web', 'es5'],
    output: {
      path: buildPath,
      filename: 'loop.js',
    },
    mode: 'production',
    plugins: [
      new webpack.BannerPlugin({
        banner: generateBanner(ldkSettings),
        raw: true,
      }),
      new webpack.ProvidePlugin({
        console: path.resolve(path.join(__dirname, 'console-polyfill')),
      }),
      new CheckWarningsAndErrorsPlugin(),
    ],
    optimization,
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                sourceType: 'unambiguous',
                cacheDirectory: true,
                presets: buildBabelPreset(),
                plugins: buildBabelPlugins(true),
              },
            },
          ],
        },
        {
          test: /\.(tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                sourceType: 'unambiguous',
                cacheDirectory: true,
                presets: buildBabelPreset(),
                plugins: buildBabelPlugins(true),
              },
            },
            { loader: 'ts-loader' },
          ],
        },
        {
          test: /\.ts$/,
          use: [{ ...baseBabelConfig }, { loader: 'ts-loader' }],
        },
        {
          test: /\.m?js$/,
          use: { ...baseBabelConfig },
        },
      ],
    },
    externals: {
      oliveHelps: '_',
    },
    performance: {
      maxEntrypointSize: 800000,
      maxAssetSize: 800000,
    },
  };
}
