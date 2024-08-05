const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'auto',
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png', 'svg', 'ico', 'json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // if you're using React
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            filename: 'remoteEntry.js',
            remotes: {
                auth: 'auth@http://localhost:9991/remoteEntry.js',
                profile: 'profile@http://localhost:9992/remoteEntry.js',
                card: 'card@http://localhost:9993/remoteEntry.js',
            },
            shared: { react: { singleton: true }, "react-dom": { singleton: true }, "react-router-dom": { singleton: true } },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/**/*.jpg",
                    to: "[name][ext]",
                },
                {
                    from: "public/**/*.png",
                    to: "[name][ext]",
                },
                {
                    from: "public/manifest.json",
                    to: "[name][ext]",
                },
            ],
        }),
    ]
};
