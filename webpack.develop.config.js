var path = require('path');
var webpack = require('webpack');

var config = {
	entry: [
		'./docs/script.js',
		'./docs/style.css'
	],
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/docs/')
	},
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	devServer: {
		port: 8080,
		publicPath: 'http://localhost:8080/',
		contentBase: path.join(__dirname, '/docs/')
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = config;

