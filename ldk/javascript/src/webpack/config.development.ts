import * as webpack from 'webpack';
import * as path from 'path';
import { LdkSettings } from './ldk-settings';
import { buildBabelConfig, buildOptimization, buildWebpackConfig } from './shared';

// Need to dynamically refer to Loop's package.json
// Suppressing rule as we intentionally want a dynamic require.
// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require
const ldkSettings: LdkSettings = require(path.join(process.cwd(), '/package.json'));
const baseBabelConfig: webpack.RuleSetRule = buildBabelConfig(true);
const optimization = buildOptimization(false);
const buildPath = path.join(process.cwd(), 'dist');

const config: webpack.Configuration = buildWebpackConfig(
  buildPath,
  baseBabelConfig,
  optimization,
  ldkSettings,
);

export default config;
