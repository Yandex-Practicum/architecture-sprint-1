const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    devServer: {
        port: 3300
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ModuleFederationPlugin({
            name: "img_card_microfrontend",
            filename: "remoteEntry.js",
            exposes: {
                "./img_card_microfrontend_init": "./src/index"
            }
        })
    ]
}