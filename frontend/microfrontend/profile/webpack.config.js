const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});

module.exports = {
    mode: 'development',
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 3002,
        historyApiFallback: {
            index: '/public/index.html'
        },
    },
    resolve: {
        alias: {
            'microfrontend_shared-lib': path.resolve(__dirname, '../shared-lib'),
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
            name: 'profile',
            filename: 'remoteEntry.js',
            exposes: {
                "./EditAvatarPopup": "./src/components/EditAvatarPopup",
                "./editAvatarPopupLogic": "./src/components/editAvatarPopupLogic",
                "./EditProfilePopup": "./src/components/EditProfilePopup",
                "./editProfilePopupLogic": "./src/components/editProfilePopupLogic"
            },
            remotes: {
                root: "root@http://localhost:3000/remoteEntry.js",
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
        }),
    ]
};