var webpack = require('webpack');

module.exports = {
    entry: {
        'main':"./app/main",
    },
    output: {
        path: __dirname,
        filename: "../dist/fmarket.bundle.dev.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
    },
    module: {
        loaders: [{
            test: /\.ts/, loaders: ['ts-loader'], exclude:  /node_modules/
        }]
    }
}