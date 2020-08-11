import { bind } from 'decko';
import { IncomingMessage, ServerResponse, ClientRequest, default as http } from 'http';
import { ProxyConfigArrayItem } from 'webpack-dev-server';
import * as httpProxy from 'http-proxy';
import * as net from 'net';
import { IProxyDefinitionConfig, IProxyControllerConfig } from 'config/types/config';

export interface IProxyConfig {
  id: string;
  path: string;
  url: string;
  logCookies: boolean;
  httpEndpoints?: string[];
  wsEndpoints?: string[];
  secure?: boolean;
  changeOrigin?: boolean;
  stripCookieSecure?: boolean;
  stripCookieHttpOnly?: boolean;
  stripCookiePath?: boolean;
  fixCookiePath?: boolean;
}

export interface IProxyItem {
  context: string[];
  pathRewrite?: { [key: string]: string };
  target: string;
  secure?: boolean;
  changeOrigin?: boolean;
  onProxyRes?: (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse) => void;
  onProxyReq?: (proxyReq: ClientRequest) => void;
  ws?: boolean;
}

interface ICookieKeyValue {
  [key: string]: string;
}

type ICookieParser = (cookie: string) => string;

const CookieModificators: { [key: string]: string } = {
  secure: '; secure',
  httponly: '; httponly',
  path: '; path=[^;]*($)?',
};

export default class ProxyConfig {
  public static getProxyControllers(
    proxyConf: IProxyDefinitionConfig,
    contourConfigFilePath?: string,
    approot?: string,
    isHttps?: boolean,
  ) {
    if (ProxyConfig.checkControllerConfig(proxyConf, contourConfigFilePath)) {
      const endpoints = {
        httpEndpoints: proxyConf['http-endpoints'],
        wsEndpoints: proxyConf['ws-endpoints'],
      };
      const pairs = Object.keys(proxyConf.controllers).map(controllerEndpoint => {
        const compiledControllerEndpoint = approot ? `${approot}/${controllerEndpoint}` : controllerEndpoint;
        const controller = proxyConf.controllers[controllerEndpoint];

        const pickController = (): IProxyConfig => {
          const res = {
            id: controllerEndpoint,
            path: compiledControllerEndpoint,
            logCookies: !!proxyConf['log-cookies'],
            url: typeof controller === 'string' ? controller as string : controller.target,
            ...endpoints,
          };

          if (typeof controller === 'string') {
            return {
              ...res,
            };
          }

          // Default controller config
          return {
            ...res,
            ...this.convertControllerToProxyConfig(controller),
            ...endpoints,
          };
        };

        const config: IProxyConfig = pickController();

        // If server runing in HTTP mode (NO SSL) we have to remove httponly flag from cookies
        if (!isHttps) {
          config.stripCookieHttpOnly = true;
          config.stripCookieSecure = true;
        }
        return new ProxyConfig(config).proxy;
      });

      return pairs.reduce((res: IProxyItem[], pair: IProxyItem[]) => {
        res.push.apply(res, pair);
        return res;
      }, []);
    }

    return [];
  }

  public static checkControllerConfig(proxyConf: IProxyDefinitionConfig, contourConfigFilePath?: string): boolean {
    return ['http-endpoints', 'ws-endpoints', 'controllers'].reduce((ok: boolean, name: string) => {
      if (ok && !(proxyConf as any)[name]) {
        console.error(`${contourConfigFilePath} proxy.${name} not defined!`);
        return false;
      }
      return ok;
    }, true);
  }

  private static convertControllerToProxyConfig = ({
     target,
     ...restController
   }: IProxyControllerConfig): IProxyConfig => restController as IProxyConfig;

  private readonly id: string;
  private readonly path: string;
  private readonly url: string;
  private config: IProxyConfig;

