import { IDependencies } from 'shared/types/app';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { getErrorMsg } from 'services/api';
import { selectors as userSelectors } from 'services/user';

const saveVolunteerPersonalInfoType: NS.ISaveVolunteerPersonalInfo['type'] = 'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO';
const uploadVolunteerLogoType: NS.IUploadVolunteerLogo['type'] = 'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO';
const saveVolunteerAreasOfInterestType: NS.ISaveVolunteerAreaOfInterest['type'] =
  'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST';

export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(saveVolunteerPersonalInfoType, executeSaveVolunteerPersonalInfo, deps),
      takeLatest(uploadVolunteerLogoType, executeUploadVolunteerLogo, deps),
      takeLatest(saveVolunteerAreasOfInterestType, executeSaveVolunteerAreasOfInterest, deps),
    ]);
  };
}

function* executeSaveVolunteerPersonalInfo({ api }: IDependencies, { payload }: NS.ISaveVolunteerPersonalInfo) {
  try {
    const userId = yield select(userSelectors.selectCurrentUserId);
    if (userId) {
      yield call(api.volunteer.saveVolunteerPersonalInfo, userId, {
        fullName: payload.fullName,
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

function* executeUploadVolunteerLogo({ api }: IDependencies, { payload }: NS.IUploadVolunteerLogo) {
  try {
    yield call(api.volunteer.uploadVolunteerLogo, payload, (progress: number) => {
      // console.log('progress: ', progress);
    });
    yield put(actions.uploadVolunteerLogoComplete());
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
