const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
				include: path.resolve(__dirname, 'src'),
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
				include: path.resolve(__dirname, 'src'),
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['es2015', { modules: false }]
						]
					}
				}]
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
	],

	devServer: {
		contentBase: path.resolve(__dirname, "dist"),
		compress: true,
		watchContentBase: true,
		port: 8080
	}
}
