// https://github.com/TypeStrong/ts-node#help-my-types-are-missing
/// <reference path="../@types/global.d.ts" />
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import * as CopyWebpackPlugin from 'copy-webpack-plugin';
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
let contour = process.env.CONTOUR;
if (!contour) {
  contour = hot ? 'custom' : '';
}

export const contourConfigFilePath = contour !== '' ? `${__dirname}/../src/config/config.${contour}.json` : undefined;
if (contour !== '' && contourConfigFilePath) {
  try {
    // Loading custom config file
    customConfig = require(contourConfigFilePath);
    console.info(`Contour config file [${contourConfigFilePath}] loaded`);
  } catch (e) {
    console.info(`Contour config [${contourConfigFilePath}] load failed with error:\n`, e.message);
  }
}

export const commonPlugins: webpack.Plugin[] = [
  new CleanWebpackPlugin(['build'], { root: path.resolve(__dirname, '..') }),
  new webpack.HashedModuleIdsPlugin(),
  // new CopyWebpackPlugin([{ from: `assets/`, to: '/' }]),
  // new HtmlWebpackIncludeAssetsPlugin({
  //   assets: [`/custom.min.js`],
  //   append: false,
  // }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'assets/index.html',
    chunksSortMode: sortChunks,
  }),
  new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
    async: true,
    tsconfig: path.resolve('./tsconfig.json'),
    tslint: path.resolve('./tslint.json'),
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
      camelCase: true,
      localIdentName: '',
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => {
        return [
          autoprefixer({
            browsers: ['last 2 versions'],
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
            rootValue: 13 ,
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

export const commonConfig: webpack.Configuration = {
  target: 'web',
  context: path.resolve(__dirname, '..', 'src'),
  output: {
    sourceMapFilename: `js/[${chunkName}]-[${chunkHash}].bundle.map`,
    path: path.resolve(__dirname, '..', 'build'),
    filename: `js/[name]-[${chunkHash}].bundle.js`,
    chunkFilename: `js/[${chunkName}]-[${chunkHash}].bundle.js`,
    globalObject: 'this',
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
//    alias: {
//      'react-dom': '@hot-loader/react-dom'
//    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
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
    warningsFilter: /export .* was not found in/, // TODO: delete when ts-loader will be updated
  },
};

function sortChunks(a: HtmlWebpackPlugin.Chunk, b: HtmlWebpackPlugin.Chunk) {
  const order = ['app', 'shared', 'vendor', 'manifest'];
  return order.indexOf(b.names[0]) - order.indexOf(a.names[0]);
}
