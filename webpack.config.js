module.exports = {
    entry: './src/js/components/App.js',

    output: {
        path: './build',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            { test: /\.scss$/, loader: "style!css!sass" },

            { test: /\.css$/, loader: "style!css" },

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
        ]
    }
};