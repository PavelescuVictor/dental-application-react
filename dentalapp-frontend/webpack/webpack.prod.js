const EventHooksPlugin = require('event-hooks-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const paths = require('../config/paths');

module.exports = (envVars) =>
  merge(commonConfig, {
    mode: 'production',
    plugins: [new EventHooksPlugin({})],
    output: {
      path: paths.appBuild, // will be serving from this directory
      publicPath: paths.publicUrlOrPath,
      filename: '[name].[chunkhash:8].js',
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 500000, //500 KBytes
      maxAssetSize: 500000, //500 KBytes
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: {
        name: 'manifest',
      },
    },
  });
