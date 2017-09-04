var path = require('path');
var webpack = require('webpack');

var config = [
	{
		entry: {
			min: './jquery.inifinite-scroll-up-n-down.js'
		},
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
		devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
		plugins: [
			new webpack.DefinePlugin({
				'process.env':{
					'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
				},
			})
		]
	}
];

module.exports = config;

