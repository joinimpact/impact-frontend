import { IDependencies } from 'shared/types/app';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { getErrorMsg } from 'services/api';
import { selectors as userSelectors, actions as userActions } from 'services/user';
import { IUploadUserLogoResponse } from 'shared/types/responses/volunteer';

const saveVolunteerPersonalInfoType: NS.ISaveVolunteerPersonalInfo['type'] = 'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO';
const uploadVolunteerLogoType: NS.IUploadVolunteerLogo['type'] = 'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO';
const saveVolunteerAreasOfInterestType: NS.ISaveVolunteerAreaOfInterest['type'] =
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST';
const loadSingleOpportunityType: NS.ILoadSingleOpportunity['type'] = 'VOLUNTEER:LOAD_SINGLE_OPPORTUNITY';
const applyForOpportunityType: NS.IApplyForOpportunity['type'] = 'VOLUNTEER:APPLY_FOR_OPPORTUNITY';
const browseOpportunitiesType: NS.IBrowseOpportunities['type'] = 'VOLUNTEER:BROWSE_OPPORTUNITIES';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(saveVolunteerPersonalInfoType, executeSaveVolunteerPersonalInfo, deps),
      takeLatest(uploadVolunteerLogoType, executeUploadVolunteerLogo, deps),
      takeLatest(saveVolunteerAreasOfInterestType, executeSaveVolunteerAreasOfInterest, deps),
      takeLatest(loadSingleOpportunityType, executeLoadSingleOpportunity, deps),
      takeLatest(applyForOpportunityType, executeApplyForOpportunity, deps),
      takeLatest(browseOpportunitiesType, executeBrowseOpportunities, deps),
    ]);
  };
}

function* executeSaveVolunteerPersonalInfo({ api }: IDependencies, { payload }: NS.ISaveVolunteerPersonalInfo) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    if (userId) {
      yield call(api.volunteer.saveVolunteerPersonalInfo, userId, {
        firstName: payload.firstName,
        lastName: payload.lastName,
        address: payload.address,
        email: payload.email,
        school: payload.school,
        birthday: payload.birthday,
      });
    }
    yield put(actions.saveVolunteerPersonalInfoComplete());
  } catch (error) {
    yield put(actions.saveVolunteerPersonalInfoFailed(getErrorMsg(error)));
  }
}

function* executeUploadVolunteerLogo({ api, dispatch }: IDependencies, { payload }: NS.IUploadVolunteerLogo) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    const uploadResponse: IUploadUserLogoResponse = yield call(api.volunteer.uploadVolunteerLogo,
      userId, payload, (progress: number) => {
      dispatch(actions.setUploadLogoProgress(progress));
    });
    if (uploadResponse.success) {
      yield put(actions.uploadVolunteerLogoComplete());
      yield put(userActions.updateUserLogo(uploadResponse.profilePicture));
      yield put(actions.setUploadLogoProgress(null));
    } else {
      yield put(actions.uploadVolunteerLogoFailed('Upload failed'));
    }
  } catch (error) {
    yield put(actions.uploadVolunteerLogoFailed(getErrorMsg(error)));
  }
}

function* executeSaveVolunteerAreasOfInterest({ api }: IDependencies, { payload }: NS.ISaveVolunteerAreaOfInterest) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    if (userId) {
      yield call(api.volunteer.saveVolunteerAreasOfInterest, userId, {
        areas: payload,
      });
    }
    yield put(actions.saveVolunteerAreasOfInterestComplete());
  } catch (error) {
    yield put(actions.saveVolunteerAreasOfInterestFailed(getErrorMsg(error)));
  }
}

function* executeLoadSingleOpportunity({ api }: IDependencies, { payload }: NS.ILoadSingleOpportunity) {
  try {
    const response = yield call(api.npo.loadOpportunity, payload);
    yield put(actions.loadSingleOpportunityComplete(response));
  } catch (error) {
    yield put(actions.loadSingleOpportunityFailed(getErrorMsg(error)));
  }
}

function* executeApplyForOpportunity({ api }: IDependencies, { payload }: NS.IApplyForOpportunity) {
  try {
    yield call(api.volunteer.applyForOpportunity, payload.opportunityId, {
      message: payload.message
    });
    yield put(actions.applyForOpportunityComplete());
  } catch (error) {
    yield put(actions.applyForOpportunityFailed(getErrorMsg(error)));
  }
}

function* executeBrowseOpportunities({ api }: IDependencies) {
  try {
    yield call(api.volunteer.browseOpportunities, {});
    yield put(actions.browseOpportunitiesComplete());
  } catch (error) {
    yield put(actions.browseOpportunitiesFailed(getErrorMsg(error)));
  }
}
