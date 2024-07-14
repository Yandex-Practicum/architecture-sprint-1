const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const sameName = ({ context, absoluteFilename }) => {
    return "[name][ext]";
}

module.exports = {
    entry: "./src/index",
    mode: "development",
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 3000,
        historyApiFallback: true
    },
    output: {
        publicPath: 'auto',
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
                    presets: ["@babel/preset-react"],
                },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack', 'url-loader'],
            }
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host-app",
            remotes: {
                "auth": "auth@http://localhost:3001/remoteEntry.js",
                "profile": "profile@http://localhost:3002/remoteEntry.js",
                "card": "card@http://localhost:3003/remoteEntry.js",
            },
            shared: { react: { singleton: true }, "react-dom": { singleton: true }, "react-router-dom": { singleton: true } },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/**/*.jpg",
                    to: sameName,
                },
                {
                    from: "public/**/*.png",
                    to: sameName,
                },
                {
                    from: "public/manifest.json",
                    to: sameName,
                },
            ],
        }),
    ],
};

