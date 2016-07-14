var webpack = require('webpack');

module.exports = {
    entry: {
        'main': "./app/main",
    },
    output: {
        path: __dirname,
        filename: "../dist/fmarket.bundle.dev.js"
    },
    devtool: 'dource-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'],
    },
    module: {
        loaders: [{
            test: /\.ts$/, loaders: ['ts-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.html$/,
            loader: "html-loader"
        }],

        preLoaders: [
            {test: /\.js$/, loader: "source-map-loader"}
        ]
    },

}