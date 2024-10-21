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
  devtool: 'cheap-module-source-map', // Useful for debugging with source maps in dev
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve files from dist
    hot: true, // Enable hot reloading
    port: 9090, // Development server port
    open: true, // Automatically open the browser
    historyApiFallback: true, // Support single-page applications
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore moment locale files to reduce bundle size
    new ESLintPlugin({
      extensions: ['js', 'jsx'], // Ensure eslint checks JS and JSX files
      context: path.resolve(__dirname, 'src'), // Set context to the src folder
      overrideConfigFile: path.resolve(__dirname, 'eslint.config.js'), // Explicitly define ESLint config
      fix: true, // Auto-fix linting issues
      emitWarning: true, // Emit warnings instead of errors
    }),
    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement for live updating
  ],
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
              presets: ['@babel/preset-env', '@babel/preset-react'], // React support
            },
          },
        ],
      },
      {
        test: /\.(css|scss)?$/, // Process CSS/SCSS files
        use: [
          'style-loader', // Inject CSS into the DOM
          'css-loader',   // Translates CSS into CommonJS modules
          'postcss-loader', // Apply PostCSS transformations
          'sass-loader',  // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i, // Handle image assets
        loader: 'url-loader',
        options: {
          limit: 8192, // Inline files smaller than 8KB as Base64 strings
          mimetype: 'image/png',
        },
      },
      {
        test: /\.svg$/, // Handle SVG assets
        use: [
          {
            loader: 'file-loader', // Use file-loader to process SVGs
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/', // Set output directory for images
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i, // Handle font files
        loader: 'file-loader',
      },
    ],
  },
};
