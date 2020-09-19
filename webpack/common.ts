// https://github.com/TypeStrong/ts-node#help-my-types-are-missing
/// <reference path="../@types/global.d.ts" />
import * as webpack from 'webpack';
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
// import * as HtmlWebpackIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import pxtorem from 'postcss-pxtorem';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import postcssReporter from 'postcss-reporter';
import postcssSCSS from 'postcss-scss';
import autoprefixer from 'autoprefixer';
import stylelint from 'stylelint';
import doiuse from 'doiuse';
import { ICustomConfig } from 'config/types/config';

const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

export const chunkName = process.env.NODE_ENV === 'production' ? 'id' : 'name';
export const chunkHash = process.env.WATCH_MODE ? 'hash' : 'chunkhash';
export const hot = !!process.env.WATCH_MODE;

export let customConfig: ICustomConfig = {};
export const contourConfigFilePath = `${__dirname}/../.config.json`;
try {
	// Loading custom config file
	customConfig = require(contourConfigFilePath);
	console.info(`Config file [${contourConfigFilePath}] loaded`);
} catch (e) {
	console.info(`Config [${contourConfigFilePath}] load failed with error:\n`, e.message);
}

export const entrypoints: { [key in string]: string[] } = {
	app: ([] as string[]).concat(hot ? 'react-hot-loader/patch' : []).concat('./index.tsx'),
};

const templateChunkFilter = (ext: string) => Object.keys(entrypoints).filter((name) => name !== ext);

export const commonPlugins: webpack.Plugin[] = [
	new CleanWebpackPlugin(['build'], { root: path.resolve(__dirname, '..') }),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	new webpack.HashedModuleIdsPlugin(),
	new CopyWebpackPlugin({
		patterns: [
			{ from: 'assets/static', to: 'static/' },
			// { from: 'assets/*.js', flatten: true, },
			// { from: 'assets/*.css', flatten: true, },
		],
	}),
	// new HtmlWebpackIncludeAssetsPlugin({
	//   assets: [`/custom.min.js`],
	//   append: false,
	// }),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: 'assets/index.html',
		meta: {
			viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
			'format-detection': 'telephone=no',
		},
		excludeChunks: templateChunkFilter('app'),
		chunksSortMode: sortChunks,
	}),
	new ForkTsCheckerWebpackPlugin({
		// checkSyntacticErrors: true,
		// configFile: '../tsconfig.json',
		async: true,
		typescript: {
			configFile: path.resolve('./tsconfig.json'),
		},
		// tsconfig: path.resolve('./tsconfig.json'),
		// tslint: path.resolve('./tslint.json'),
	}),
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		'process.env.NODE_ENV_MODE': JSON.stringify(process.env.NODE_ENV_MODE),
		'process.env.CUSTOM_CONFIG': JSON.stringify(customConfig || {}),
	}),
];

if (!!customConfig.enableWebpackProgressOutput) {
	commonPlugins.unshift(
		new SimpleProgressWebpackPlugin({
			format: 'mimimal',
		}),
	);
}

export const commonRules: webpack.RuleSetRule[] = [
	{
		test: /\.(ts|tsx)$/,
		use: ([] as any[]).concat(hot ? 'react-hot-loader/webpack' : []).concat([
			'cache-loader',
			{
				loader: 'thread-loader',
				options: {
					workers: require('os').cpus().length - 1,
					poolTimeout: hot ? Infinity : 2000,
				},
			},
			{
				loader: 'ts-loader',
				options: {
					happyPackMode: true,
					transpileOnly: true,
					experimentalWatchApi: true,
					logLevel: 'error',
				},
			},
		]),
	},
	{
		test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
		use: 'file-loader?name=fonts/[hash].[ext]',
	},
	{
		test: /-inline\.svg$/,
		loader: 'svg-inline-loader',
	},
	{
		test: /\.(png|svg|jpg)/,
		exclude: [/(-inline\.svg)/],
		oneOf: [
			// {
			//   test: /\/shared\/view\/images\/flags\//,
			//   use: 'file-loader?name=images/[name].[ext]',
			// },
			{
				use: {
					loader: 'url-loader',
					options: {
						name: 'images/[name].[ext]',
						limit: 10000,
						fallback: 'file-loader',
					},
				},
			},
		],
	},
];

export const commonScssLoaders: webpack.Loader[] = [
	{
		loader: 'css-loader',
		options: {
			importLoaders: 2,
			modules: false,
			// camelCase: true,
			// localIdentName: '',
		},
	},
	{
		loader: 'postcss-loader',
		options: {
			plugins: () => {
				return [
					autoprefixer({
						// browsers: ['last 2 versions'],
					}),
				];
			},
		},
	},
	{ loader: 'sass-loader', options: {} },
	{
		loader: 'postcss-loader',
		options: {
			syntax: postcssSCSS,
			plugins: () => {
				return [
					pxtorem({
						rootValue: 13,
						unitPrecision: 10,
						propList: ['*'], // props list must be declared, or it will not work
						selectorBlackList: [/^body$/], // exclude body from replacement
						replace: true,
					}),
					stylelint(),
					doiuse({
						browsers: ['ie >= 11', 'last 2 versions'],
						ignore: ['flexbox', 'rem', 'outline', 'viewport-units'],
						ignoreFiles: ['**/normalize.css'],
					}),
					postcssReporter({
						clearReportedMessages: true,
						throwError: true,
					}),
				];
			},
		},
	},
];

const associated = new Set(['lodash', 'redux-devtools-extension', 'moment', 'decimal.js', 'core-js']);
const standalonePackages: { [key in string]: string } = {
	'@amcharts': 'amchart',
	pdfmake: 'amchart',
	xlsx: 'amchart',
};

export const commonConfig: webpack.Configuration = {
	target: 'web',
	context: path.resolve(__dirname, '..', 'src'),
	// configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
	output: {
		sourceMapFilename: `js/[${chunkName}]-[${chunkHash}].bundle.map`,
		path: path.resolve(__dirname, '..', 'build'),
		filename: `js/[name]-[${chunkHash}].bundle.js`,
		chunkFilename: `js/[${chunkName}]-[${chunkHash}].bundle.js`,
		globalObject: 'this',
	},
	entry: entrypoints,
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

						let bundleName: string = associated.has(packageName) ? 'vendor-isolated' : 'vendor-pack';

						if (standalonePackages.hasOwnProperty(packageName)) {
							bundleName = standalonePackages[packageName as string];
						}

						// npm package names are URL-safe, but some servers don't like @ symbols
						// return `npm.${packageName.replace('@', '')}`;
						return bundleName.replace('@', '');
					},
				},
			},
		},
		runtimeChunk: {
			name: 'manifest',
		},
		minimize: false,
	},
	stats: {
		assets: false,
		hash: false,
		chunks: false,
		entrypoints: false,
		publicPath: false,
		children: false,
		modules: false,
		warningsFilter: /export .* was not found in/,
	},
};

function sortChunks(a: any, b: any) {
	const order = ['app', 'shared', 'vendor', 'manifest'];
	return order.indexOf(b.names[0]) - order.indexOf(a.names[0]);
}