  constructor(config: IProxyConfig) {
    this.id = config.id;
    this.url = config.url;
    this.path = config.path;
    this.config = config;

    const currentModificators: string[] = [];
    if (!!config.stripCookieSecure) {
      currentModificators.push(CookieModificators.secure);
    }
    if (!!config.stripCookieHttpOnly) {
      currentModificators.push(CookieModificators.httponly);
    }
    if (!!config.stripCookiePath) {
      currentModificators.push(CookieModificators.path);
    }

    let cookieModificator: ICookieParser | undefined;

    if (currentModificators.length) {
      const rgx = new RegExp(`${currentModificators.join('|')}`, 'gi');
      cookieModificator = this.wrapCookieModificator(cookie => {
        return cookie.replace(rgx, '');
      });
    }

    if (!!config.fixCookiePath) {
      cookieModificator = this.wrapCookieModificator(cookie => {
        const rgx = new RegExp(CookieModificators.path, 'gi');
        return cookie.replace(rgx, `; path=/${this.id}`);
      }, cookieModificator);
    }

    if (cookieModificator) {
      this.cookieModificator = cookieModificator;
    }
  }

  public get proxy(): ProxyConfigArrayItem[] {
    const config: ProxyConfigArrayItem[] = [this.getHttpConnector()];
    if (this.config.wsEndpoints) {
      config.push(this.getWebSocketConnector());
    }
    return config;
  }

  private cookieModificator: ICookieParser = cookie => cookie;

  private getHttpConnector(): ProxyConfigArrayItem {
    const context = this.config.httpEndpoints ?
      this.config.httpEndpoints.map(endpoint => `/${this.path}/${endpoint}`) :
      `/${this.path}`;

    return {
      context,
      pathRewrite: { [`^/${this.path}`]: '' },
      target: this.url,
      secure: !!this.config.secure,
      changeOrigin: !!this.config.changeOrigin,
      onProxyRes: this.proxyResModificator,
      // onProxyReq: this.proxyReqModificator,
    };
  }

  private getWebSocketConnector(): ProxyConfigArrayItem {
    const context = this.config.wsEndpoints ?
      this.config.wsEndpoints.map(endpoint => `/${this.path}/${endpoint}`) :
      `/${this.path}`;

    return {
      context,
      pathRewrite: { [`^/${this.path}`]: '' },
      target: this.url,
      secure: !!this.config.secure,
      changeOrigin: !!this.config.changeOrigin,
      ws: true,
      onOpen: this.handleWsOpen,
      onProxyReqWs: this.proxyReqWsModificator,
    };
  }

  @bind
  private parseCookies(cookies: string[]) {
    const res: ICookieKeyValue = cookies.reduce((acc: ICookieKeyValue, cookie: string) => {
      const [key, value] = ((matched: RegExpMatchArray | null) => (matched ? matched.slice(1) : []))(
        cookie.match(/^([^=]*)=(.*)$/),
      );

      acc[key] = value;
      return acc;
    }, {});
    return Object.keys(res).map(name => `${name}=${res[name]}`);
  }

  @bind
  private proxyResModificator(proxyRes: http.IncomingMessage, req: http.IncomingMessage, res: http.ServerResponse) {
    // Хак для обхода ошибки webpack'а (в модуле http-proxy)
    // Проблема в том, что при пересылке большоко объёма данных, теряется большой кусок данных
    // ломая при этом ответ, для этого - собираем ответ в буфер и отправляем только один раз
    let body: Buffer = Buffer.from('');
    const _write = res.write;
    // Write временно заменяем на пустыщку
    res.write = (data: any) => true;
    proxyRes.on('data', (data: Buffer) => {
      // Собираем буфер ответа
      body = Buffer.concat([body, data]);
      // body += data;
    });
    proxyRes.on('end', () => {
      // Восстанавливаем write метод и отправляем его
      res.write = _write;
      res.end(body);
    });

    if (proxyRes.headers['set-cookie']) {
      proxyRes.headers['set-cookie'] = this.parseCookies(proxyRes.headers['set-cookie']).map(this.cookieModificator);
      if (this.config.logCookies) {
        console.log(`[${req.method}] ${req.url}\n${JSON.stringify(proxyRes.headers['set-cookie'], null, 2)}`);
      }
    }
  }

  private wrapCookieModificator(next: ICookieParser, prev?: ICookieParser): ICookieParser {
    return prev ? cookie => next(prev(cookie)) : next;
  }

  @bind
  private handleWsOpen(proxySocket: net.Socket) {
    return;
  }

  @bind
  private proxyReqWsModificator(
    proxyReq: http.ClientRequest,
    req: http.IncomingMessage,
    socket: net.Socket,
    options: httpProxy.ServerOptions,
    head: any,
  ) {
    return;
  }
}
