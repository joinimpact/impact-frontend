export interface ISuccessResponse {
  success: boolean;
}

export interface IAbstractFileResponse {
  profilePicture: string;
  success: boolean;
}

export interface ILocation {
  city: {
    longName: string;
    shortName: string;
  };
  country: {
    longName: string;
    shortName: string;
  };
  state: {
    longName: string;
    shortName: string;
  };
  streetAddress: {
    longName: string;
    shortName: string;
  };
}
