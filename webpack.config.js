var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    entry: './src/js/components/App.js',

    output: {
        path: './build',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.scss$/, loader: "style!css!postcss!sass" },

            { test: /\.css$/, loader: "style!css!postcss" },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },

            {
                test: /\.json$/,
                loader: 'json'
            }
        ],

        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb$/),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),

            new webpack.optimize.UglifyJsPlugin({
                compress:{
                  warnings: true
                }
           })
        ],

        postcss: function() {
            return [autoprefixer, precss];
        },

    }
};