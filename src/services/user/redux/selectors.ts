import { IAppReduxState } from 'shared/types/app';
import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IUser } from 'shared/types/models/user';
import { createSelector } from 'reselect';

function getFeatureState(state: IAppReduxState): NS.IReduxState {
  return state.userService;
}

export function selectCommunication(state: IAppReduxState,
          key: keyof NS.IReduxState['communications']): ICommunication {
  return getFeatureState(state).communications[key];
}

export function selectIsAuthorized(state: IAppReduxState): boolean {
  return getFeatureState(state).data.isAuthorized;
}

export function selectIsAuthRequested(state: IAppReduxState): boolean {
  return getFeatureState(state).data.isAuthRequested;
}

export function selectLogoutRequested(state: IAppReduxState): boolean {
  return getFeatureState(state).data.logoutRequested;
}

export function selectCurrentUser(state: IAppReduxState): IUser | null {
  return getFeatureState(state).data.currentUser;
}

export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (user: IUser | null) => {
    return user ? user.userId : null;
  }
);

export function selectUserTags(state: IAppReduxState): string[] {
  return getFeatureState(state).data.tags;
}
