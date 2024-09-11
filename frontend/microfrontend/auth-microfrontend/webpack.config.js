const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
//const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  // Остальная конфигурация Webpack...
  entry: './src/index',
  mode: 'development',
  output: {
    publicPath: "http://localhost:3002/",
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
    ],
  },
  devServer: {
    port: 3002,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth', // Имя микрофронтенда
      filename: 'remoteEntry.js', // Имя файла, который будет служить точкой входа для микрофронтенда
      exposes: {
        './Login': './src/components/Login',
        './Register': './src/components/Register'
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

  ]
};

