import * as NS from '../../namespace';
import { IOrganizationsResponseItem } from 'shared/types/responses/npo';

export function setCurrentOrganization(organization: IOrganizationsResponseItem): NS.ISetCurrentOrganization {
	return { payload: organization, type: 'NPO_SERVICE:SET_CURRENT_ORGANIZATION' };
}

export function updateOrganizationLogo(imageUrl: string): NS.IUpdateOrganizationLogo {
	return { payload: imageUrl, type: 'NPO_SERVICE:UPDATE_ORGANIZATION_LOGO' };
}

export function changeCurrentOrganization(organization: IOrganizationsResponseItem): NS.IChangeCurrentOrganization {
	return { payload: organization, type: 'NPO_SERVICE:CHANGE_CURRENT_ORGANIZATION' };
}

export function setUploadOpportunityLogoProgress(progress: number | null): NS.ISetUploadOpportunityLogoProgress {
	return { payload: progress, type: 'NPO_SERVICE:SET_UPLOAD_OPPORTUNITY_LOGO_PROGRESS' };
}
