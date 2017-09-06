'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || 'development';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const nodePath = path.join(__dirname, './node_modules');
const sourcePath = path.join(__dirname, './src/');

function extractStyle(use) {
    return ExtractTextPlugin.extract({
        fallback: "style-loader",
        use
    });
}

const CONFIG = {
    production: {
        csso: true,
        localIdentName: '[hash:base64:5]',
        watch: false,
        FOLDER: `${__dirname}/build`,
        minifyHTML: {
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeRedundantAttributes: true,
            collapseWhitespace: true
        }
    },
    development: {
        csso: false,
        localIdentName: '[local]--[hash:base64:5]',
        watch: true,
        FOLDER: `${__dirname}/deploy`,
        minifyHTML: {
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeRedundantAttributes: true
        }
    }
}[NODE_ENV];

let cssLoaders = (NODE_ENV === 'production' ? [] : ['css-modules-flow-types-loader'])
    .concat(
        [
            {
                loader: 'css-loader',
                options: {
                    localIdentName: CONFIG.localIdentName,
                    modules: true
                }
            }
        ]
    )
    .concat(CONFIG.csso ? 'csso-loader' : [])
    .concat(
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({browsers: ['Chrome 59', 'Firefox 54', 'Safari 10']})
                ]
            }
        }
    );

let stylusLoaders = cssLoaders.concat('stylus-loader');

cssLoaders = extractStyle(cssLoaders);
stylusLoaders = extractStyle(stylusLoaders);

module.exports = {
    entry: {
        app: './src/app.jsx'
    },

    //context: sourcePath,
    output: {
        path: CONFIG.FOLDER,
        publicPath: '/',
        filename: '[name].[hash].bundle.js'
    },
    resolve: {
        modules: [
            sourcePath,
            'node_modules'
        ],
        //modulesDirectories: [nodePath],
        extensions:         ['.js', '.jsx', '.json'],
        // This is default param
        enforceExtension: false
    },
    watch: CONFIG.watch,
    node: {
        console: false,
        global: true,
        process: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        setImmediate: false
    },
    module: {
        noParse: [/\.min\.js$/],
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [nodePath],
                loader: 'eslint-loader',
                enforce: 'pre'
            },
            {
                test: /\.jsx?$/,
                exclude: [nodePath],
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.styl$/,
                use: stylusLoaders
            },
            {
                test: /\.(png|jpg|gif|ico|woff2?|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ].concat(
                    NODE_ENV === 'production'
                    ? {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                              {removeTitle: true}
                            ]
                        }
                    }
                    : []
                )
            }
        ],
    },
    //devtool: CONFIG.sourceMap,
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
            minify: CONFIG.minifyHTML
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new ExtractTextPlugin('app.[hash].css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
        // It suppress error shown in console, so it has to be set to false.
        quiet: false,
        // It suppress everything except error, so it has to be set to false as well
        // to see success build.
        noInfo: false,
        stats: 'minimal'
    }
};


if (NODE_ENV === 'production') {
  module.exports.plugins.push(
      new BabiliPlugin(null, {
          comments: false,
          sourceMap: false
      })
  );
}
