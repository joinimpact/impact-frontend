import { IDependencies } from 'shared/types/app';
import { all, call, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { getErrorMsg } from 'services/api';
import { selectors as userSelectors, actions as userActions } from 'services/user';
import {
  IBrowseRecommendedOpportunitiesResponse,
  IConversationResponseItem,
  IUploadUserLogoResponse,
} from 'shared/types/responses/volunteer';
import { convertEventResponseToEvent } from 'services/api/converters/events';
import { eventChannel } from 'redux-saga';
import { MessageTypes } from 'shared/types/websocket';
import {
  IConversationMessageResponseItem,
} from 'shared/types/responses/chat';
import { actions as volunteerChatActions, selectors as volunteerChatSelectors } from 'services/volunteerChat';
import { IInviteProps } from 'shared/types/models/auth';
import * as selectors from 'services/user/redux/selectors';


const saveVolunteerPersonalInfoType: NS.ISaveVolunteerPersonalInfo['type'] = 'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO';
const uploadVolunteerLogoType: NS.IUploadVolunteerLogo['type'] = 'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO';
const saveVolunteerAreasOfInterestType: NS.ISaveVolunteerAreaOfInterest['type'] =
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST';
const loadSingleOpportunityType: NS.ILoadSingleOpportunity['type'] = 'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY';
const applyForOpportunityType: NS.IApplyForOpportunity['type'] = 'VOLUNTEER:APPLY_FOR_OPPORTUNITY';
const browseOpportunitiesType: NS.IBrowseOpportunities['type'] = 'VOLUNTEER:BROWSE_OPPORTUNITIES';
const loadEnrolledOpportunitiesType: NS.ILoadEnrolledOpportunities['type'] = 'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES';
const browseOpportunitiesWithFilterType: NS.IBrowseOpportunitiesWithFilter['type'] =
  'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER';
const loadUserEventsType: NS.ILoadUserEvents['type'] = 'VOLUNTEER:LOAD_USER_EVENTS';
const attendEventType: NS.IAttendEvent['type'] = 'VOLUNTEER:ATTEND_EVENT';
const declineEventType: NS.IDeclineEvent['type'] = 'VOLUNTEER:DECLINE_EVENT';
const getMyResponseToEventType: NS.IGetMyResponseToEvent['type'] = 'VOLUNTEER:GET_MY_RESPONSE_TO_EVENT';
const chatSubscribeType: NS.IChatSubscribe['type'] = 'VOLUNTEER:SUBSCRIBE';
const unsubscribeType: NS.IChatUnsubscribe['type'] = 'VOLUNTEER:UNSUBSCRIBE';
const requestHoursType: NS.IRequestHours['type'] = 'VOLUNTEER:REQUEST_HOURS';
const deleteAccountType: NS.IDeleteAccount['type'] = 'VOLUNTEER:DELETE_ACCOUNT';
const loadUserType: NS.ILoadUser['type'] = 'VOLUNTEER:LOAD_USER';

const acceptInvitationType: NS.IAcceptInvitation['type'] = 'VOLUNTEER:ACCEPT_INVITATION';
const declineInvitationType: NS.IDeclineInvitation['type'] = 'VOLUNTEER:DECLINE_INVITATION';

const editUserProfileType: NS.IEditUserProfile['type'] = 'VOLUNTEER:EDIT_USER_PROFILE';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(saveVolunteerPersonalInfoType, executeSaveVolunteerPersonalInfo, deps),
      takeLatest(editUserProfileType, executeEditUserProfile, deps),
      takeLatest(uploadVolunteerLogoType, executeUploadVolunteerLogo, deps),
      takeLatest(saveVolunteerAreasOfInterestType, executeSaveVolunteerAreasOfInterest, deps),
      takeLatest(loadSingleOpportunityType, executeLoadSingleOpportunity, deps),
      takeLatest(applyForOpportunityType, executeApplyForOpportunity, deps),
      takeLatest(browseOpportunitiesType, executeBrowseOpportunities, deps),
      takeLatest(loadEnrolledOpportunitiesType, executeLoadEnrolledOpportunities, deps),
      takeLatest(browseOpportunitiesWithFilterType, executeLoadOpportunitiesWithFilters, deps),
      takeLatest(loadUserEventsType, executeLoadUserEvents, deps),
      takeLatest(attendEventType, executeAttendEvent, deps),
      takeLatest(declineEventType, executeDeclineEvent, deps),
      takeLatest(getMyResponseToEventType, executeGetMyResponseToEvent, deps),
      takeEvery(chatSubscribeType, executeChatSubscribe, deps),
      takeEvery(requestHoursType, executeRequestHours, deps),
      takeLatest(deleteAccountType, executeDeleteAccount, deps),
      takeLatest(loadUserType, executeLoadUser, deps),
      takeLatest(acceptInvitationType, executeAcceptInvitation, deps),
      takeLatest(declineInvitationType, executeDeclineInvitation, deps),
    ]);
  };
}

