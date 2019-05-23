const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
    devServer: {
        contentBase: './',
        compress: true,
        host: 'localhost',
        port: '30000',
        hot: true,
        inline: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development'
});
