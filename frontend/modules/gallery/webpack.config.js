const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const deps = require('./package.json').dependencies;
const { ModuleFederationPlugin } = require('webpack').container;
const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';

        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    } else {
        config.mode = 'development';
    }

    config.plugins.push(
        new ModuleFederationPlugin({
            shared: {
                react: {
                    requiredVersion: deps.react,
                    singleton: true,
                },
            },
            name: 'gallery',
            exposes: ['./src']
        })
    )
    return config;
};
