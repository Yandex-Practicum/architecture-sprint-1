const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    devServer: {
        port: 3400
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ModuleFederationPlugin({
            name: "user_auth_microfrontend",
            filename: "remoteEntry.js",
            exposes: {
                "./user_auth_microfrontend_init": "./src/index"
            }
        })
    ]
}