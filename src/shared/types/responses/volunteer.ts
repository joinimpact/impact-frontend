export interface IUserTagItemResponse {
  id: string;
  name: string;
}

export interface IUploadUserLogoResponse {
  profilePicture: string;
  success: boolean;
}

export interface ILoadUserTagsResponse {
  tags: IUserTagItemResponse[];
}

export interface ILoadTagsResponse {
  tags: ITagItemResponse[];
}

export interface ITagItemResponse {
  Model: {
    id: number;
  };
  category: number;
  name: string;
}

export interface ITagsResponse {
  tags: ITagItemResponse[];
}

export interface IUserProfileResponse {
  firstName: string;
  lastName: string;
  id: string;
  profile: string[]; // What we will have there in future?
  tags: string[];
  profilePicture: string;
}
