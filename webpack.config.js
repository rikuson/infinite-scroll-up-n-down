var path = require('path');
var webpack = require('webpack');

var config = [
	{
		entry: [
			'./docs/script.js',
			'./docs/style.css'
		],
		output: {
			filename: 'bundle.js',
			path: path.join(__dirname, '/docs/')
		},
		resolve: {
			extensions: ['.js', '.css']
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
		devtool: false,
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
				}
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
		]
	},
	{
		entry: './jquery.inifinite-scroll-up-n-down.js',
		output: {
			filename: 'jquery.inifinite-scroll-up-n-down.min.js',
			path: path.join(__dirname, '/')
		},
		resolve: {
			extensions: ['.js']
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/
				}
			]
		},
		devtool: false,
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
				}
			})
		]
	}
];

module.exports = config;

