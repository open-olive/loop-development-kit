import * as webpack from 'webpack';
import * as path from 'path';
import { LdkSettings } from './ldk-settings';
import { buildBabelConfig, buildOptimization, buildWebpackConfig } from './shared';
import { generateLdkSettings } from './generate-ldk-settings';

const ldkSettings: LdkSettings = generateLdkSettings();
const baseBabelConfig: webpack.RuleSetRule = buildBabelConfig(false);
const optimization = buildOptimization(true);
const buildPath = path.join(process.cwd(), 'dist');

const config: webpack.Configuration = buildWebpackConfig(
  buildPath,
  baseBabelConfig,
  optimization,
  ldkSettings,
);

export default config;
