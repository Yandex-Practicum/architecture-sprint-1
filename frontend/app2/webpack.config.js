const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        port: 3002
    },
    output: {
        publicPath: 'http://localhost:3002/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'app2',
            remotes: {
                app1: 'app1@http://localhost:3001/remoteEntry.js',
            },
            shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
        }),
    ],
};
