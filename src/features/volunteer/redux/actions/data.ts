import * as NS from '../../namespace';

export function setUploadLogoProgress(progress: number | null): NS.ISetUploadLogoProgress {
  return { payload: progress, type: 'VOLUNTEER:SET_UPLOAD_LOGO_PROGRESS' };
}
