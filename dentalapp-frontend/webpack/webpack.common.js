const path = require('path');
const slash = require('slash');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const paths = require('../config/paths');
const getClientEnvironment = require('../config/env');
const tsConfig = require('../tsconfig.json');

const { raw, stringified } = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
const devMode = raw.NODE_ENV !== 'production';
const {
  compilerOptions: { baseUrl },
} = tsConfig;

module.exports = {
  entry: paths.appIndexJs,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // matches .js, .ts, and .tsx files
        exclude: /node_modules/,
        use: ['babel-loader'], // uses babel-loader for the specified file types (no ts-loader needed)
      },
      {
        test: /\.(c)ss$/, // matches .css
        use: [
          devMode
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: (resourcePath, context) => {
                    const relPath =
                      path.relative(path.dirname(resourcePath), path.join(context, baseUrl)) +
                      path.sep;
                    return slash(relPath);
                  },
                },
              },
          'css-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        // test: /\.(jpe?g|png|gif|svg)$/,
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets/images/',
              limit: 1000,
            },
          },
        ],
      },
      // {
      //   type: 'asset',
      //   resourceQuery: /url/, // *.svg?url
      // },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx', '.mjs'],
    modules: ['src', 'node_modules'],
    alias: {
      components: path.resolve(process.cwd(), `src/components/`),
    },
  },
  plugins: [
    new ESLintPlugin({
      //extensions: ['.ts', '.tsx'],
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: 'index.html',
      inject: true,
      hash: true,
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // It will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, raw),
    new MiniCssExtractPlugin({
      filename: `assets/css/${devMode ? '[contenthash:8].' : `[contenthash:8].min.`}css`,
      chunkFilename: `assets/css/[id]${devMode ? '' : '.[contenthash:8]'}.css`,
    }),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(stringified),
  ],
};
