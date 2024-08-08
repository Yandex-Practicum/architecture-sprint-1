const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    devServer: {
        port: 3500
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ModuleFederationPlugin({
            name: "user_profile_microfrontend",
            filename: "remoteEntry.js",
            exposes: {
                "./user_profile_microfrontend_init": "./src/index"
            }
        })
    ]
}