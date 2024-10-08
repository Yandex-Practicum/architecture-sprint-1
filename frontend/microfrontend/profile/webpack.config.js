const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3002,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  entry: "./src/index",
  output: {
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        "./EditAvatarPopup": "./src/components/EditAvatarPopup.js",
        "./EditProfilePopup": "./src/components/EditProfilePopup.js",
        "./profileApi": "./src/utils/profileApi.js",
      },
      shared: ["react", "react-dom"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
