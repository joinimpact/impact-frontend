import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IAddressLocation } from 'shared/types/requests/auth';

export interface IReduxState {
  communications: {
    saveVolunteerPersonalInformation: ICommunication;
    uploadVolunteerLogo: ICommunication;
    saveVolunteerAreasOfInterest: ICommunication;
  };
  data: {
    uploadLogoProgress: number | null;
  };
}

export interface IVolunteerPersonalInfoForm {
  fullName: string;
  email: string;
  address: IAddressLocation;
  birthday: string;
  school: string;
}

export interface IInterestAreaForm {
  value: string;
}

export type ISaveVolunteerPersonalInfo = IAction<'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO', IVolunteerPersonalInfoForm>;
export type ISaveVolunteerPersonalInfoSuccess = IPlainAction<'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_SUCCESS'>;
export type ISaveVolunteerPersonalInfoFailed = IPlainFailAction<'VOLUNTEER:SAVE_VOLUNTEER_PERSONAL_INFO_FAILED'>;

export type IUploadVolunteerLogo = IAction<'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO', File>;
export type IUploadVolunteerLogoSuccess = IPlainAction<'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_SUCCESS'>;
export type IUploadVolunteerLogoFailed = IPlainFailAction<'VOLUNTEER:UPLOAD_VOLUNTEER_LOGO_FAILED'>;

export type ISaveVolunteerAreaOfInterest = IAction<'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST', string[]>;
export type ISaveVolunteerAreaOfInterestSuccess = IPlainAction<'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_SUCCESS'>;
export type ISaveVolunteerAreaOfInterestFailed = IPlainFailAction<'VOLUNTEER:SAVE_VOLUNTEER_AREA_OF_INTEREST_FAILED'>;

export type ILoadVolunteer = IPlainAction<'VOLUNTEER:LOAD'>;
export type ILoadVolunteerSuccess = IPlainAction<'VOLUNTEER:LOAD_SUCCESS'>;
export type ILoadVolunteerFailed = IPlainFailAction<'VOLUNTEER:LOAD_FAILED'>;

export type ISetUploadLogoProgress = IAction<'VOLUNTEER:SET_UPLOAD_LOGO_PROGRESS', number | null>;

export interface ITagItem {
  id: string;
  name: string;
}

export type Action =
  | ISaveVolunteerPersonalInfo
  | ISaveVolunteerPersonalInfoSuccess
  | ISaveVolunteerPersonalInfoFailed
  | IUploadVolunteerLogo
  | IUploadVolunteerLogoSuccess
  | IUploadVolunteerLogoFailed
  | ISaveVolunteerAreaOfInterest
  | ISaveVolunteerAreaOfInterestSuccess
  | ISaveVolunteerAreaOfInterestFailed
  | ILoadVolunteer
  | ILoadVolunteerSuccess
  | ILoadVolunteerFailed
  | ISetUploadLogoProgress;
