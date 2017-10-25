const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './src/js/app.js',
    app2: './src/js/app2.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'docs/'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['env'],
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }],
  },
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: true
      },
    }),
  ]
} else {
  module.exports.devtool = '#source-map';
}
