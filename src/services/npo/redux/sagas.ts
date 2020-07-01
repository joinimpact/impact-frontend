import { all } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
    ]);
  };
}
