export type TLang = 'en';

export type TLangs = {[key in TLang]: string};

export interface ISettings {
  restServerAddress: string;
  prefixRoot: string;
  lang: TLang;
  googleId: string;
  facebookId: string;
}

class AppConfig {
  public static CUSTOM_CONFIG: any = process.env.CUSTOM_CONFIG || {};
  public static get instance(): AppConfig {
    this._instance = this._instance || new AppConfig();
    return this._instance;
  }
  private static _instance: AppConfig;

  /*private static customizedVar<T = any>(name: string, defaultVal?: T): T {
    return name in AppConfig.CUSTOM_CONFIG ? AppConfig.CUSTOM_CONFIG[name] : defaultVal;
  }*/

  private static getDomainConfig(domain: string, silent: boolean = false): ISettings | {} {
    let res: ISettings | {} = {};
    // If config contains property 'config'
    if ('domains' in AppConfig.CUSTOM_CONFIG) {
      // If current domain configured in file
      if (domain in AppConfig.CUSTOM_CONFIG.domains) {
        res = { ...AppConfig.CUSTOM_CONFIG.domains[domain] };
      } else if (!silent) {
        console.info(`Domain [${domain}] not configured in config file, used PROD variables!`);
      }
    } else {
      // Property 'domains' not found in current config file
      res = { ...AppConfig.CUSTOM_CONFIG };
    }
    return res;
  }

  private isProduction: boolean = process.env.NODE_ENV === 'production';
  private _standardEnv: ISettings;
  private _configuredEnv: ISettings | {} = {};
  private _runtimeEnv: ISettings;

  constructor() {
    const domainName: string = document.domain;

    this._standardEnv = {
      restServerAddress: '/api',
      prefixRoot: `/`,
      lang: 'en',
      googleId: '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com',
      facebookId: '1088597931155576',
    };

    this._configuredEnv = AppConfig.getDomainConfig(domainName, this.isProduction);

    this._runtimeEnv = {
      ...this._standardEnv,
      ...this._configuredEnv,
    };
  }

  public get restServerAddress() {
    return this._runtimeEnv.restServerAddress;
  }

  public get prefixRoot(): string {
    return this._runtimeEnv.prefixRoot;
  }

  public get lang(): TLang {
    return this._runtimeEnv.lang;
  }

  public get googleId(): string {
    return this._runtimeEnv.googleId;
  }

  public get facebookId(): string {
    return this._runtimeEnv.facebookId;
  }
}

const instance = AppConfig.instance;
export default instance;
