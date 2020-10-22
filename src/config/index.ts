import momentTz from 'moment-timezone';

export type TLang = 'en';

export type TLangs = { [key in TLang]: string };

export interface ISettings {
	restServerAddress: string;
	publicWsAddress: string;
	prefixRoot: string;
	lang: TLang;
	title: string;
	timezone: string;
	googleId: string;
	facebookId: string;
	googlePlaceAutoCompleteKey: string;
}

class AppConfig {
	public static CUSTOM_CONFIG: any = process.env.CUSTOM_CONFIG || {};
	public static get instance(): AppConfig {
		this._instance = this._instance || new AppConfig();
		return this._instance;
	}
	private static _instance: AppConfig;

	/* private static customizedVar<T = any>(name: string, defaultVal?: T): T {
    return name in AppConfig.CUSTOM_CONFIG ? AppConfig.CUSTOM_CONFIG[name] : defaultVal;
  }*/

	private static getDomainConfig(domain: string, silent = false): ISettings | Record<string, unknown> {
		let res: ISettings | Record<string, unknown> = {};
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
	private _configuredEnv: ISettings | Record<string, unknown> = {};
	private _runtimeEnv: ISettings;

	constructor() {
		const domainName: string = document.domain;

		this._standardEnv = {
			restServerAddress: '/',
			publicWsAddress: '/ws/v1',
			prefixRoot: '/',
			title: 'Impact',
			lang: 'en',
			timezone: momentTz.tz.guess(),
			googleId: '235653188568-t0s5qq3v960g6js37qdp7949ot4hmh3h.apps.googleusercontent.com',
			facebookId: '2701201706825562',
			googlePlaceAutoCompleteKey: 'AIzaSyCtPKHY55u_IAob6du56Fw2iD0xzURc8SE',
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

	public get publicWsAddress() {
		return this._runtimeEnv.publicWsAddress;
	}

	public get prefixRoot(): string {
		return this._runtimeEnv.prefixRoot;
	}

	public get title(): string {
		return this._runtimeEnv.title;
	}

	public get lang(): TLang {
		return this._runtimeEnv.lang;
	}

	public get timezone(): string {
		return this._runtimeEnv.timezone;
	}

	public get googleId(): string {
		return this._runtimeEnv.googleId;
	}

	public get facebookId(): string {
		return this._runtimeEnv.facebookId;
	}

	public get googlePlaceAutoCompleteKey(): string {
		return this._runtimeEnv.googlePlaceAutoCompleteKey;
	}
}

const instance = AppConfig.instance;
export default instance;
