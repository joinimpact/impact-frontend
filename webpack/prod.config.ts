import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { commonPlugins, commonScssLoaders, commonRules, commonConfig, hot } from './common';
import { devServer, publicPath } from './devServer';

const rules = commonRules.concat([
	{
		test: /\.css$/,
		use: [MiniCssExtractPlugin.loader, 'css-loader'],
	},
	{
		test: /\.scss$/,
		use: ([MiniCssExtractPlugin.loader] as webpack.Loader[]).concat(commonScssLoaders),
	},
]);

const plugins = commonPlugins.concat([
	new MiniCssExtractPlugin({
		filename: '[name].[hash].css',
		chunkFilename: '[id].[hash].css',
	}),
]);

const prodConfig: webpack.Configuration = {
	...commonConfig,
	plugins,
	devServer: hot ? (devServer as webpack.Configuration['devServer']) : undefined,
	output: {
		...commonConfig.output,
		publicPath: `${publicPath}`,
	},
	mode: 'production',
	optimization: {
		...commonConfig.optimization,
		minimize: true,
	},
	module: {
		rules,
	},
};

export default prodConfig;
