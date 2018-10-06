// Webpack.config.js created by Alex Watson

// Load environment variables
const dotEnv = require('dotenv').config();
// Load path
const path = require('path');
// Load HTML template plug-in
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Load Webpack clean plug-in
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Webpack
const webpack = require('webpack');
// Mini CSS extractor
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// Minify CSS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Create an HTML template file for including bundle code
const plugins = [
    new CleanWebpackPlugin(process.env.WEBPACK_BUILD_DIRECTORY),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, './'+process.env.WEBPACK_SOURCE_DIRECTORY+'/index.html')
    }),
    new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: '[name].css'
    }),
    new OptimizeCssAssetsPlugin()
];


module.exports = {
  devServer: {
    quiet: false,
    noInfo: false,
    contentBase: path.join(__dirname, process.env.WEBPACK_BUILD_DIRECTORY),
    compress: true,
    port: 9000,
    // mode: process.env.WEBPACK_BUILD_ENV
  },
  entry: [
      './src/index.js'
  ],
  // Output files (with cache busting for dev builds)
  output: {
      filename: process.env.WEBPACK_BUILD_ENV === 'development' ? '[name].bundle.[hash:6].js' : '[name].bundle.js',
      path: path.resolve(__dirname, process.env.WEBPACK_BUILD_DIRECTORY),
      publicPath: '/'
  },
  // Define module rules and loaders
  module: {
      rules:[
          {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                  loader: 'babel-loader'
              }
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  modules: false,
                  sourceMap: true,
                  importLoader: 2
                }
              },
              "sass-loader"
            ]
          },
          {
              test: /\.css$/,
              use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
              ]
          },
          {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          {
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'file-loader'
          },
          {
              test: /\.(png|jp(e*)g|gif)$/,
              exclude: /(node_modules|bower_components)/,
              use: [{loader:'file-loader',options: {name: 'images/[name].[ext]'}}]
          }
      ]
  },
  // Include any plug-ins
  plugins
};
