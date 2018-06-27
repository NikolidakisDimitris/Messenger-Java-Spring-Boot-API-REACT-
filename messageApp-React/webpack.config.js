var webpack = require("webpack");

module.exports = {
    entry: ".\\src\\index.js",
    output: {
        path: "C:\\Users\\Leonidas\\Documents\\React\\project2\\dist\\assets",
        filename: "bundle.js",
        publicPath: "assets"
    },
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3000
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["latest", "stage-0", "react"]
                }
            }
        ]

    }
}