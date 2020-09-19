import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { IDependencies } from 'shared/types/app';
import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import * as NS from '../namespace';
import { getErrorMsg } from 'services/api';
import { selectors as npoSelectors } from 'services/npo';
import { convertUpdateOpportunityRequestToResponseType } from 'services/api/converters/npo';
import { IUpdateOpportunityRequest } from 'shared/types/requests/npo';
import { IOrganizationsResponseItem, IUserOrganizationsResponse } from 'shared/types/responses/npo';

const loadUserOrganizationsType: NS.ILoadUserOrganizations['type'] = 'NPO_SERVICE:LOAD_USER_ORGANIZATIONS';
const loadOpportunitiesType: NS.ILoadOpportunities['type'] = 'NPO_SERVICE:LOAD_OPPORTUNITIES';
const requestNewOpportunityIdType: NS.IRequestNewOpportunityId['type'] = 'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID';
const updateOpportunityType: NS.IUpdateOpportunity['type'] = 'NPO_SERVICE:UPDATE_OPPORTUNITY';
const uploadOpportunityLogoType: NS.IUploadOpportunityLogo['type'] = 'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO';
const loadSingleOpportunityType: NS.ILoadSingleOpportunity['type'] = 'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY';
const publishOpportunityType: NS.IPublishOpportunity['type'] = 'NPO_SERVICE:PUBLISH_OPPORTUNITY';
const unpublishOpportunityType: NS.IUnpublishOpportunity['type'] = 'NPO_SERVICE:UNPUBLISH_OPPORTUNITY';

export default function getSaga(deps: IDependencies) {
	return function* saga() {
		yield all([
			takeLatest(loadUserOrganizationsType, executeLoadUserOrganizations, deps),
			takeLatest(loadOpportunitiesType, executeLoadOpportunities, deps),
			takeLatest(requestNewOpportunityIdType, executeRequestNewOpportunityId, deps),
			takeLatest(updateOpportunityType, executeUpdateOpportunity, deps),
			takeLatest(uploadOpportunityLogoType, executeUploadOpportunityLogo, deps),
			takeLatest(loadSingleOpportunityType, executeLoadSingleOpportunity, deps),
			takeLatest(publishOpportunityType, executePublishOpportunity, deps),
			takeLatest(unpublishOpportunityType, executeUnpublishOpportunity, deps),
		]);
	};
}

function* executeLoadUserOrganizations({ api }: IDependencies) {
	try {
		const response: IUserOrganizationsResponse = yield call(api.npo.loadUserOrganizations);
		const currentOrganization: IOrganizationsResponseItem | null = yield select(selectors.selectCurrentOrganization);
		if (!currentOrganization && response.organizations.length) {
			yield put(actions.setCurrentOrganization(response.organizations[0]));
		}
		yield put(actions.loadUserOrganizationsComplete(response.organizations));
	} catch (error) {
		yield put(actions.loadUserOrganizationsFailed(getErrorMsg(error)));
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
			yield put(
				actions.updateOpportunityComplete(
					convertUpdateOpportunityRequestToResponseType(opportunity, opportunityId, payload.tags),
				),
			);
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

function* executeLoadSingleOpportunity({ api }: IDependencies, { payload }: NS.ILoadSingleOpportunity) {
	try {
		const response = yield call(api.npo.loadOpportunity, payload);
		yield put(actions.loadSingleOpportunityCompleted(response));
	} catch (error) {
		yield put(actions.loadSingleOpportunityFailed(getErrorMsg(error)));
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
