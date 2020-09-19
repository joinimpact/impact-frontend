import { Reducer } from 'redux';

export interface ICommunication<E = string | undefined> {
	isRequesting: boolean;
	error: E | undefined;
	isLoaded: boolean;
}

export const initialCommunicationField: ICommunication = { isRequesting: false, error: undefined, isLoaded: false };

export interface IPayloadHolder<T> {
	payload: T;
}

export interface IPlainAction<T> {
	type: T;
}

export interface IAction<T, P> extends IPlainAction<T>, IPayloadHolder<P> {}

export interface IPlainFailAction<T, E = string | undefined> extends IPlainAction<T> {
	error: E;
}

export interface IFailAction<T, P, E = string> extends IPlainFailAction<T, E> {
	payload: P;
}

export type ReducersMap<T> = { [key in keyof T]: Reducer<T[key]> };
