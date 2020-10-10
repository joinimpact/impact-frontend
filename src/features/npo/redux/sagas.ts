import { IDependencies } from 'shared/types/app';
import { all, call, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { getErrorMsg } from 'services/api';
import { actions as npoActions, selectors as npoSelectors } from 'services/npo';
import { actions as npoChatActions, selectors as npoChatSelectors } from 'services/npoChat';
import {
	ICreateOrganizationResponse,
	IEventResponsesResponse,
	IOrganizationsResponseItem,
	IUploadNPOLogoResponse,
	IOrganizationVolunteersResponse,
} from 'shared/types/responses/npo';
import { IEventRequestItem } from 'shared/types/requests/npo';
import { IEventResponseItem } from 'shared/types/responses/events';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';
import { convertEventResponseToEvent } from 'services/api/converters/events';
import { eventChannel } from 'redux-saga';
import { IConversationMessageResponseItem } from 'shared/types/responses/chat';
import { MessageTypes } from 'shared/types/websocket';
import { IConversationResponseItem, IOrganizationMembersResponse } from 'shared/types/responses/volunteer';
import { executeLoadConversation } from 'services/npoChat/redux/sagas';
import routes from 'modules/routes';

const createOrganizationType: NS.ICreateOrganization['type'] = 'NPO:CREATE_ORGANIZATION';
const updateOrganizationType: NS.IUpdateOrganization['type'] = 'NPO:UPDATE_ORGANIZATION';
const uploadOrgLogoType: NS.IUploadOrgLogo['type'] = 'NPO:UPLOAD_ORG_LOGO';
const uploadEditableOrgLogoType: NS.IUploadEditableOrgLogo['type'] = 'NPO:UPLOAD_EDITABLE_ORG_LOGO';
const loadOrganizationTagsType: NS.ILoadOrganizationTags['type'] = 'NPO:LOAD_ORGANIZATION_TAGS';
const saveOrganizationTagsType: NS.ISaveOrganizationTags['type'] = 'NPO:SAVE_ORGANIZATION_TAGS';
const saveEditableOrganizationTagsType: NS.ISaveEditableOrganizationTags['type'] =
	'NPO:SAVE_EDITABLE_ORGANIZATION_TAGS';
const saveOrganizationMembersType: NS.ISaveOrganizationMembers['type'] = 'NPO:SAVE_ORGANIZATION_MEMBERS';
const saveEditableOrganizationMembersType: NS.ISaveEditableOrganizationMembers['type'] =
	'NPO:SAVE_EDITABLE_ORGANIZATION_MEMBERS';
const deleteOpportunityType: NS.IDeleteOpportunity['type'] = 'NPO:DELETE_OPPORTUNITY';
const loadOpportunityVolunteersType: NS.ILoadOpportunityVolunteers['type'] = 'NPO:LOAD_OPPORTUNITY_VOLUNTEERS';
const acceptInvitationType: NS.IAcceptInvitation['type'] = 'NPO:ACCEPT_INVITATION';
const declineInvitationType: NS.IDeclineInvitation['type'] = 'NPO:DECLINE_INVITATION';
const editEventType: NS.IEditEvent['type'] = 'NPO:EDIT_EVENT';
const loadOpportunitiesWithEvents: NS.ILoadOpportunitiesWithEvents['type'] = 'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS';
const deleteEventType: NS.IDeleteEvent['type'] = 'NPO:DELETE_EVENT';
const loadEventResponsesType: NS.ILoadEventResponses['type'] = 'NPO:LOAD_EVENT_RESPONSES';

const chatSubscribeType: NS.IChatSubscribe['type'] = 'NPO:SUBSCRIBE';
const unsubscribeType: NS.IChatUnsubscribe['type'] = 'NPO:UNSUBSCRIBE';

const acceptConversationInviteType: NS.IAcceptConversationInvite['type'] = 'NPO:ACCEPT_CONVERSATION_INVITE';
const declineConversationInviteType: NS.IDeclineConversationInvite['type'] = 'NPO:DECLINE_CONVERSATION_INVITE';

const acceptHoursType: NS.IAcceptHours['type'] = 'NPO:ACCEPT_HOURS';
const declineHoursType: NS.IDeclineHours['type'] = 'NPO:DECLINE_HOURS';

const editCurrentOrganizationType: NS.IEditCurrentOrganization['type'] = 'NPO:EDIT_CURRENT_ORGANIZATION';
const loadOrganizationMembersType: NS.ILoadOrganizationMembers['type'] = 'NPO:LOAD_ORGANIZATION_MEMBERS';
const loadOrganizationVolunteersType: NS.ILoadOrganizationVolunteers['type'] = 'NPO:LOAD_ORGANIZATION_VOLUNTEERS';

export default function getSaga(deps: IDependencies) {
	return function* saga() {
		yield all([
			takeLatest(createOrganizationType, executeCreateOrganization, deps),
			takeLatest(updateOrganizationType, executeUpdateOrganization, deps),
			takeLatest(uploadOrgLogoType, executeUploadOrgLogo, deps),
			takeLatest(uploadEditableOrgLogoType, executeUploadEditableOrgLogo, deps),
			takeLatest(loadOrganizationTagsType, executeLoadOrganizationTags, deps),
			takeLatest(saveOrganizationTagsType, executeSaveOrganizationTags, deps),
			takeLatest(saveEditableOrganizationTagsType, executeSaveEditableOrganizationTags, deps),
			takeLatest(saveOrganizationMembersType, executeSaveOrganizationMembers, deps),
			takeLatest(saveEditableOrganizationMembersType, executeSaveEditableOrganizationMembers, deps),
			takeLatest(deleteOpportunityType, executeDeleteOpportunity, deps),
			takeLatest(loadOpportunityVolunteersType, executeLoadOpportunityVolunteers, deps),
			takeLatest(acceptInvitationType, executeAcceptInvitation, deps),
			takeLatest(declineInvitationType, executeDeclineInvitation, deps),
			takeLatest(editEventType, executeEditEvent, deps),
			takeLatest(loadOpportunitiesWithEvents, executeLoadOpportunitiesWithEvents, deps),
			takeLatest(deleteEventType, executeDeleteEvent, deps),
			takeLatest(loadEventResponsesType, executeLoadEventResponses, deps),
			takeEvery(editCurrentOrganizationType, executeEditCurrentOrganization, deps),
			takeLatest(loadOrganizationMembersType, executeLoadOrganizationMembers, deps),
			takeLatest(loadOrganizationVolunteersType, executeLoadOrganizationVolunteers, deps),

			// Chat injection
			takeEvery(chatSubscribeType, executeChatSubscribe, deps),
			takeEvery(acceptConversationInviteType, executeAcceptConversationInvite, deps),
			takeEvery(declineConversationInviteType, executeDeclineConversationInvite, deps),
			takeLatest(acceptHoursType, executeAcceptHours, deps),
			takeLatest(declineHoursType, executeDeclineHours, deps),
		]);
	};
}

function* executeCreateOrganization({ api, notify, translate: t }: IDependencies, { payload }: NS.ICreateOrganization) {
	try {
		const response: ICreateOrganizationResponse = yield call(api.npo.createOrganization, {
			name: payload.organizationName,
			location: payload.address,
			description: payload.description,
			websiteURL: payload.website,
		});
		yield put(actions.createNewOrganizationComplete(response));
		notify.notifyInfo(t('NPO-CREATE-ORGANIZATION-CONTAINER:INFO:ORGANIZATION-CREATED'));
		const newOrganization: IOrganizationsResponseItem = yield call(api.npo.loadOrganization, response.organizationId);
		yield put(actions.setCurrentEditableOrganization(newOrganization));
		yield put(npoActions.setCurrentOrganization(newOrganization));
		// Next lines - old style create organization version, it might be useful
		/* yield put(
      npoActions.setCurrentOrganization({
        name: payload.organizationName,
        // isAdmin: true,
        id: response.organizationId,
        websiteURL: payload.website,
        location: newOrganization.location,
        creatorId: '',
        description: payload.description,
        profilePicture: '',
        profile: [],
        tags: [],
      }),
    );*/
		yield put(npoActions.loadUserOrganizations());
	} catch (error) {
		yield put(actions.createNewOrganizationFailed(getErrorMsg(error)));
	}
}

function* executeUpdateOrganization({ api }: IDependencies, { payload }: NS.IUpdateOrganization) {
	try {
		const response = yield call(api.npo.updateOrganization, payload.organizationId, {
			name: payload.data.organizationName,
			location: payload.data.address,
			description: payload.data.description,
			websiteURL: payload.data.website,
		});
		yield put(actions.updateOrganizationComplete(response));
		const newOrganization: IOrganizationsResponseItem = yield call(api.npo.loadOrganization, response.organizationId);
		yield put(actions.setCurrentEditableOrganization(newOrganization));
	} catch (error) {
		yield put(actions.updateOrganizationFailed(getErrorMsg(error)));
	}
}

function* executeUploadOrgLogo({ api, dispatch }: IDependencies, { payload }: NS.IUploadOrgLogo) {
	try {
		const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
		const response: IUploadNPOLogoResponse = yield call(api.npo.uploadOrgLogo, orgId, payload, (progress: number) => {
			dispatch(actions.setUploadOrganizationLogoProgress(progress));
		});
		yield put(actions.uploadOrgLogoComplete());
		yield put(actions.setUploadOrganizationLogoProgress(null));
		yield put(npoActions.updateOrganizationLogo(response.profilePicture));
	} catch (error) {
		yield put(actions.uploadOrgLogoFailed(getErrorMsg(error)));
	}
}

function* executeUploadEditableOrgLogo({ api, dispatch }: IDependencies, { payload }: NS.IUploadEditableOrgLogo) {
	try {
		const editableOrganization: IOrganizationsResponseItem | null = yield select(
			selectors.selectCurrentEditableOrganization,
		);
		if (editableOrganization) {
			const response: IUploadNPOLogoResponse = yield call(
				api.npo.uploadOrgLogo,
				editableOrganization.id,
				payload,
				(progress: number) => {
					dispatch(actions.setUploadOrganizationLogoProgress(progress));
				},
			);
			yield put(actions.uploadEditableOrgLogoComplete());
			yield put(actions.setUploadOrganizationLogoProgress(null));
			yield put(actions.updateEditableOrganizationLogo(response.profilePicture));
		} else {
			yield put(actions.uploadEditableOrgLogoFailed("Can't upload logo for not existing organization"));
		}
	} catch (error) {
		yield put(actions.uploadEditableOrgLogoFailed(getErrorMsg(error)));
	}
}

function* executeLoadOrganizationTags({ api }: IDependencies) {
	try {
		const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
		yield call(api.npo.loadOrganizationTags, orgId);
		yield put(actions.loadOrganizationTagsComplete());
	} catch (error) {
		yield put(actions.loadOrganizationTagsFailed(getErrorMsg(error)));
	}
}

function* executeSaveOrganizationTags({ api }: IDependencies, { payload }: NS.ISaveOrganizationTags) {
	try {
		const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
		yield call(api.npo.saveOrganizationTags, orgId, {
			tags: payload.map((tag) => ({
				name: tag,
			})),
		});
		yield put(actions.saveOrganizationTagsComplete());
	} catch (error) {
		yield put(actions.saveOrganizationTagsFailed(getErrorMsg(error)));
	}
}

function* executeSaveEditableOrganizationTags({ api }: IDependencies, { payload }: NS.ISaveEditableOrganizationTags) {
	try {
		const editableOrganization: IOrganizationsResponseItem | null = yield select(
			selectors.selectCurrentEditableOrganization,
		);
		if (editableOrganization) {
			yield call(api.npo.saveOrganizationTags, editableOrganization.id, {
				tags: payload.map((tag) => ({
					name: tag,
				})),
			});
			yield put(actions.saveEditableOrganizationTagsComplete());
		} else {
			yield put(actions.saveEditableOrganizationTagsFailed("Can't save tags for non existing organization"));
		}
	} catch (error) {
		yield put(actions.saveEditableOrganizationTagsFailed(getErrorMsg(error)));
	}
}

function* executeSaveOrganizationMembers({ api }: IDependencies, { payload }: NS.ISaveOrganizationMembers) {
	try {
		const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
		yield call(api.npo.saveOrganizationMembers, orgId, {
			invites: payload.map((email) => ({
				email,
			})),
		});
		yield put(actions.saveOrganizationMembersComplete());
	} catch (error) {
		yield put(actions.saveOrganizationMembersFailed(getErrorMsg(error)));
	}
}

function* executeSaveEditableOrganizationMembers(
	{ api }: IDependencies,
	{ payload }: NS.ISaveEditableOrganizationMembers,
) {
	try {
		const editableOrganization: IOrganizationsResponseItem | null = yield select(
			selectors.selectCurrentEditableOrganization,
		);
		if (editableOrganization) {
			yield call(api.npo.saveOrganizationMembers, editableOrganization.id, {
				invites: payload.map((email) => ({
					email,
				})),
			});
			yield put(actions.saveEditableOrganizationMembersComplete());
		} else {
			yield put(actions.saveEditableOrganizationMembersFailed("Can't save members for non existing organization"));
		}
	} catch (error) {
		yield put(actions.saveEditableOrganizationMembersFailed(getErrorMsg(error)));
	}
}

function* executeDeleteOpportunity({ api }: IDependencies, { payload }: NS.IDeleteOpportunity) {
	try {
		yield call(api.npo.deleteOpportunity, payload);
		yield put(actions.deleteOpportunityComplete());
	} catch (error) {
		yield put(actions.deleteOpportunityFailed(getErrorMsg(error)));
	}
}

function* executeLoadOpportunityVolunteers({ api }: IDependencies, { payload }: NS.ILoadOpportunityVolunteers) {
	try {
		const response = yield call(api.npo.loadOpportunityVolunteers, payload);
		yield put(actions.loadOpportunityVolunteersComplete(response));
	} catch (error) {
		yield put(actions.loadOpportunityVolunteersFailed(getErrorMsg(error)));
	}
}

function* executeAcceptInvitation({ api }: IDependencies, { payload }: NS.IAcceptInvitation) {
	try {
		yield call(api.npo.acceptInvitation, payload.opportunityId, payload.userId);
		yield put(actions.acceptInvitationComplete());
		yield put(actions.loadOpportunityVolunteers(payload.opportunityId));
	} catch (error) {
		yield put(actions.acceptInvitationFailed(getErrorMsg(error)));
	}
}

function* executeDeclineInvitation({ api }: IDependencies, { payload }: NS.IDeclineInvitation) {
	try {
		yield call(api.npo.declineInvitation, payload.opportunityId, payload.userId);
		yield put(actions.declineInvitationComplated());
		yield put(actions.loadOpportunityVolunteers(payload.opportunityId));
	} catch (error) {
		yield put(actions.declineInvitationFailed(getErrorMsg(error)));
	}
}

function* executeEditEvent({ api }: IDependencies, { payload }: NS.IEditEvent) {
	try {
		const eventRequestItem: IEventRequestItem = {
			title: payload.title,
			description: payload.description,
			location: {
				lat: payload.location.lat,
				long: payload.location.long,
			},
			hours: payload.hours,
			hoursFrequency: payload.hoursFrequency,
			schedule: {
				from: payload.startTime,
				to: payload.endTime,
				dateOnly: payload.isAllDay,
			},
		};
		if (payload.id) {
			yield call(api.npo.updateEvent, payload.id, eventRequestItem);
		} else {
			yield call(api.npo.createNewEvent, payload.opportunityId, eventRequestItem);
		}
		yield put(actions.editEventComplete());
		yield put(actions.loadOpportunitiesWithEvents()); // Update calendar
	} catch (error) {
		yield put(actions.editEventFailed(getErrorMsg(error)));
	}
}

function* executeLoadOpportunitiesWithEvents({ api }: IDependencies) {
	try {
		const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
		const opportunitiesWithEvents: IOpportunityWithEvents[] = [];
		const opportunities = yield call(api.npo.loadOpportunities, orgId, {});
		for (const opportunity of opportunities) {
			const events: IEventResponseItem[] = yield call(api.npo.loadOpportunityEvents, opportunity.id);
			opportunitiesWithEvents.push({
				...opportunity,
				events: events.map((event: IEventResponseItem) => convertEventResponseToEvent(event, opportunity)),
			});
		}
		yield put(actions.loadOpportunitiesWithEventsComplete(opportunitiesWithEvents));
	} catch (error) {
		yield put(actions.loadOpportunitiesWithEventsFailed(getErrorMsg(error)));
	}
}

function* executeDeleteEvent({ api }: IDependencies, { payload }: NS.IDeleteEvent) {
	try {
		yield call(api.npo.deleteEvent, payload);
		yield put(actions.deleteEventComplete());
		yield put(actions.loadOpportunitiesWithEvents()); // Update calendar
	} catch (error) {
		yield put(actions.deleteEventFailed(getErrorMsg(error)));
	}
}

function* executeLoadEventResponses({ api }: IDependencies, { payload }: NS.ILoadEventResponses) {
	try {
		const responses: IEventResponsesResponse[] = yield call(api.npo.loadEventResponses, payload);
		yield put(actions.loadEventResponsesComplete(responses));
	} catch (error) {
		yield put(actions.loadEventResponsesFailed(getErrorMsg(error)));
	}
}

function* executeEditCurrentOrganization({ api }: IDependencies) {
	const organization: IOrganizationsResponseItem | null = yield select(npoSelectors.selectCurrentOrganization);
	if (organization) {
		const fullOrganizationResponse: IOrganizationsResponseItem = yield call(api.npo.loadOrganization, organization.id);
		yield put(actions.setCurrentEditableOrganization(fullOrganizationResponse));
		yield put(push(routes.dashboard.organization.edit.getPath()));
	}
}

function* executeLoadOrganizationMembers({ api }: IDependencies) {
	try {
		const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
		const response: IOrganizationMembersResponse = yield call(api.npo.loadOrganizationMembers, orgId);
		yield put(actions.loadOrganizationMembersComplete(response));
	} catch (error) {
		yield put(actions.loadOrganizationMembersFailed(getErrorMsg(error)));
	}
}

function* executeLoadOrganizationVolunteers({ api }: IDependencies) {
	try {
		const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
		const response: IOrganizationVolunteersResponse = yield call(api.npo.loadOrganizationVolunteers, orgId);
		yield put(actions.loadOrganizationVolunteersComplete(response));
	} catch (error) {
		yield put(actions.loadOrganizationVolunteersFailed(getErrorMsg(error)));
	}
}

function* executeAcceptConversationInvite(deps: IDependencies, { payload }: NS.IAcceptConversationInvite) {
	try {
		yield call(
			executeAcceptInvitation,
			deps,
			actions.acceptInvitation({
				userId: payload.userId,
				opportunityId: payload.opportunityId,
			}),
		);
		const currentConversation: IConversationResponseItem | null = yield select(
			npoChatSelectors.selectCurrentConversation,
		);
		if (currentConversation) {
			yield call(executeLoadConversation, deps, npoChatActions.loadConversation(currentConversation.id));
		}
		yield put(actions.acceptConversationInviteComplete());
	} catch (error) {
		yield put(actions.acceptConversationInviteFailed(getErrorMsg(error)));
	}
}

function* executeDeclineConversationInvite(deps: IDependencies, { payload }: NS.IDeclineConversationInvite) {
	try {
		yield call(
			executeDeclineInvitation,
			deps,
			actions.declineInvitation({
				userId: payload.userId,
				opportunityId: payload.opportunityId,
			}),
		);
		const currentConversation: IConversationResponseItem | null = yield select(
			npoChatSelectors.selectCurrentConversation,
		);
		if (currentConversation) {
			yield call(executeLoadConversation, deps, npoChatActions.loadConversation(currentConversation.id));
		}
		yield put(actions.declineConversationInviteComplete());
	} catch (error) {
		yield put(actions.declineConversationInviteFailed(getErrorMsg(error)));
	}
}

function* executeAcceptHours({ api }: IDependencies, { payload }: NS.IAcceptHours) {
	try {
		yield call(api.npo.acceptHours, payload.organizationId, payload.requestId);
		yield put(actions.acceptHoursComplete());
	} catch (error) {
		yield put(actions.acceptHoursFailed(getErrorMsg(error)));
	}
}

function* executeDeclineHours({ api }: IDependencies, { payload }: NS.IDeclineHours) {
	try {
		yield call(api.npo.declineHours, payload.organizationId, payload.requestId);
		yield put(actions.declineHoursComplete());
	} catch (error) {
		yield put(actions.declineHoursFailed(getErrorMsg(error)));
	}
}

function* executeChatSubscribe({ websocket }: IDependencies) {
	const channel = eventChannel((emitter) => {
		websocket.attachEventListener(MessageTypes.MESSAGE_SENT, emitter);
		return () => {
			websocket.removeEventListener(MessageTypes.MESSAGE_SENT, emitter);
		};
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
				const currentConversation: IConversationResponseItem | null = yield select(
					npoChatSelectors.selectCurrentConversation,
				);
				// Filter all other messages with other conversations by conversation id
				if (currentConversation && currentConversation.id === task.conversationId) {
					yield put(npoChatActions.addChatMessage(task));
				}
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		channel.close();
	}
}
