const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production'; // Check if we are in development mode

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: ['./src/Root'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true, // Enable Hot Module Replacement
    port: 9090,
    open: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
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
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(), // Add Fast Refresh plugin in development
  ].filter(Boolean), // Filter out any false entries (e.g., in production mode, the HMR and ReactRefreshWebpackPlugin won't be included)
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JS files using Babel
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean), // Enable Fast Refresh in development mode
            },
          },
        ],
      },
      {
        test: /\.(css|scss)?$/, // Process CSS/SCSS files
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'image/png',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
      },
    ],
  },
};
