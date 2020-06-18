import { Reducer, Action } from 'redux';
import { IReduxFormEntry } from 'shared/types/reduxForm';

export function composeReducers<S>(reducers: Array<Reducer<S>>) {
  return <A extends Action>(state: S, action: A) =>
    reducers.reverse().reduce((_state: S, reducer: Reducer<S>) => reducer(_state, action), state);
}

export function makeReduxFormEntry<E, T = string>(
  formName: T,
  fieldNames: Array<keyof E>,
): IReduxFormEntry<T, {[K in keyof E]: K }> {
  return {
    name: formName,
    fieldNames: fieldNames.reduce((res, name) => ({ ...res, [name]: name }), {}) as any,
  };
}
