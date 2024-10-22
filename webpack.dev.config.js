const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

// Configuration for resolving the path to your Sass variables
const colorsSass = path.resolve(__dirname, 'src', 'assets', 'styles', 'vars', 'colors.scss');

module.exports = {
  mode: 'development', // Set mode to development
  entry: {
    index: './src/components/index.js',
    'redux-fetch': './src/reduxFetch/index.js',
    'redux-validation': './src/reduxValidation/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'mojaloop-payment-manager-ui-components',
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      context: path.resolve(__dirname, 'src'),
      overrideConfigFile: path.resolve(__dirname, 'eslint.config.js'),
      fix: true,
      emitWarning: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(css|scss)$/, // Process CSS/SCSS files
        use: [
          'style-loader', // Use style-loader in development for HMR
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'source-map', // Enable source maps for easier debugging
};
