const { merge } = require('webpack-merge');
//const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require('./webpack.common.js');
const paths = require('../config/paths');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';

module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web', // Make web variables accessible to webpack, e.g. window
  devtool: 'inline-source-map', // inline-source-map for debugging
  devServer: {
    hot: true,
    open: true,
    host,
    port,
    historyApiFallback: true,
    /**necessary for when using the last version of chrome
     * TODO remove these line when the issue is resolved **/
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false,
  },
  output: {
    path: paths.appBuild, // in memory will be serving from this directory
    publicPath: paths.publicUrlOrPath,
    // `filename` provides a template for naming your bundles (remember to use `[name]`)
    filename: '[name].bundle.js',
    // `chunkFilename` provides a template for naming code-split bundles (optional)
    chunkFilename: '[name].chunk.bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    //new WebpackBundleAnalyzer(),
  ],
});
