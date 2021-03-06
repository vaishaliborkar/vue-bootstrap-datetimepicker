'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.json', '.vue']
  },
  entry: './src/index.js',
  // Don't include these into library build
  externals: {
    'vue': {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    },
    'jquery': {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      root: 'jQuery'
    },
    'moment': 'moment',
    'eonasdan-bootstrap-datetimepicker': 'eonasdan-bootstrap-datetimepicker'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue-bootstrap-datetimepicker.min.js',
    library: 'VueBootstrapDatetimePicker',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new UnminifiedWebpackPlugin(),
    new VueLoaderPlugin(),
    new UglifyJsPlugin({
      sourceMap: false,
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          dead_code: true,
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }
    }),
  ],
  devtool: false,
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
  }
};
