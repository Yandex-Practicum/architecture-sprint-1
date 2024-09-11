const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const deps = require("./package.json").dependencies;

module.exports = {
    mode: 'development',
    entry: "./src/index",
    output: {
        publicPath: "http://localhost:3000/",
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react"],
                },
            },
            {
                test: /\.(png|gif|jpg|svg|ico)$/,
                loader: 'url-loader',
                issuer: {
                    not: [/\.module\.scss$/],
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        watchFiles: [path.resolve(__dirname, 'src')]
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            filename: "remoteEntry.js",
            remotes: {
                'auth': "auth@http://localhost:3002/remoteEntry.js"
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
                "react-router-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                }
            },
        }),
        new ExternalTemplateRemotesPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            manifest: './public/manifest.json'
        })
    ]
};