function* executeSaveVolunteerPersonalInfo({ api, notify, translate: t }: IDependencies, { payload }: NS.ISaveVolunteerPersonalInfo) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    if (userId) {
      yield call(api.volunteer.saveVolunteerPersonalInfo, userId, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        address: payload.address,
        email: payload.email,
        birthday: payload.birthday,
        profile: payload.school ? [
          {
            field: 'school',
            value: payload.school,
            privacy: 0, // Don't know what is this means, using just as constant.
          }
        ] : undefined,
      });
    }
    yield put(actions.saveVolunteerPersonalInfoComplete());
    notify.notifyInfo(t('USER-EDIT-PROFILE-CONTAINER:NOTIFY:SAVED-SUCCESS'));
    yield put(userActions.loadUser());
  } catch (error) {
    const message = getErrorMsg(error);
    notify.notifyError(t('USER-EDIT-PROFILE-CONTAINER:NOTIFY:SAVED-ERROR', {
      error: message,
    }));
    yield put(actions.saveVolunteerPersonalInfoFailed(message));
  }
}

function* executeEditUserProfile({ api, notify, translate: t }: IDependencies, { payload }: NS.IEditUserProfile) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    if (userId) {
      yield call(api.volunteer.saveVolunteerPersonalInfo, userId, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        address: payload.address,
        email: payload.email,
        birthday: payload.birthday,
        profile: payload.school ? [
          {
            field: 'school',
            value: payload.school,
            privacy: 0, // Don't know what is this means, using just as constant.
          }
        ] : undefined,
      });
      yield call(api.volunteer.saveUserTags, userId, {
        tags: payload.tags,
      });
    }
    yield put(actions.editUserProfileComplete());
    notify.notifyInfo(t('USER-EDIT-PROFILE-CONTAINER:NOTIFY:SAVED-SUCCESS'));
    yield put(userActions.loadUser());
  } catch (error) {
    const message = getErrorMsg(error);
    notify.notifyError(t('USER-EDIT-PROFILE-CONTAINER:NOTIFY:SAVED-ERROR', {
      error: message,
    }));
    yield put(actions.editUserProfileFailed(getErrorMsg(error)));
  }
}

function* executeUploadVolunteerLogo({ api, dispatch }: IDependencies, { payload }: NS.IUploadVolunteerLogo) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    const uploadResponse: IUploadUserLogoResponse = yield call(
      api.volunteer.uploadVolunteerLogo,
      userId,
      payload,
      (progress: number) => {
        dispatch(actions.setUploadLogoProgress(progress));
      },
    );
    if (uploadResponse.success) {
      yield put(actions.uploadVolunteerLogoComplete());
      yield put(userActions.updateUserLogo(uploadResponse.profilePicture));
      yield put(actions.setUploadLogoProgress(null));
    } else {
      yield put(actions.uploadVolunteerLogoFailed('Upload failed'));
    }
  } catch (error) {
    yield put(actions.uploadVolunteerLogoFailed(getErrorMsg(error)));
  }
}

function* executeSaveVolunteerAreasOfInterest({ api }: IDependencies, { payload }: NS.ISaveVolunteerAreaOfInterest) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    if (userId) {
      yield call(api.volunteer.saveUserTags, userId, {
        tags: payload,
      });
    }
    yield put(actions.saveVolunteerAreasOfInterestComplete());
  } catch (error) {
    yield put(actions.saveVolunteerAreasOfInterestFailed(getErrorMsg(error)));
  }
}

function* executeLoadSingleOpportunity({ api }: IDependencies, { payload }: NS.ILoadSingleOpportunity) {
  try {
    const response = yield call(api.npo.loadOpportunity, payload);
    yield put(actions.loadSingleOpportunityComplete(response));
  } catch (error) {
    yield put(actions.loadSingleOpportunityFailed(getErrorMsg(error)));
  }
}

function* executeApplyForOpportunity({ api }: IDependencies, { payload }: NS.IApplyForOpportunity) {
  try {
    yield call(api.volunteer.applyForOpportunity, payload.opportunityId, {
      message: payload.message,
    });
    yield put(actions.applyForOpportunityComplete());
  } catch (error) {
    yield put(actions.applyForOpportunityFailed(getErrorMsg(error)));
  }
}

function* executeBrowseOpportunities({ api }: IDependencies) {
  try {
    const response: IBrowseRecommendedOpportunitiesResponse = yield call(
      api.volunteer.browseOpportunitiesWithoutFilters,
    );
    yield put(actions.browseOpportunitiesComplete(response));
  } catch (error) {
    yield put(actions.browseOpportunitiesFailed(getErrorMsg(error)));
  }
}

function* executeLoadEnrolledOpportunities({ api }: IDependencies) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    const response = yield call(api.volunteer.loadOpportunities, userId);
    yield put(actions.loadEnrolledOpportunitiesComplete(response));
  } catch (error) {
    yield put(actions.loadEnrolledOpportunitiesFailed(getErrorMsg(error)));
  }
}

