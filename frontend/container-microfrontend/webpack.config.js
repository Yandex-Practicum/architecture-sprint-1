const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ModuleFederationPlugin({
            name: "container",
            remotes: {
                img_add_microfrontend: "img_add_microfrontend@http://localhost:3200/remoteEntry.js",
                img_card_microfrontend: "img_card_microfrontend@http://localhost:3300/remoteEntry.js",
                user_auth_microfrontend: "user_auth_microfrontend@http://localhost:3400/remoteEntry.js",
                user_profile_microfrontend: "user_profile_microfrontend@http://localhost:3500/remoteEntry.js",
            }
        })
    ]
}