const EventHooksPlugin = require('event-hooks-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const paths = require('../config/paths');
const fn = require('../config/utils');

module.exports = (envVars) =>
  merge(commonConfig, {
    mode: 'production',
    plugins: [
      new EventHooksPlugin({
        beforeRun: () => {
          const { device, phase } = envVars;
          const deviceConfigPath = fn.getDeviceConfigPath(device, phase);

          //Copying source files to build
          fn.copyPublicFolderFiles();
          //Copying device source files to build
          fn.copyFolder(deviceConfigPath, paths.appBuild);
        },
      }),
    ],
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
