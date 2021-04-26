const webpack = require("webpack");
const Terser = require("terser-webpack-plugin");
const { generateBanner } = require("./generate-banner");

const config = {
  entry: ["core-js/fn/promise", "core-js/fn/symbol"],
  target: ["web", "es5"],
  output: {
    path:
      "/Users/brettmugglin/Library/Application Support/Olive Helps/secureloops/abc",
    filename: "loop.js",
  },
  mode: "production",
  plugins: [
    new webpack.BannerPlugin({
      banner: generateBanner(),
      raw: true,
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
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            sourceType: "unambiguous",
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-destructuring",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
    ],
  },
  externals: {
    oliveHelps: "_",
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

module.exports = config;
