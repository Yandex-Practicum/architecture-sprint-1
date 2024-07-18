const HtmlWebPackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});

module.exports = {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 3000,
        historyApiFallback: {
            index: '/public/index.html'
        }
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', 'jpeg', 'png'],
        alias: {
            'microfrontend_shared-lib': path.resolve(__dirname, '../shared-lib'),
        },
    },
    cache: false,
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
        new CopyWebpackPlugin({
            patterns: [
                {from: 'public', to: '', globOptions: {ignore: ['**/index.html']}} // Копируем все файлы из public кроме index.html
            ]
        }),
        new ModuleFederationPlugin({
            name: "root",
            filename: "remoteEntry.js",
            remotes: {
                auth: "auth@http://localhost:3001/remoteEntry.js",
                profile: "profile@http://localhost:3002/remoteEntry.js",
                cards: "cards@http://localhost:3003/remoteEntry.js"
            },
            exposes: {
                './PopupWithForm': './src/components/PopupWithForm',
                './ProtectedRoute': './src/components/ProtectedRoute',
            },
            shared: [
                'react',
                'react-dom',
                {
                    'microfrontend_shared-lib': {
                        import: 'microfrontend_shared-lib',
                        requiredVersion: require('../shared-lib/package.json').version,
                    },
                },
            ],
        })
    ]
};