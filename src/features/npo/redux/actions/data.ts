import * as NS from '../../namespace';

export function setUploadOrganizationLogoProgress(progress: number | null): NS.ISetUploadOrganizationLogoProgress {
  return { payload: progress, type: 'NPO:SET_UPLOAD_ORGANIZATION_LOGO_PROGRESS' };
}
