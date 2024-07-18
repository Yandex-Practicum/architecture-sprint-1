const HtmlWebPackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});

module.exports = {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 3003,
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
        new ModuleFederationPlugin({
            name: "cards",
            filename: "remoteEntry.js",
            remotes: {
                root: "root@http://localhost:3000/remoteEntry.js",
            },
            exposes: {
                './AddPlacePopup': './src/components/AddPlacePopup',
                './addPlacePopupLogic': './src/components/addPlacePopupLogic',
                './cardLogic': './src/components/cardLogic',
                './Card': './src/components/Card',
                './ImagePopup': './src/components/ImagePopup',
                './imagePopupLogic': './src/components/imagePopupLogic',
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
            ]
        })
    ]
};