var path = require("path");
module.exports = {
    entry: ['whatwg-fetch', './src/app.jsx'],
    output: { filename: "out.js", path: path.resolve(__dirname, "app") },
    devServer: {
        inline: true,
        contentBase: './',
        port: 3001,
        proxy: {
            '/api/': {
                target: 'http://localhost:3002'
            }
        }
    },
    mode: "development", watch: true,
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "stage-2", "react"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}
