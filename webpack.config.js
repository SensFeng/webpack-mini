const path = require('path');
const CustomPlugin = require('./plugins/custom-plugin');
const logLoader = require('./loaders/logger1-loader'); 
module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['js', 'jsx', 'json']
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     path.resolve(__dirname, 'loaders/logger1-loader.js'),
      //     path.resolve(__dirname, 'loaders/logger2-loader.js')
      //   ]
      // }
    ]
  },
  plugins: [
    // new CustomPlugin({
    //   name: 'tom'
    // })
  ]
}