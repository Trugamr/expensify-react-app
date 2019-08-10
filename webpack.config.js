const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (env) => {
    const isProduction = env === "production"
    return {
        // entry: './src/app.js',
        entry: './src/app.js',
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                test: /\.s?css$/
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css',
            }),
        ],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            port: 9000,
            historyApiFallback: true
        }
    }
}