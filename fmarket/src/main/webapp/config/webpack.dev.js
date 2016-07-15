var webpack = require('webpack');

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'fmarket.bundle.dev': "./app/main",
    },
    output: {
        path: __dirname,
        filename: "../dist/[name].js",
        chunkFilename: '[id].chunk.js'
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['', '.ts', '.js'],
    },
    module: {
        loaders: [{
            test: /\.ts$/, loaders: ['ts'],
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
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['fmarket.bundle.dev', 'vendor', 'polyfills', Infinity]
        })
    ]

}