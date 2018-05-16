// Webpack.config.js created by Alex Watson

// Load environment variables
const _env = require('dotenv').config();
const env_vars = _env.parsed;
// Load path
const path = require('path');
// Load HTML template plug-in
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Load Webpack clean plug-in
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Load extraction plug-in to bundle class
const ExtractTextPlugin = require("extract-text-webpack-plugin");


// Quit if environment variables don't load
if(_env.error) {
    throw _env.error;
    process.exit(-1);
}

// Create an HTML template file for including bundle code
const plugins = [
    new CleanWebpackPlugin(env_vars.WEBPACK_BUILD_DIRECTORY),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, './'+env_vars.WEBPACK_SOURCE_DIRECTORY+'/index.html')
    }),
    new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true
    })
];


module.exports = {
  // Output files (with cache busting for dev builds)
  output: {
      filename: env_vars.WEBPACK_BUILD_ENV === 'dev' ? '[name].bundle.[hash:6].js' : '[name].bundle.js',
      path: path.resolve(__dirname, env_vars.WEBPACK_BUILD_DIRECTORY)
  },
  // Define module rules and loaders
  module: {
      rules:[
          { test: /\.js$/, exclude: /node_modules/, loaders:['babel-loader'] },
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader'],
              })
          },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract('css-loader')
          },
          {
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          {
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              loader: 'file-loader'
          }
      ]
  },
  // Verbose output
  devServer: {
      quiet: false,
      noInfo: false
  },
  // Include any plug-ins
  plugins
};
