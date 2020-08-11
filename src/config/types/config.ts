export interface IDomainConfig {
  publicApiAddress: string;
  publicWsAddress: string;
}

export interface IProxyControllerConfig {
  target: string;
}

export interface IProxyDefinitionConfig {
  'http-endpoints': string[];
  'ws-endpoints': string[];
  'log-cookies': boolean;
  controllers: { [key: string]: IProxyControllerConfig };
}

export interface ICustomConfig {
  noSSL?: boolean;
  devServerPort?: number;
  enableWebpackProgressOutput?: boolean;
  proxy?: IProxyDefinitionConfig;
  domains?: { [key: string]: IDomainConfig };
}
