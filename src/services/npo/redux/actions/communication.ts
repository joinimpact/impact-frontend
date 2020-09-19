import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'shared/redux/communication';

export const {
	execute: loadUserOrganizations,
	completed: loadUserOrganizationsComplete,
	failed: loadUserOrganizationsFailed,
} = makeCommunicationActionCreators<
NS.ILoadUserOrganizations,
NS.ILoadUserOrganizationsSuccess,
NS.ILoadUserOrganizationsFailed
>(
	'NPO_SERVICE:LOAD_USER_ORGANIZATIONS',
	'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_SUCCESS',
	'NPO_SERVICE:LOAD_USER_ORGANIZATIONS_FAILED',
);

export const {
	execute: loadOpportunities,
	completed: loadOpportunitiesCompleted,
	failed: loadOpportunitiesFailed,
} = makeCommunicationActionCreators<NS.ILoadOpportunities, NS.ILoadOpportunitiesSuccess, NS.ILoadOpportunitiesFailed>(
	'NPO_SERVICE:LOAD_OPPORTUNITIES',
	'NPO_SERVICE:LOAD_OPPORTUNITIES_SUCCESS',
	'NPO_SERVICE:LOAD_OPPORTUNITIES_FAILED',
);

export const {
	execute: requestNewOpportunityId,
	completed: requestNewOpportunityIdComplete,
	failed: requestNewOpportunityIdFailed,
} = makeCommunicationActionCreators<
NS.IRequestNewOpportunityId,
NS.IRequestNewOpportunityIdSuccess,
NS.IRequestNewOpportunityIdFailed
>(
	'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID',
	'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID_SUCCESS',
	'NPO_SERVICE:REQUEST_NEW_OPPORTUNITY_ID_FAILED',
);

export const {
	execute: publishOpportunity,
	completed: publishOpportunityComplete,
	failed: publishOpportunityFailed,
} = makeCommunicationActionCreators<
NS.IPublishOpportunity,
NS.IPublishOpportunitySuccess,
NS.IPublishOpportunityFailed
>(
	'NPO_SERVICE:PUBLISH_OPPORTUNITY',
	'NPO_SERVICE:PUBLISH_OPPORTUNITY_SUCCESS',
	'NPO_SERVICE:PUBLISH_OPPORTUNITY_FAILED',
);

export const {
	execute: unpublishOpportunity,
	completed: unpublishOpportunityComplete,
	failed: unpublishOpportunityFailed,
} = makeCommunicationActionCreators<
NS.IUnpublishOpportunity,
NS.IUnpublishOpportunitySuccess,
NS.IUnpublishOpportunityFailed
>(
	'NPO_SERVICE:UNPUBLISH_OPPORTUNITY',
	'NPO_SERVICE:UNPUBLISH_OPPORTUNITY_SUCCESS',
	'NPO_SERVICE:UNPUBLISH_OPPORTUNITY_FAILED',
);

export const {
	execute: uploadOpportunityLogo,
	completed: uploadOpportunityLogoComplete,
	failed: uploadOpportunityLogoFailed,
} = makeCommunicationActionCreators<
NS.IUploadOpportunityLogo,
NS.IUploadOpportunityLogoSuccess,
NS.IUploadOpportunityLogoFailed
>(
	'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO',
	'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO_SUCCESS',
	'NPO_SERVICE:UPLOAD_OPPORTUNITY_LOGO_FAILED',
);

export const {
	execute: loadSingleOpportunity,
	completed: loadSingleOpportunityCompleted,
	failed: loadSingleOpportunityFailed,
} = makeCommunicationActionCreators<
NS.ILoadSingleOpportunity,
NS.ILoadSingleOpportunitySuccess,
NS.ILoadSingleOpportunityFailed
>(
	'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY',
	'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
	'NPO_SERVICE:LOAD_SINGLE_OPPORTUNITY_FAILED',
);

export const {
	execute: updateOpportunity,
	completed: updateOpportunityComplete,
	failed: updateOpportunityFailed,
} = makeCommunicationActionCreators<NS.IUpdateOpportunity, NS.IUpdateOpportunitySuccess, NS.IUpdateOpportunityFailed>(
	'NPO_SERVICE:UPDATE_OPPORTUNITY',
	'NPO_SERVICE:UPDATE_OPPORTUNITY_SUCCESS',
	'NPO_SERVICE:UPDATE_OPPORTUNITY_FAILED',
);
