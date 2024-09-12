const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "auth", 
      filename: "remoteEntry.js",
      exposes: {
        './Login': './src/components/Login.js',
        './Register': './src/components/Register.js',
        './InfoTooltip': './src/components/InfoTooltip.js',
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
  ],
};