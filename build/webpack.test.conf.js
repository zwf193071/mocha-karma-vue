var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {

    return path.join(__dirname, '..', dir)
}

var webpackConfig = {
    devtool: 'inline-cheap-module-source-map',
    resolveLoader: {
        moduleExtensions: ['-loader'] // To bypass mocha-loader incompatibility with webpack : 
    },
    module: {

        rules: [

            // babel-loader
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },

            // 为了统计代码覆盖率，对 js 文件加入 istanbul-instrumenter-loader
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                include: /src|packages/,
                enforce: 'post'
            },

            // vue loader
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            // css loader
            {
                test: /\.css$/,
                loader: 'null-loader'
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },

            // img loader
            {
                test: /\.(png|gif|jpe?g)(\?\S*)?$/,
                use: [{ loader: 'url-loader' }]
            },

            // font loader
            {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use: [{ loader: 'url-loader' }]
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'), // 调用组件的时候方便点
        }
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin("styles.css")
    ]
}

module.exports = webpackConfig