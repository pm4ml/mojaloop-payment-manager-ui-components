const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    bundle: ['./src/Root'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    hot: true,
    port: 9090,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      fix: true,
      emitWarning: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)?$/,
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
            loader: 'file-loader', // Replace svg-sprite-loader with file-loader
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
