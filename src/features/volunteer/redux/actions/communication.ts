import * as NS from '../../namespace';
import makeCommunicationActionCreators from 'shared/redux/communication/makeCommunicationActionCreators';

export const {
  execute: saveVolunteerPersonalInfo,
  completed: saveVolunteerPersonalInfoComplete,
  failed: saveVolunteerPersonalInfoFailed,
} = makeCommunicationActionCreators<
  NS.ISaveVolunteerPersonalInfo,
  NS.ISaveVolunteerPersonalInfoSuccess,
  NS.ISaveVolunteerPersonalInfoFailed
  >(
  'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO',
  'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS',
  'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED',
);

export const {
  execute: uploadVolunteerLogo,
  completed: uploadVolunteerLogoComplete,
  failed: uploadVolunteerLogoFailed,
} = makeCommunicationActionCreators<
  NS.IUploadVolunteerLogo,
  NS.IUploadVolunteerLogoSuccess,
  NS.IUploadVolunteerLogoFailed
  >(
  'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO',
  'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_SUCCESS',
  'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_FAILED',
);

export const {
  execute: saveVolunteerAreasOfInterest,
  completed: saveVolunteerAreasOfInterestComplete,
  failed: saveVolunteerAreasOfInterestFailed,
} = makeCommunicationActionCreators<
  NS.ISaveVolunteerAreaOfInterest,
  NS.ISaveVolunteerAreaOfInterestSuccess,
  NS.ISaveVolunteerAreaOfInterestFailed
  >(
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST',
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS',
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED',
);

export const {
  execute: loadSingleOpportunity,
  completed: loadSingleOpportunityComplete,
  failed: loadSingleOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.ILoadSingleOpportunity,
  NS.ILoadSingleOpportunitySuccess,
  NS.ILoadSingleOpportunityFailed
  >(
    'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY',
    'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_SUCCESS',
    'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY_FAILED',
);

export const {
  execute: applyForOpportunity,
  completed: applyForOpportunityComplete,
  failed: applyForOpportunityFailed,
} = makeCommunicationActionCreators<
  NS.IApplyForOpportunity,
  NS.IApplyForOpportunitySuccess,
  NS.IApplyForOpportunityFailed
  >(
    'VOLUNTEER:APPLY_FOR_OPPORTUNITY',
    'VOLUNTEER:APPLY_FOR_OPPORTUNITY_SUCCESS',
    'VOLUNTEER:APPLY_FOR_OPPORTUNITY_FAILED',
);

export const {
  execute: browseOpportunities,
  completed: browseOpportunitiesComplete,
  failed: browseOpportunitiesFailed
} = makeCommunicationActionCreators<
  NS.IBrowseOpportunities,
  NS.IBrowseOpportunitiesSuccess,
  NS.IBrowseOpportunitiesFailed
  >(
    'VOLUNTEER:BROWSE_OPPORTUNITIES',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_SUCCESS',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_FAILED',
);

export const {
  execute: loadEnrolledOpportunities,
  completed: loadEnrolledOpportunitiesComplete,
  failed: loadEnrolledOpportunitiesFailed,
} = makeCommunicationActionCreators<
  NS.ILoadEnrolledOpportunities,
  NS.ILoadEnrolledOpportunitiesSuccess,
  NS.ILoadEnrolledOpportunitiesFailed
  >(
    'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES',
    'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_SUCCESS',
    'VOLUNTEER:LOAD_ENROLLED_OPPORTUNITIES_FAILED',
);

export const {
  execute: browseOpportunitiesWithFilter,
  completed: browseOpportunitiesWithFilterComplete,
  failed: browseOpportunitiesWithFilterFailed
} = makeCommunicationActionCreators<
  NS.IBrowseOpportunitiesWithFilter,
  NS.IBrowseOpportunitiesWithFilterSuccess,
  NS.IBrowseOpportunitiesWithFilterFailed
  >(
    'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_SUCCESS',
    'VOLUNTEER:BROWSE_OPPORTUNITIES_WITH_FILTER_FAILED'
);
