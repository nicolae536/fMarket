var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    debug: false,
    entry: {
        'main': './app/main',
    },
    output: {
        path: __dirname,
        filename: "../dist/fmarket.release.js",
        sourceMapFilename: '../dist/fmarket.release.map',
        chunkFilename:  '../dist/fmarket.release.map'
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
    },
    module: {
        loaders: [{
            test: /\.ts/, loaders: ['ts-loader'],
            exclude:  /node_modules/
        },
        {
            test: /\.html$/,
            loader: "html-loader"
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new WebpackMd5Hash(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            },
            beautify: false,
            comments: false
        }),
        new CompressionPlugin({
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })
    ],
    tslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: 'app'
    },
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/]
    },
    node: {
        global: 'window',
        crypto: 'empty',
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
}