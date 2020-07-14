import { IDependencies } from 'shared/types/app';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import * as selectors from './selectors';
import { getErrorMsg } from 'services/api';
import { actions as npoActions, selectors as npoSelectors } from 'services/npo';
import { ICreateOrganizationResponse, IUploadNPOLogoResponse } from 'shared/types/responses/npo';
import { IUpdateOpportunityRequest } from 'shared/types/requests/npo';
import { convertUpdateOpportunityRequestToResponseType } from 'services/api/converters/npo';

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

function* executeLoadOpportunities({ api }: IDependencies) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const opportunities = yield call(api.npo.loadOpportunities, orgId);
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
