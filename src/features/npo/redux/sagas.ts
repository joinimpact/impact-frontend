import { IDependencies } from 'shared/types/app';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { getErrorMsg } from 'services/api';
import { actions as npoActions, selectors as npoSelectors } from 'services/npo';
import {
  ICreateOrganizationResponse,
  IEventResponsesResponse,
  IUploadNPOLogoResponse,
} from 'shared/types/responses/npo';
import { IEventRequestItem, IUpdateOpportunityRequest } from 'shared/types/requests/npo';
import { convertUpdateOpportunityRequestToResponseType } from 'services/api/converters/npo';
import { IEventResponseItem } from 'shared/types/responses/events';
import { IOpportunityWithEvents } from 'shared/types/responses/shared';
import { convertEventResponseToEvent } from 'services/api/converters/events';

const createOrganizationType: NS.ICreateOrganization['type'] = 'NPO:CREATE_ORGANIZATION';
const uploadOrgLogoType: NS.IUploadOrgLogo['type'] = 'NPO:UPLOAD_ORG_LOGO';
const loadOrganizationTagsType: NS.ILoadOrganizationTags['type'] = 'NPO:LOAD_ORGANIZATION_TAGS';
const saveOrganizationTagsType: NS.ISaveOrganizationTags['type'] = 'NPO:SAVE_ORGANIZATION_TAGS';
const saveOrganizationMembersType: NS.ISaveOrganizationMembers['type'] = 'NPO:SAVE_ORGANIZATION_MEMBERS';
const requestNewOpportunityIdType: NS.IRequestNewOpportunityId['type'] = 'NPO:REQUEST_NEW_OPPORTUNITY_ID';
const updateOpportunityType: NS.IUpdateOpportunity['type'] = 'NPO:UPDATE_OPPORTUNITY';
const uploadOpportunityLogoType: NS.IUploadOpportunityLogo['type'] = 'NPO:UPLOAD_OPPORTUNITY_LOGO';
const loadOpportunitiesType: NS.ILoadOpportunities['type'] = 'NPO:LOAD_OPPORTUNITIES';
const loadSingleOpportunityType: NS.ILoadSingleOpportunity['type'] = 'NPO:LOAD_SINGLE_OPPORTUNITY';
const deleteOpportunityType: NS.IDeleteOpportunity['type'] = 'NPO:DELETE_OPPORTUNITY';
const publishOpportunityType: NS.IPublishOpportunity['type'] = 'NPO:PUBLISH_OPPORTUNITY';
const unpublishOpportunityType: NS.IUnpublishOpportunity['type'] = 'NPO:UNPUBLISH_OPPORTUNITY';
const loadOpportunityVolunteersType: NS.ILoadOpportunityVolunteers['type'] = 'NPO:LOAD_OPPORTUNITY_VOLUNTEERS';
const acceptInvitationType: NS.IAcceptInvitation['type'] = 'NPO:ACCEPT_INVITATION';
const declineInvitationType: NS.IDeclineInvitation['type'] = 'NPO:DECLINE_INVITATION';
const editEventType: NS.IEditEvent['type'] = 'NPO:EDIT_EVENT';
const loadOpportunitiesWithEvents: NS.ILoadOpportunitiesWithEvents['type'] = 'NPO:LOAD_OPPORTUNITIES_WITH_EVENTS';
const deleteEventType: NS.IDeleteEvent['type'] = 'NPO:DELETE_EVENT';
const loadEventResponsesType: NS.ILoadEventResponses['type'] = 'NPO:LOAD_EVENT_RESPONSES';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(createOrganizationType, executeCreateOrganization, deps),
      takeLatest(uploadOrgLogoType, executeUploadOrgLogo, deps),
      takeLatest(loadOrganizationTagsType, executeLoadOrganizationTags, deps),
      takeLatest(saveOrganizationTagsType, executeSaveOrganizationTags, deps),
      takeLatest(saveOrganizationMembersType, executeSaveOrganizationMembers, deps),
      takeLatest(requestNewOpportunityIdType, executeRequestNewOpportunityId, deps),
      takeLatest(updateOpportunityType, executeUpdateOpportunity, deps),
      takeLatest(uploadOpportunityLogoType, executeUploadOpportunityLogo, deps),
      takeLatest(loadOpportunitiesType, executeLoadOpportunities, deps),
      takeLatest(loadSingleOpportunityType, executeLoadSingleOpportunity, deps),
      takeLatest(deleteOpportunityType, executeDeleteOpportunity, deps),
      takeLatest(publishOpportunityType, executePublishOpportunity, deps),
      takeLatest(unpublishOpportunityType, executeUnpublishOpportunity, deps),
      takeLatest(loadOpportunityVolunteersType, executeLoadOpportunityVolunteers, deps),
      takeLatest(acceptInvitationType, executeAcceptInvitation, deps),
      takeLatest(declineInvitationType, executeDeclineInvitation, deps),
      takeLatest(editEventType, executeEditEvent, deps),
      takeLatest(loadOpportunitiesWithEvents, executeLoadOpportunitiesWithEvents, deps),
      takeLatest(deleteEventType, executeDeleteEvent, deps),
      takeLatest(loadEventResponsesType, executeLoadEventResponses, deps),
    ]);
  };
}

