/**
 * Created by cvicente on 29/05/17.
 */
const path = require('path'),
    webpack = require('webpack'),
    BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
    historyApiFallback = require('connect-history-api-fallback'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackTemplate = require('html-webpack-template'),

    PRODUCTION = process.env.NODE_ENV === 'production';

const plugins = [
    new webpack.ProvidePlugin({
        'React': 'react'
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),

    new HtmlWebpackPlugin({
        hash: true,
        mobile: true,
        title: 'React Redux React-Router Antd Boilerplate',
        inject: false,
        appMountId: 'root',
        template: `!!ejs-loader!${HtmlWebpackTemplate}`,
        filename: PRODUCTION ? '../index.html' : 'index.html',
        minify: {
            collapseWhitespace: true,
        },
        meta: [
            {
                name: 'description',
                content: 'A admin dashboard application demo built upon Ant Design and Dva.js',
            }, {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0',
            },
        ],
    }),

    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3001,
        server: {
            baseDir: [__dirname, 'dist'], middleware: [historyApiFallback()]
        },
    }, {reload: true}),

    new webpack.NoEmitOnErrorsPlugin(),
];


PRODUCTION ?
    plugins.unshift(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': "'production'"
            }
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
    : null;


module.exports = {
    entry: {
        bundler: path.join(__dirname, 'src/index.jsx'),
        vendor: ['react', 'react-dom']
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.jsx'],
        alias: {}
    },

    node: {
        fs: 'empty'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader", options: {
                        strictMath: true,
                        noIeCompat: true,
                        sourceMap: true
                    }
                }]
            }
        ]
    },

    plugins: plugins
};
