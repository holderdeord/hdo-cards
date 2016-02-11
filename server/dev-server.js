var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var config = require('./../webpack.dev.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/../public')
}).listen(3000, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3000');
});