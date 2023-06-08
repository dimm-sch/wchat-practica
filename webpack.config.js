var path = require('path');
const DotEnv = require('dotenv-webpack');

module.exports = {
    entry: './src/main/js/index.js',
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    resolve: {
        alias: {
            'stompjs': __dirname + '/node_modules' + '/stompjs/lib/stomp.js',
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('./src/main/resources/static/built')
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env",
                                ["@babel/preset-react", {"runtime": "automatic"}]
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }

            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new DotEnv()
    ]
    // stats: "verbose"
};