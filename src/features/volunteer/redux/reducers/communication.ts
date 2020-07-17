import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { makeCommunicationReducer } from 'shared/redux/communication';
import initial from '../initial';

export default combineReducers<NS.IReduxState['communications']>({
  saveVolunteerPersonalInformation: makeCommunicationReducer<
    NS.ISaveVolunteerPersonalInfo,
    NS.ISaveVolunteerPersonalInfoSuccess,
    NS.ISaveVolunteerPersonalInfoFailed
    >(
      'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO',
      'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS',
      'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED',
    initial.communications.saveVolunteerPersonalInformation,
  ),
  uploadVolunteerLogo: makeCommunicationReducer<
    NS.IUploadVolunteerLogo,
    NS.IUploadVolunteerLogoSuccess,
    NS.IUploadVolunteerLogoFailed
    >(
      'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO',
      'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_SUCCESS',
      'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_FAILED',
    initial.communications.uploadVolunteerLogo,
  ),
  saveVolunteerAreasOfInterest: makeCommunicationReducer<
    NS.ISaveVolunteerAreaOfInterest,
    NS.ISaveVolunteerAreaOfInterestSuccess,
    NS.ISaveVolunteerAreaOfInterestFailed
    >(
    'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST',
    'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS',
    'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED',
    initial.communications.saveVolunteerAreasOfInterest,
  ),
  loadSingleOpportunity: makeCommunicationReducer<
    NS.ILoadSingleOpportunity,
    NS.ILoadSingleOpportunitySuccess,
    NS.ILoadSingleOpportunityFailed
    >(
      'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY',
      'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
      'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_FAILED',
    initial.communications.loadSingleOpportunity,
  ),
  applyForOpportunity: makeCommunicationReducer<
    NS.IApplyForOpportunity,
    NS.IApplyForOpportunitySuccess,
    NS.IApplyForOpportunityFailed
    >(
      'VOLUNTEER:APPLY_FOR_OPPORTUNITY',
      'VOLUNTEER:APPLY_FOR_OPPORTUNITY_SUCCESS',
      'VOLUNTEER:APPLY_FOR_OPPORTUNITY_FAILED',
    initial.communications.applyForOpportunity,
  ),
});
