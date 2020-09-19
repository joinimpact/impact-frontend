import { ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';

interface IProtectAction {
	type: '';
	error: any;
}

export default function makeCommunicationReducer<
	E extends IPlainAction<string> = IProtectAction,
	C extends IPlainAction<string> = IProtectAction,
	F extends IPlainFailAction<string | undefined> = IProtectAction,
	R extends IPlainAction<string> = IProtectAction
>(
	executeType: E['type'],
	completedType: C['type'],
	failedType: F['type'],
	initial: ICommunication<F['error']>,
	resetType?: R['type'],
): (state: ICommunication<F['error']>, action: IPlainAction<string>) => ICommunication<F['error']> {
	return (state: ICommunication<F['error']> = initial, action: IPlainAction<string>) => {
		switch (action.type) {
			case executeType:
				return { error: undefined, isRequesting: true, isLoaded: false };
			case completedType:
				return { error: undefined, isRequesting: false, isLoaded: true };
			// When a fail occurs, the `error` parameter must get a positive value
			// Otherwise the state can be considered as "no errors"
			case failedType:
				return { error: (action as F).error, isRequesting: false, isLoaded: false };
			case resetType:
				return initial;
			default:
				return state;
		}
	};
}
