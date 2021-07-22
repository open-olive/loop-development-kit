import * as webpack from 'webpack';
import Terser from 'terser-webpack-plugin';
import { LdkSettings } from './ldk-settings';
import { generateBanner } from './generate-banner';
import { buildBabelPlugins, buildBabelPreset } from './babel-config';

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
    ],
    optimization,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(jsx)$/,
          use: [{
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              cacheDirectory: true,
              presets: buildBabelPreset(),
              plugins: buildBabelPlugins(true),
            },
          }],
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
