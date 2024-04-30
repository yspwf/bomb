const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry:{
    app: './app.ts'
  },
  output:{
    path: path.resolve(__dirname, './dist'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.ts$/,
        loader:'ts-loader',
        // options: {
        //   // presets: [
        //   //   "@babel/preset-env",
        //   //   "@babel/preset-typescript",
        //   // ],
        // },
      }
    ]
  },
  externals:[
    webpackNodeExternals()
  ],
  resolve: {
    extensions: [".ts"],
  },
}