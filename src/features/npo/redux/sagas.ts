import { IDependencies } from 'shared/types/app';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as NS from '../namespace';
import * as actions from './actions';
import { getErrorMsg } from 'services/api';
import { actions as npoActions, selectors as npoSelectors } from 'services/npo';
import { ICreateOrganizationResponse, IUploadNPOLogoResponse } from 'shared/types/responses/npo';

const createOrganizationType: NS.ICreateOrganization['type'] = 'NPO:CREATE_ORGANIZATION';
const uploadOrgLogoType: NS.IUploadOrgLogo['type'] = 'NPO:UPLOAD_ORG_LOGO';
const loadOrganizationTagsType: NS.ILoadOrganizationTags['type'] = 'NPO:LOAD_ORGANIZATION_TAGS';
const saveOrganizationTagsType: NS.ISaveOrganizationTags['type'] = 'NPO:SAVE_ORGANIZATION_TAGS';
const saveOrganizationMembersType: NS.ISaveOrganizationMembers['type'] = 'NPO:SAVE_ORGANIZATION_MEMBERS';


export default function getSaga(deps: IDependencies) {
  return function* saga() {
    yield all([
      takeLatest(createOrganizationType, executeCreateOrganization, deps),
      takeLatest(uploadOrgLogoType, executeUploadOrgLogo, deps),
      takeLatest(loadOrganizationTagsType, executeLoadOrganizationTags, deps),
      takeLatest(saveOrganizationTagsType, executeSaveOrganizationTags, deps),
      takeLatest(saveOrganizationMembersType, executeSaveOrganizationMembers, deps),
    ]);
  };
}

function* executeCreateOrganization({ api }: IDependencies, { payload }: NS.ICreateOrganization) {
  try {
    const response: ICreateOrganizationResponse = yield call(api.npo.createOrganization, {
      name: payload.organizationName,
      location: payload.address,
      description: payload.description,
      websiteURL: payload.website,
    });
    yield put(actions.createNewOrganizationComplete());
    yield put(npoActions.setCurrentOrganization({
      name: payload.organizationName,
      isAdmin: true,
      id: response.organizationId,
    }));
  } catch (error) {
    yield put(actions.createNewOrganizationFailed(getErrorMsg(error)));
  }
}

function* executeUploadOrgLogo({ api, dispatch }: IDependencies, { payload }: NS.IUploadOrgLogo) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const response: IUploadNPOLogoResponse = yield call(api.npo.uploadOrgLogo, orgId, payload, (progress: number) => {
      dispatch(actions.setUploadOrganizationLogoProgress(progress));
    });
    yield put(actions.uploadOrgLogoComplete());
    yield put(actions.setUploadOrganizationLogoProgress(null));
    yield put(npoActions.updateOrganizationLogo(response.profilePicture));
  } catch (error) {
    yield put(actions.uploadOrgLogoFailed(getErrorMsg(error)));
  }
}

function* executeLoadOrganizationTags({ api }: IDependencies) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    const response = yield call(api.npo.loadOrganizationTags, orgId);
    console.log('response: ', response);
    yield put(actions.loadOrganizationTagsComplete());
  } catch (error) {
    yield put(actions.loadOrganizationTagsFailed(getErrorMsg(error)));
  }
}

function* executeSaveOrganizationTags({ api }: IDependencies, { payload }: NS.ISaveOrganizationTags) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    yield call(api.npo.saveOrganizationTags, orgId, {
      tags: payload.map(tag => ({
        name: tag,
      })),
    });
    yield put(actions.saveOrganizationTagsComplete());
  } catch (error) {
    yield put(actions.saveOrganizationTagsFailed(getErrorMsg(error)));
  }
}

function* executeSaveOrganizationMembers({ api }: IDependencies, { payload }: NS.ISaveOrganizationMembers) {
  try {
    const orgId = yield select(npoSelectors.selectCurrentOrganizationId);
    yield call(api.npo.saveOrganizationMembers, orgId, {
      members: payload.map(email => ({
        email,
      })),
    });
    yield put(actions.saveOrganizationMembersComplete());
  } catch (error) {
    yield put(actions.saveOrganizationMembersFailed(getErrorMsg(error)));
  }
}