function* executeCreateOrganization({ api }: IDependencies, { payload }: NS.ICreateOrganization) {
  try {
    const response: ICreateOrganizationResponse = yield call(api.npo.createOrganization, {
      name: payload.organizationName,
      location: payload.address,
      description: payload.description,
      websiteURL: payload.website,
    });
    yield put(actions.createNewOrganizationComplete());
    yield put(npoActions.setCurrentOrganization({
      name: payload.organizationName,
      // isAdmin: true,
      id: response.organizationId,
      websiteURL: payload.website,
      creatorId: '',
      description: payload.description,
      profilePicture: '',
      profile: [],
      tags: [],
    }));
    yield put(npoActions.loadUserOrganizations());
  } catch (error) {
    yield put(actions.createNewOrganizationFailed(getErrorMsg(error)));
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
      tags: payload.map(tag => ({
        name: tag,
      })),
    });
    yield put(actions.saveOrganizationTagsComplete());
  } catch (error) {
    yield put(actions.saveOrganizationTagsFailed(getErrorMsg(error)));
  }
}

function* executeSaveOrganizationMembers({ api }: IDependencies, { payload }: NS.ISaveOrganizationMembers) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    yield call(api.npo.saveOrganizationMembers, orgId, {
      invites: payload.map(email => ({
        email,
      })),
    });
    yield put(actions.saveOrganizationMembersComplete());
  } catch (error) {
    yield put(actions.saveOrganizationMembersFailed(getErrorMsg(error)));
  }
}

function* executeRequestNewOpportunityId({ api }: IDependencies) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const response = yield call(api.npo.requestNewOpportunityId, orgId);
    yield put(actions.requestNewOpportunityIdComplete(response));
  } catch (error) {
    yield put(actions.requestNewOpportunityIdFailed(getErrorMsg(error)));
  }
}

function* executeUpdateOpportunity({ api }: IDependencies, { payload }: NS.IUpdateOpportunity) {
  try {
    const opportunityId = yield select(selectors.selectCurrentOpportunityId);
    const opportunity: IUpdateOpportunityRequest = {
      title: payload.title,
      description: payload.description,
      limits: {
        volunteersCap: {
          active: payload.capLimitEnabled,
          cap: payload.volunteersCap,
        },
      },
      requirements: {
        expectedHours: {
          active: payload.hoursPerWeekLimitEnabled,
          hours: payload.hoursPerWeek,
        },
        ageLimit: {
          active: payload.ageLimitEnabled,
          from: payload.minAge,
          to: payload.maxAge,
        },
      },
    };
    if (opportunityId) {
      yield call(api.npo.updateOpportunity, opportunityId, opportunity);
      yield call(api.npo.updateOpportunityTags, opportunityId, payload.tags);
      yield put(actions.updateOpportunityComplete(
        convertUpdateOpportunityRequestToResponseType(opportunity, opportunityId, payload.tags)
      ));
    } else {
      yield put(actions.updateOpportunityFailed('Opportunity not set'));
    }
  } catch (error) {
    yield put(actions.updateOpportunityFailed(getErrorMsg(error)));
  }
}

function* executeUploadOpportunityLogo({ api, dispatch }: IDependencies, { payload }: NS.IUploadOpportunityLogo) {
  try {
    const opportunityId = yield select(selectors.selectCurrentOpportunityId);
    if (opportunityId) {
      const response = yield call(api.npo.uploadOpportunityLogo, opportunityId, payload, (progress: number) => {
        dispatch(actions.setUploadOpportunityLogoProgress(progress));
      });
      yield put(actions.uploadOpportunityLogoComplete(response.profilePicture));
      yield put(actions.setUploadOpportunityLogoProgress(null));
    } else {
      yield put(actions.uploadOpportunityLogoFailed('Opportunity not set'));
    }
  } catch (error) {
    yield put(actions.uploadOpportunityLogoFailed(getErrorMsg(error)));
  }
}

function* executeLoadOpportunities({ api }: IDependencies, { payload }: NS.ILoadOpportunities) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const opportunities = yield call(api.npo.loadOpportunities, orgId, payload);
    yield put(actions.loadOpportunitiesCompleted(opportunities));
  } catch (error) {
    yield put(actions.loadOpportunitiesFailed(getErrorMsg(error)));
  }
}

function* executeLoadSingleOpportunity({ api }: IDependencies, { payload }: NS.ILoadSingleOpportunity) {
  try {
    const response = yield call(api.npo.loadOpportunity, payload);
    yield put(actions.loadSingleOpportunityCompleted(response));
  } catch (error) {
    yield put(actions.loadSingleOpportunityFailed(getErrorMsg(error)));
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

function* executePublishOpportunity({ api }: IDependencies, { payload }: NS.IPublishOpportunity) {
  try {
    yield call(api.npo.publishOpportunity, payload);
    yield put(actions.publishOpportunityComplete(payload));
  } catch (error) {
    yield put(actions.publishOpportunityFailed(getErrorMsg(error)));
  }
}

function* executeUnpublishOpportunity({ api }: IDependencies, { payload }: NS.IUnpublishOpportunity) {
  try {
    yield call(api.npo.unpublishOpportunity, payload);
    yield put(actions.unpublishOpportunityComplete(payload));
  } catch (error) {
    yield put(actions.unpublishOpportunityFailed(getErrorMsg(error)));
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
        long: payload.location.long
      },
      hours: payload.hours,
      hoursFrequency: payload.hoursFrequency,
      schedule: {
        from: payload.startTime,
        to: payload.endTime,
        dateOnly: payload.isAllDay
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
