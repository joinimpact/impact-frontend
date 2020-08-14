import { IDependencies } from 'shared/types/app';
import { all, call, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { getErrorMsg } from 'services/api';
import { selectors as userSelectors, actions as userActions } from 'services/user';
import { IBrowseRecommendedOpportunitiesResponse, IUploadUserLogoResponse } from 'shared/types/responses/volunteer';
import { convertEventResponseToEvent } from 'services/api/converters/events';
import { eventChannel } from 'redux-saga';
import { MessageTypes } from 'shared/types/websocket';
import { IConversationMessageResponseItem, IConversationMessagesResponse } from 'shared/types/responses/chat';

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
const loadConversationsType: NS.ILoadConversations['type'] = 'VOLUNTEER:LOAD_CONVERSATIONS';
const setCurrentConversationType: NS.ISetCurrentConversation['type'] = 'VOLUNTEER:SET_CURRENT_CONVERSATION';
const loadConversationType: NS.ILoadConversation['type'] = 'VOLUNTEER:LOAD_CONVERSATION';
const sendMessageType: NS.ISendMessage['type'] = 'VOLUNTEER:SEND_MESSAGE';
const chatSubscribeType: NS.IChatSubscribe['type'] = 'VOLUNTEER:SUBSCRIBE';
const unsubscribeType: NS.IChatUnsubscribe['type'] = 'VOLUNTEER:UNSUBSCRIBE';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(saveVolunteerPersonalInfoType, executeSaveVolunteerPersonalInfo, deps),
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
      takeLatest(loadConversationsType, executeLoadConversations, deps),
      takeEvery(setCurrentConversationType, executeSetCurrentConversation, deps),
      takeLatest(loadConversationType, executeLoadConversation, deps),
      takeEvery(sendMessageType, executeSendMessage, deps),
      takeEvery(chatSubscribeType, executeChatSubscribe, deps),
    ]);
  };
}

function* executeSaveVolunteerPersonalInfo({ api }: IDependencies, { payload }: NS.ISaveVolunteerPersonalInfo) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    if (userId) {
      yield call(api.volunteer.saveVolunteerPersonalInfo, userId, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        address: payload.address,
        email: payload.email,
        school: payload.school,
        birthday: payload.birthday,
      });
    }
    yield put(actions.saveVolunteerPersonalInfoComplete());
  } catch (error) {
    yield put(actions.saveVolunteerPersonalInfoFailed(getErrorMsg(error)));
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
      yield call(api.volunteer.saveVolunteerAreasOfInterest, userId, {
        areas: payload,
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

function* executeLoadConversations({ api }: IDependencies) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    const currentConversation = yield select(selectors.selectCurrentConversation);
    const conversations = yield call(api.volunteer.loadConversations, userId);
    yield put(actions.loadConversationsComplete(conversations));
    if (!currentConversation && conversations.length) {
      yield put(actions.setCurrentConversation(conversations[0]));
    }
  } catch (error) {
    yield put(actions.loadConversationsFailed(getErrorMsg(error)));
  }
}

function* executeSetCurrentConversation({ api }: IDependencies, { payload }: NS.ISetCurrentConversation) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    const response: IConversationMessagesResponse = yield call(api.volunteer.loadConversationMessages, userId, payload.id);
    yield put(actions.setCurrentConversationMessages(response));
    yield put(actions.loadConversation(payload.id));
    yield put(actions.setCurrentConversationComplete());
  } catch (error) {
    yield put(actions.setCurrentConversationFailed(getErrorMsg(error)));
  }
}

function* executeLoadConversation({ api }: IDependencies, { payload }: NS.ILoadConversation) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    const conversationItem = yield call(api.volunteer.loadConversation, userId, payload);
    yield put(actions.loadConversationComplete(conversationItem));
  } catch (error) {
    yield put(actions.loadConversationFailed(getErrorMsg(error)));
  }
}

function* executeSendMessage({ api }: IDependencies, { payload }: NS.ISendMessage) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    yield call(api.volunteer.sendMessage, userId, payload.conversationId, payload.message);
    yield put(actions.sendMessageComplete());
  } catch (error) {
    yield put(actions.sendMessageFailed(getErrorMsg(error)));
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
        yield put(actions.addChatMessage(task));
      }
    }
  } catch(error) {
    console.error(error);
  } finally {
    channel.close();
  }
}
