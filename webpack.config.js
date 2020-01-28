const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundler.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s?css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader',
					'sass-loader'
        ],
			},
			{
		  	test: /\.(ico|webp|gif|png|jpe?g|svg|woff2?|ttf|otf)$/i,
		  	exclude: /node_modules/,
		  	use: [
		  		{
		        loader: 'file-loader',
		        options: {
				    	name: (path) => {
				    		let s = path.split('.');
				    		let extension = s[s.length-1];
				    		return (
				    			/(woff2?|ttf|otf)$/i.test(extension) ?
				    			'fonts/[name].[ext]' : 'images/[name].[ext]'
				    		)
				    	}
			    	}
					}
				]
		  }
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
		  filename: '[name].css'
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin()
		]
	}
};