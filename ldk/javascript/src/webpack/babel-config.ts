import * as babel from '@babel/core';

export function buildBabelPlugins(includeJsx = false): babel.PluginItem[] {
  const baseline = ['@babel/plugin-transform-destructuring', '@babel/plugin-transform-runtime'];
  const jsx = [
    '@babel/plugin-transform-react-jsx',
    {
      runtime: 'automatic',
      importSource: '@oliveai/ldk/dist', // loads @oliveai/ldk/dist/jsx-runtime
    },
  ];
  return includeJsx ? [...baseline, jsx] : baseline;
}

export function buildBabelPreset(): babel.PluginItem[] {
  return [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '3.11',
      },
    ],
  ];
}