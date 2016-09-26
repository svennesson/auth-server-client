'use strict';

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var srcPath = path.join(__dirname, 'src')
var production = 'production' === process.env.NODE_ENV

module.exports = {
    target: 'web',
    cache: true,
    entry: {
        module: path.join(srcPath, 'app.js')
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        filename: production ? 'app.min.js' : 'app.js',
        path: production ? path.resolve(__dirname, 'public') : path.resolve(__dirname, '.tmp'),
        publicPath: production ? '/static/' : ''
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' },
            { test: /\.less$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style', 'css!less') },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
            { test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png'},
            { test: /\.jpg$/, loader: 'url-loader?limit=100000&mimetype=image/jpg'}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new HtmlWebpackPlugin({
            title: 'Auth-server',
            template: 'src/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin(production ? 'app.min.css' : 'app.css'),
        new webpack.NoErrorsPlugin()
    ],

    debug: true,
    devtool: production ? null : '#eval-source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: './.tmp',
        historyApiFallback: true,
        quiet: false,
        noInfo: false,
        stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false
        }
    }
};
