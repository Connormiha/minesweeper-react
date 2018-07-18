'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NODE_ENV = process.env.NODE_ENV || 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sourcePath = path.join(__dirname, './src/');

const CONFIG = {
    production: {
        localIdentName: '[hash:base64:5]',
        watch: false,
        FOLDER: `${__dirname}/build`,
        minifyHTML: {
            removeComments: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeRedundantAttributes: true,
            collapseWhitespace: true,
        },
        alias: {
            invariant: 'lodash/noop',
        },
    },
    development: {
        localIdentName: '[local]',
        watch: true,
        FOLDER: `${__dirname}/deploy`,
        minifyHTML: {
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeRedundantAttributes: true,
        },
        alias: {},
    },
}[NODE_ENV];

const cssLoaders = (NODE_ENV === 'production' ? [] : ['css-modules-flow-types-loader'])
    .concat(
        MiniCssExtractPlugin.loader,
        [
            {
                loader: 'css-loader',
                options: {
                    localIdentName: CONFIG.localIdentName,
                    modules: true,
                },
            },
        ],
    )
    .concat(
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer({browsers: ['Chrome 64', 'Firefox 55', 'Safari 11']}),
                ],
            },
        }
    );

let stylusLoaders = cssLoaders.concat('stylus-loader');

module.exports = {
    entry: {
        app: './src/app.jsx',
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
            'node_modules',
        ],
        //modulesDirectories: [nodePath],
        extensions: ['.js', '.jsx', '.json', '.flow'],
        // This is default param
        enforceExtension: false,
    },
    mode: NODE_ENV,
    optimization: {
        minimizer: [
            new UglifyEsPlugin({
                ecma: 8,
                compress: {
                    // https://github.com/mishoo/UglifyJS2/pull/2325
                    unsafe_methods: true,
                    unsafe_arrows: true,
                    drop_console: true,
                    passes: 2,
                    pure_funcs: ['invariant'],
                },
            }),
            new CssoWebpackPlugin(),
            // Waiting for support Webpack 4
            // new PreloadWebpackPlugin({
            //     rel: 'preload',
            //     as(entry) {
            //         if (/\.css$/.test(entry)) return 'style';
            //         if (/\.woff$/.test(entry)) return 'font';
            //         if (/\.(svg|png)$/.test(entry)) return 'image';
    
            //         return 'script';
            //     },
            // }),
        ],
    },
    watch: CONFIG.watch,
    node: {
        console: false,
        global: true,
        process: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        setImmediate: false,
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|flow)$/,
                sideEffects: false,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: cssLoaders,
            },
            {
                test: /\.styl$/,
                use: stylusLoaders,
            },
            {
                test: /\.(png|jpg|gif|ico|woff2?|eot)$/,
                loader: 'file-loader',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                    },
                    {
                        loader: 'svgo-loader',
                    },
                ],
            },
        ],
    },
    // devtool: CONFIG.sourceMap,
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
            minify: CONFIG.minifyHTML,
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV) || 'development',
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'app.[hash].css',
            chunkFilename: 'app.[hash].css',
        }),
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
        stats: 'minimal',
    },
};
