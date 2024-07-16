const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 3004,
        open: true,
        compress: true,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        allowedHosts: "all"
    },
    output: {
        publicPath: "auto"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.html/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', "css-loader"],
            },
            {
                test: /\.(ico|png|svg|jpeg|jpg|gif)$/,
                type: 'asset'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'card',
            filename: 'remoteEntry.js',
            exposes: {
                './Card': './src/components/Card',
                './CardList': './src/components/CardList',
                './AddPlacePopup': './src/components/AddPlacePopup',
            },
            remotes: {
                commons: 'commons@http://host.docker.internal:3005/remoteEntry.js'
            },
            shared: {
                react: {
                    singleton: true,
                    eager: true,
                    requiredVersion: '^17.0.2'
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: '^17.0.2'
                },
                'react-router-dom': {
                    singleton: true,
                    eager: true,
                    requiredVersion: '^5.2.0'
                }
            },
        })
    ],
};

