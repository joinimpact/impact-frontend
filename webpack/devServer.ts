import * as WebpackDevServer from 'webpack-dev-server';
import ProxyConfig from '../webpack/ProxyConfig';
import Certificates from './Certificates';
import * as path from 'path';
import { IProxyDefinitionConfig } from 'config/types/config';
import {
  customConfig,
  hot,
  contourConfigFilePath,
} from './common';

const ROUTES_PREFIX = '';
const webpackDevHttpPort = (p => (isNaN(p) ? 8000 : p))(Number(customConfig.devServerPort));
const webpackDevHttpHost = '0.0.0.0';
const isHttps = !customConfig.noSSL;

const devServer: WebpackDevServer.Configuration = {
  hot,
  contentBase: path.resolve('..', 'build'),
  host: webpackDevHttpHost,
  port: webpackDevHttpPort,
  inline: true,
  overlay: true, // Show overlay errors
  https:
    isHttps && customConfig.domains
      ? Certificates.createHttpsEnv(['localhost'].concat(Object.keys(customConfig.domains)))
      : isHttps,
  lazy: false,
  historyApiFallback: true,
  disableHostCheck: true,
  clientLogLevel: 'info',

  stats: {
    colors: true,
    warningsFilter: /export .* was not found in/,
  },
};

const localProxy: IProxyDefinitionConfig | {} = customConfig.proxy || {};
let proxyControllers: any[] | undefined;
if (Object.keys(localProxy).length > 0) {
  const proxyConf: IProxyDefinitionConfig = localProxy as IProxyDefinitionConfig;
  proxyControllers = ProxyConfig.getProxyControllers(
    proxyConf,
    contourConfigFilePath,
    undefined,
    isHttps,
  );
}

const publicPath = `${ROUTES_PREFIX}/`;

if (proxyControllers) {
  devServer.proxy = proxyControllers;
}

export { devServer, publicPath };
