import { IAppReduxState, TUserType } from 'shared/types/app';
import * as NS from '../namespace';
import { ICommunication } from 'shared/types/redux';
import { IUser } from 'shared/types/models/user';
import { createSelector } from 'reselect';
import { IInviteProps } from 'shared/types/models/auth';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

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

export function selectIsCurrentUserLoaded(state: IAppReduxState): boolean {
  return Boolean(selectCurrentUser(state));
}

export function selectUserTags(state: IAppReduxState): string[] {
  return getFeatureState(state).data.userTags;
}

export function selectTags(state: IAppReduxState): string[] {
  return getFeatureState(state).data.tags;
}

export function selectCurrentViewType(state: IAppReduxState): TUserType {
  return getFeatureState(state).data.currentViewMode;
}

export function selectInviteProps(state: IAppReduxState): IInviteProps | null {
  return getFeatureState(state).data.inviteProps;
}

export function selectInviteOrganization(state: IAppReduxState): IOrganizationsResponseItem | null {
  return getFeatureState(state).data.inviteOrganization;
}
