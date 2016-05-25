module.exports = {
    entry: "./app/main",
    output: {
        path: __dirname,
        filename: "../dist/fmarket.min.js"
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