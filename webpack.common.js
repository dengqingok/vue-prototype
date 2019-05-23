const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  entry: ['./src/entry.js'],
  output: {
    path: __dirname,
    filename: 'build/main.js'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  resolveLoader: {
    modules: [path.join(__dirname, './loaders'), 'node_modules']
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.(css|scss)$/,
      use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|bmp)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "build/[path][name].[ext]",
          context: "src/asset",
          limit: 7000
        }
      }]
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
