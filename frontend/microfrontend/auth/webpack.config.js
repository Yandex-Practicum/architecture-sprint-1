const HtmlWebPackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");
const deps = require('./package.json').dependencies;

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});

module.exports = {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 3001,
        historyApiFallback: {
            index: '/public/index.html'
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        htmlPlugin,
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                "./Register": "./src/components/Register",
                "./registerLogic": "./src/components/registerLogic",
                "./Login": "./src/components/Login",
                "./loginLogic": "./src/components/loginLogic",
                "./useAuthEffect": "./src/components/useAuthEffect"
            },
            shared: [{
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },

            }]
        }),
    ]
};