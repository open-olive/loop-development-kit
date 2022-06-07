import { join as joinPath } from 'path';
import { Configuration as WebpackConfiguration, RuleSetRule } from 'webpack';

import { generateLdkSettings } from './generate-ldk-settings';
import { buildBabelConfig, buildOptimization, buildWebpackConfig } from './shared';

const baseBabelConfig: RuleSetRule = buildBabelConfig(true);
const optimization = buildOptimization(false);
const buildPath = joinPath(process.cwd(), 'dist');

const config: WebpackConfiguration = buildWebpackConfig(
  buildPath,
  baseBabelConfig,
  optimization,
  generateLdkSettings,
);

export default config;