function* executeLoadOpportunitiesWithFilters({ api }: IDependencies, { payload }: NS.IBrowseOpportunitiesWithFilter) {
  try {
    const response = yield call(api.volunteer.browseOpportunities, payload);
    yield put(actions.browseOpportunitiesWithFilterComplete(response));
  } catch (error) {
    yield put(actions.browseOpportunitiesWithFilterFailed(getErrorMsg(error)));
  }
}

function* executeLoadUserEvents({ api }: IDependencies) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    const events = yield call(api.volunteer.loadEvents, userId);
    yield put(actions.loadUserEventsComplete(events.map(convertEventResponseToEvent)));
  } catch (error) {
    yield put(actions.loadUserEventsFailed(getErrorMsg(error)));
  }
}

function* executeAttendEvent({ api }: IDependencies, { payload }: NS.IAttendEvent) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    yield call(api.volunteer.attendEvent, userId, payload.id);
    yield put(actions.attendEventComplete());
    yield put(actions.loadUserEvents());
  } catch (error) {
    yield put(actions.attendEventFailed(getErrorMsg(error)));
  }
}

function* executeDeclineEvent({ api }: IDependencies, { payload }: NS.IDeclineEvent) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    yield call(api.volunteer.declineEvent, userId, payload.id);
    yield put(actions.declineEventComplete());
    yield put(actions.loadUserEvents());
  } catch (error) {
    yield put(actions.declineEventFailed(getErrorMsg(error)));
  }
}

function* executeGetMyResponseToEvent({ api }: IDependencies, { payload }: NS.IGetMyResponseToEvent) {
  try {
    const response = yield call(api.volunteer.getMyResponseToEvent, payload);
    yield put(actions.getMyResponseToEventComplete(response));
  } catch (error) {
    yield put(actions.getMyResponseToEventFailed(getErrorMsg(error)));
  }
}

function* executeRequestHours({ api }: IDependencies, { payload }: NS.IRequestHours) {
  try {
    yield call(api.volunteer.requestHours, payload.organizationId, {
      hours: payload.hours,
      description: payload.description,
    });
    yield put(actions.requestHoursComplete());
  } catch (error) {
    yield put(actions.requestHoursFailed(getErrorMsg(error)));
  }
}

function* executeDeleteAccount({ api }: IDependencies) {
  try {
    yield call(api.volunteer.deleteAccount);
    yield put(actions.deleteAccountComplete());
  } catch (error) {
    yield put(actions.deleteAccountFailed(getErrorMsg(error)));
  }
}

function* executeLoadUser({ api }: IDependencies, { payload }: NS.ILoadUser) {
  try {
    const currentUserId = yield select(userSelectors.selectCurrentUserId);
    const userId = payload ? payload : currentUserId;
    const user = yield call(api.volunteer.loadUserById, userId);
    yield put(actions.loadUserComplete(user));
    if (userId === currentUserId) {
      const userOpportunities = yield call(api.volunteer.loadOpportunities, userId);
      yield put(actions.loadUserOpportunitiesComplete(userOpportunities));
    }
  } catch (error) {
    yield put(actions.loadUserFailed(getErrorMsg(error)));
  }
}

function* executeAcceptInvitation({ api }: IDependencies) {
  try {
    const invitedProps: IInviteProps | null = yield select(selectors.selectInviteProps);
    if (invitedProps) {
      yield call(api.npo.acceptOrganizationInvitation, invitedProps.organizationId, invitedProps.inviteId, {
        key: invitedProps.key,
      });
    }
    yield put(actions.acceptInvitationComplete());
    yield put(userActions.resetInviteProps());
  } catch (error) {
    yield put(actions.acceptInvitationFailed(getErrorMsg(error)));
  }
}

function* executeDeclineInvitation({ api }: IDependencies) {
  try {
    const invitedProps: IInviteProps | null = yield select(selectors.selectInviteProps);
    if (invitedProps) {
      yield call(api.npo.declineOrganizationInvitation, invitedProps.organizationId, invitedProps.inviteId, {
        key: invitedProps.key,
      });
    }
    yield put(actions.declineInvitationComplete());
    yield put(userActions.resetInviteProps());
  } catch (error) {
    yield put(actions.declineInvitationFailed(getErrorMsg(error)));
  }
}

function* executeChatSubscribe({ websocket }: IDependencies) {
  const channel = eventChannel(emitter => {
    websocket.attachEventListener(MessageTypes.MESSAGE_SENT, emitter);
    return () => {
      websocket.removeEventListener(MessageTypes.MESSAGE_SENT, emitter);
    }
  });

  try {
    while (true) {
      const { cancel, task }: { cancel?: NS.IChatUnsubscribe; task?: IConversationMessageResponseItem } = yield race({
        task: take(channel),
        cancel: take(unsubscribeType),
      });

      if (cancel) {
        channel.close();
        break;
      }

      if (task) {
        const currentConversation: IConversationResponseItem | null = yield select(volunteerChatSelectors.selectCurrentConversation);
        // Filter all other messages with other conversations by conversation id
        if (currentConversation && currentConversation.id === task.conversationId) {
          yield put(volunteerChatActions.addChatMessage(task));
        }
      }
    }
  } catch(error) {
    console.error(error);
  } finally {
    channel.close();
  }
}
