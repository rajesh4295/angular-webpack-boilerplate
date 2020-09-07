'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

var helpers = require('./util');

const isDev = process.env.NODE_ENV !== 'production';

const styleRuleDev = [
    {
        test: /\.less$/,
        use: [
            'to-string-loader',
            'style-loader',
            'css-loader',
            'less-loader'
        ],
        include: helpers.root('src', 'app')
    }
];

const styleRuleProd = [
    {
        test: /\.less$/,
        use: [
            'raw-loader',
            'less-loader'
        ],
        exclude: helpers.root('src', 'assets')
    }
];

const styleRules = isDev ? styleRuleDev : styleRuleProd;

module.exports = {
    entry: {
        vendor: `./src/vendor.ts`,
        polyfills: `./src/polyfills.ts`,
        main: isDev ? './src/main.ts' : './src/main.aot.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.less', '.css']
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                use: [
                  {
                    options: {
                      eslintPath: require.resolve('eslint')
                    },
                    loader: require.resolve('eslint-loader')
                  },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images',
                }
            },
            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'less-loader'
                ],
                include: helpers.root('src', 'assets')
            },
            ...styleRules
        ]
    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: `src/index.html`
        }),
        new BrotliPlugin({
			asset: '[path].br[query]',
            test: /\.(js|css|html)$/,
            algorithm: 'brotli',
			threshold: 10240,
			minRatio: 0.8
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'assets/styles/[name].css',
            chunkFilename: 'assets/styles/[name].css',
          })
    ]
};