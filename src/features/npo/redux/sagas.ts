import { IDependencies } from 'shared/types/app';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { getErrorMsg } from 'services/api';

const createOrganizationType: NS.ICreateOrganization['type'] = 'NPO:CREATE_ORGANIZATION';
const uploadOrgLogoType: NS.IUploadOrgLogo['type'] = 'NPO:UPLOAD_ORG_LOGO';
const saveOrganizationTagsType: NS.ISaveOrganizationTags['type'] = 'NPO:SAVE_ORGANIZATION_TAGS';
const saveOrganizationMembersType: NS.ISaveOrganizationMembers['type'] = 'NPO:SAVE_ORGANIZATION_MEMBERS';


export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(createOrganizationType, executeCreateOrganization, deps),
      takeLatest(uploadOrgLogoType, executeUploadOrgLogo, deps),
      takeLatest(saveOrganizationTagsType, executeSaveOrganizationTags, deps),
      takeLatest(saveOrganizationMembersType, executeSaveOrganizationMembers, deps),
    ]);
  };
}

function* executeCreateOrganization({ api }: IDependencies, { payload }: NS.ICreateOrganization) {
  try {
    yield call(api.npo.createOrganization, {
      name: payload.organizationName,
      address: payload.address,
      description: payload.description,
      website: payload.website,
    });
    yield put(actions.createNewOrganizationComplete());
  } catch (error) {
    yield put(actions.createNewOrganizationFailed(getErrorMsg(error)));
  }
}

function* executeUploadOrgLogo({ api }: IDependencies, { payload }: NS.IUploadOrgLogo) {
  try {
    yield call(api.npo.uploadOrgLogo, payload, (progress: number) => {
      // console.log('progress: ', progress);
    });
    yield put(actions.uploadOrgLogoComplete());
  } catch (error) {
    yield put(actions.uploadOrgLogoFailed(getErrorMsg(error)));
  }
}

function* executeSaveOrganizationTags({ api }: IDependencies, { payload }: NS.ISaveOrganizationTags) {
  try {
    yield call(api.npo.saveOrganizationTags, {
      tags: payload,
    });
    yield put(actions.saveOrganizationTagsComplete());
  } catch (error) {
    yield put(actions.saveOrganizationTagsFailed(getErrorMsg(error)));
  }
}

function* executeSaveOrganizationMembers({ api }: IDependencies, { payload }: NS.ISaveOrganizationMembers) {
  try {
    yield call(api.npo.saveOrganizationMembers, {
      members: payload,
    });
    yield put(actions.saveOrganizationMembersComplete());
  } catch (error) {
    yield put(actions.saveOrganizationMembersFailed(getErrorMsg(error)));
  }
}
