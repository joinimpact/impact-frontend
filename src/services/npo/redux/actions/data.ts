import * as NS from '../../namespace';
import { IOrganization } from 'shared/types/models/organization';

export function setCurrentOrganization(organization: IOrganization): NS.ISetCurrentOrganization {
  return { payload: organization, type: 'NPO_SERVICE:SET_CURRENT_ORGANIZATION' };
}

export function updateOrganizationLogo(imageUrl: string): NS.IUpdateOrganizationLogo {
  return { payload: imageUrl, type: 'NPO_SERVICE:UPDATE_ORGANIZATION_LOGO' };
}
