const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/Login",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 4000,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth_microfrontend",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/components/Login",
        "./Register": "./src/components/Register",
      },
      shared: ["react", "react-dom"],
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  target: "web"
};