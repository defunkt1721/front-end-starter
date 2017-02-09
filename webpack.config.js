const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// webpack.config.js
module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		app: './app.js'
	},

	module: {
		rules: [

			{
				test: /\.pug$/,
				// include: path.resolve(__dirname, 'src'),
				loaders: ['pug-loader?pretty']
			},

			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						'css-loader',
						'postcss-loader'
					]
				})
			},

			{
				test: /\.js$/,
				// include: path.resolve(__dirname, 'src'),
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['es2015', { modules: false }]
						]
					}
				}]
			},

			{
				test: /\.(ttf|eot|woff|woff2|svg|png|jpg|jpeg)$/,
				loader: "url-loader?limit=100000&name=static/[name].[ext]"
			}

		]
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	plugins: [
		new ExtractTextPlugin('./styles/main.css'),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.pug'
		}),
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost:8080/'
			},
			{
				reload: false
			}
		)
	],

	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		compress: true,
		watchContentBase: true,
		port: 8080
	}
}
