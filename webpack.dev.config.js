var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
    devtool: 'eval',

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/js/components/App'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            { test: /\.scss$/, loader: "style!css!postcss!sass" },
            { test: /\.css$/, loader: "style!css!postcss" },

            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src/js')
            },

            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb$/),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.LOCAL_INDEX': JSON.stringify(process.env.LOCAL_INDEX === 'true')
        }),

        new webpack.HotModuleReplacementPlugin()
    ],

    postcss: function() {
        return [autoprefixer, precss];
    },

};