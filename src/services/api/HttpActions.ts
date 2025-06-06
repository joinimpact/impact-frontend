import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import appConfig from 'config';
import { ApiErrorInterceptor } from './namespace';
import { ApiError, isErrorStatus } from './ApiError';

type AsyncRequest<T> = Promise<AxiosResponse<T>>;

class HttpActions {
	private request: AxiosInstance;
	private restAddress = appConfig.restServerAddress;

	constructor(baseUrl: string, errorInterceptors: ApiErrorInterceptor[]) {
		const config = this.getConfig(`${this.restAddress}${baseUrl}`);

		this.request = axios.create(config);
		this.configureInterceptor(this.request, errorInterceptors);
	}

	public get<T>(url: string, params?: object, options?: AxiosRequestConfig): AsyncRequest<T> {
		return this.request.get(url, { params, ...options });
	}

	public post<T>(url: string, data?: any, options?: AxiosRequestConfig): AsyncRequest<T> {
		return this.request.post(url, data, options);
	}

	public patch<T>(url: string, data?: any, options?: AxiosRequestConfig): AsyncRequest<T> {
		return this.request.patch(url, data, options);
	}

	public del<T>(url: string, data?: any, params?: object, options?: AxiosRequestConfig): AsyncRequest<T> {
		return this.request.delete(url, { url, data, params, ...options });
	}

	public put<T>(url: string, data?: any, params?: object, options?: AxiosRequestConfig): AsyncRequest<T> {
		return this.request.put(url, data, { params, ...options });
	}

	private configureInterceptor(request: AxiosInstance, errorInterceptors: ApiErrorInterceptor[]): void {
		request.interceptors.response.use(
			(response) => response,
			(response) => {
				if (response.response) {
					const { status /* , data*/ } = response.response;

					// ------------ TODO: REMOVE THIS FIX WHEN API WILL BE FIXED ------
					let { data } = response.response;
					if (typeof data === 'string') {
						data = JSON.parse(data.split('\n')[0]);
					}
					// -----------------------------------------------------------------

					let message = data.msg;
					switch (status) {
						case 404:
							message = '(404) API route not found';
							break;
					}
					if (!message) {
						message = `${status} ${response.response.statusText}`;
					}
					const apiErrorInstance = new ApiError(status, data.errors, message);
					errorInterceptors.forEach((f) => f(apiErrorInstance));
					throw apiErrorInstance;
				}

				throw Error(response.message);
			},
		);
	}

	private getConfig(baseURL: string): AxiosRequestConfig {
		return {
			baseURL,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json',
			},
			validateStatus: (status) => !isErrorStatus(status),
		};
	}
}

export default HttpActions;
