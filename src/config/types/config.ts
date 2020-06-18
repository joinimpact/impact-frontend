export interface IDomainConfig {
  publicApiAddress: string;
}

export interface IProxyControllerConfig {
  target: string;
}

export interface IProxyDefinitionConfig {
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
