const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// Configuration for resolving the path to your Sass variables
const colorsSass = path.resolve(__dirname, 'src', 'assets', 'styles', 'vars', 'colors.scss');

module.exports = {
  mode: 'production', // Set mode to production
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
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: colorsSass,
          to: path.resolve(__dirname, 'dist'),
        },
      ],
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
          MiniCssExtractPlugin.loader, // Use MiniCssExtractPlugin for production
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i, // Process images and fonts
        type: 'asset/resource', // Use Webpack 5's asset modules
        generator: {
          filename: 'images/[name].[hash].[ext]', // Set output path for assets
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          keep_fnames: true, // Keep function names for easier debugging
        },
      }),
    ],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
};
