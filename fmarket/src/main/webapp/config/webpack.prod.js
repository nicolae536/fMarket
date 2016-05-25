var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./app/main",
    output: {
        path: __dirname,
        filename: "../dist/fmarket.release.min.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
    },
    module: {
        loaders: [{
            test: /\.ts/, loaders: ['ts-loader'], exclude:  /node_modules/
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new HtmlWebpackPlugin(),
    ]
}